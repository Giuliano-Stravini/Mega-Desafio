import React, { Component } from 'react'
import { Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'

//Possibilita captar imagens da galeria ou tiradas pela camera
import ImagePicker from 'react-native-image-picker';

//Possibilita a navegação entre cenas
import { Actions } from 'react-native-router-flux';

//Possibilita conexção com fireStore
import { base } from '../configFirebase'

//Imagem default para avatar
import imgUserDefault from './imgs/userdefault.png'
//Icone da camera
import imgCamera from './imgs/iconCamera.png'

//Opções da caixa de dialogo exibida após selecionar o icone de foto
const options = {
    title: 'Selecione uma foto',
    takePhotoButtonTitle: 'Tirar foto',
    chooseFromLibraryButtonTitle: 'Galeria'
};

export default class editContato extends Component {

    //Função de exclução
    _excluir = () => {
        //Remoção baseada no Id do documento
        base.removeDoc('contatos/' + this.state.idDoc)
            .then(() => {
                //Exito
                alert("Contato excluido")
            })
            .then(() => {
                //Volta a tela
                Actions.pop()
            })
            .catch(err => {
                //Falha
                alert("erro")
            });
    }

    //Função de edição
    _editar = () => {

        //Try/Cath - Caso não possua imagem, usar a default
        try {
            if (this.state.imgPath == null) {
                data = {
                    nome: this.state._nome,
                    telefone: this.state._telefone,
                    endereco: this.state._endereco,
                }
            } else {

                data = {
                    nome: this.state._nome,
                    telefone: this.state._telefone,
                    endereco: this.state._endereco,
                    imgPath: this.state.imgPath
                }
            }

            //Enviando dados para colecao 'contatos', dados enviados, id do Doc
            base.addToCollection('contatos', data, this.state.idDoc)
                .then(() => {
                    //exito
                    alert('Contato Editado')
                }).then(() => {
                    //volta a tela
                    Actions.pop()
                })
                .catch(err => {
                    //Falha
                    alert("erro")
                });
        }
        catch (err) {
            //Falha
            alert("Favor preencher todos os campos")
        }
    }


    //Função para seleção da foto
    selecionarFoto = () => {

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                this.setState({
                    imgPath: source,
                });
            }
        });
    }


    constructor(props) {
        super(props);

        this.state = {
            _nome: this.props.conteudo.nome,
            _telefone: this.props.conteudo.telefone,
            _endereco: this.props.conteudo.endereco,
            imgPath: this.props.conteudo.imgPath,
            idDoc: this.props.conteudo.id
        }
    }


    //Exibindo informações recebidas através de props do contato.js
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={Estilo.view}>
                        <Image style={Estilo.imgContato} source={(this.props.conteudo.imgPath == null && this.state.imgPath == null) ? imgUserDefault : this.state.imgPath} />
                        <TouchableOpacity onPress={this.selecionarFoto}>
                            <Image style={Estilo.imgCamera} source={imgCamera} />
                        </TouchableOpacity>
                    </View>
                    <View style={Estilo.view3}>
                        <Text style={Estilo.textNome}>Nome:</Text>
                        <TextInput
                            ref={(nome) => { this._nome = nome }}
                            style={Estilo.txtInput}
                            placeholder="Nome"
                            maxLength={40}
                            value={this.state._nome}
                            onChangeText={texto => this.setState({ _nome: texto })}
                        />
                        <Text style={Estilo.textNome}>Telefone:</Text>
                        <TextInput
                            ref={(telefone) => { this._telefone = telefone }}
                            style={Estilo.txtInput}
                            placeholder="xx xxxxx-xxxx"
                            value={this.state._telefone}
                            onChangeText={texto => this.setState({ _telefone: texto })}
                        />
                        <Text style={Estilo.textNome}>Endereço:</Text>
                        <TextInput
                            ref={(endereco) => { this._endereco = endereco }}
                            style={Estilo.txtInput}
                            placeholder="Endereço"
                            maxLength={50}
                            value={this.state._endereco}
                            onChangeText={texto => this.setState({ _endereco: texto })}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={() => this._editar(this.props)} style={{ marginBottom: 15 }}>
                    <Text style={Estilo.txtAdicionar}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._excluir()} style={{ marginBottom: 15 }}>
                    <Text style={Estilo.txtAdicionar}>Excluir</Text>
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

