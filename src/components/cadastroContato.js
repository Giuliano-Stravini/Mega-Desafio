import React, { Component } from 'react'
import { Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'

//Possibilita a seleção de imagens
import ImagePicker from 'react-native-image-picker';

//Possibilita a navegação entre as cenas
import { Actions } from 'react-native-router-flux';

//Possibilita a conexção com o fireStore
import { db, base } from '../configFirebase'

//Imagem default do avatar
import imgUserDefault from './imgs/userdefault.png'
//Icone da camera
import imgCamera from './imgs/iconCamera.png'

//Opções da caixa de dialogo exibida após selecionar o icone de foto
const options = {
    title: 'Selecione uma foto',
    takePhotoButtonTitle: 'Tirar foto',
    chooseFromLibraryButtonTitle: 'Galeria'
};

export default class cadastroContato extends Component {

    //Função para cadastrar
    _cadastrar = () => {
        //Recolhe informações a armazena em um obj
        data = {
            nome: this.state.nomeTeste,
            telefone: this.state.telefoneTeste,
            endereco: this.state.enderecoTeste,
            imgPath: this.state.avatarSource
        }

        //verifica quantidade de documentos para utilizar como base de ids
        db.collection('contatos').get().then(snap => {
            size = snap.size //retorna o tamanha da coleção
            base.addToCollection('contatos', data, "a" + snap.size) // Adiciona no Firestore (coleção, dados, id)
                .then(() => {
                    //exito
                    alert('Contato cadastrado')
                }).then(() => {
                    //Volta a tela
                    Actions.pop()
                })
                .catch(err => {
                    //Erro
                    alert(err)
                });
        })
    }


    //Função para seleção da foto
    selecionarFoto = () => {

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }


    constructor(props) {
        super(props);

        this.state = {
            avatarSource: null,
            nomeTeste: '',
            telefoneTeste: '',
            enderecoTeste: '',
        }

    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={Estilo.view}>
                        <Image style={Estilo.imgContato} source={(this.state.avatarSource == null) ? imgUserDefault : this.state.avatarSource} />
                        <TouchableOpacity onPress={this.selecionarFoto}>
                            <Image style={Estilo.imgCamera} source={imgCamera} />
                        </TouchableOpacity>
                    </View>
                    <View style={Estilo.view3}>
                        <Text style={Estilo.textNome}>Nome:</Text>
                        <TextInput
                            ref={(nome) => { this.nomeTeste = nome }}
                            style={Estilo.txtInput}
                            placeholder="Nome"
                            maxLength={40}
                            value={this.state.nomeTeste}
                            onChangeText={texto => this.setState({ nomeTeste: texto })}
                        />
                        <Text style={Estilo.textNome}>Telefone:</Text>
                        <TextInput
                            ref={(telefone) => { this.telefoneTeste = telefone }}
                            style={Estilo.txtInput}
                            placeholder="xx xxxxx-xxxx"
                            value={this.state.telefoneTeste}
                            onChangeText={texto => this.setState({ telefoneTeste: texto })}
                        />
                        <Text style={Estilo.textNome}>Endereço:</Text>
                        <TextInput
                            ref={(endereco) => { this.enderecoTeste = endereco }}
                            style={Estilo.txtInput}
                            placeholder="Endereço"
                            maxLength={50}
                            value={this.state.enderecoTeste}
                            onChangeText={texto => this.setState({ enderecoTeste: texto })}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={() => this._cadastrar(this.props)} style={{ marginBottom: 15 }}>
                    <Text style={Estilo.txtAdicionar}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

//Style
const Estilo = {
    view: {
        flexDirection: 'row',
    },
    view2: {
        justifyContent: 'center',
        flex: 1,
        marginRight: 20,
        marginLeft: 20
    },
    view3: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    imgContato: {
        borderRadius: 100,
        height: 100,
        width: 100,
        marginLeft: 20,
        marginTop: 15,
    },
    imgCamera: {
        height: 50,
        width: 50,
    },
    textNome: {
        alignContent: 'center',
        fontSize: 20,
        color: 'black',
        marginTop: 15,
    },

    txtInput: {
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 10
    },
    txtAdicionar: {
        backgroundColor: '#abce45',
        borderRadius: 100,
        fontWeight: 'bold',
        textAlign: "center",
        color: 'whitesmoke',
        fontSize: 25,
        height: 35
    }

}

