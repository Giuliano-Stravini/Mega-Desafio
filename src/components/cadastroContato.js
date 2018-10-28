import React, { Component } from 'react'
import { Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

import { db, base, storage } from '../configFirebase'

import { modificarNome, modificarTelefone, modificarEndereco, cadastrar } from '../actions/infoContatoActions'

import imgUserDefault from './imgs/userdefault.png'
import imgCamera from './imgs/iconCamera.png'

const options = {
    title: 'Selecione uma foto',
    takePhotoButtonTitle: 'Tirar foto',
    chooseFromLibraryButtonTitle: 'Galeria'
};

class cadastroContato extends Component {


    _cadastrar = () => {
        // const { nome, telefone, endereco } = this.props
        data = {
            nome: this.state.nomeTeste,
            telefone: this.state.telefoneTeste,
            endereco: this.state.enderecoTeste,
            imgPath: this.state.avatarSource
        }

        db.collection('contatos').get().then(snap => {
            size = snap.size // will return the collection size
            base.addToCollection('contatos', data, "a"+snap.size)
                .then(() => {
                    alert('Contato cadastrado')
                }).then(() => { 
                    Actions.pop()
                })
                .catch(err => {
                    alert(err)
                });
        })

        // this.props.cadastrar({ nome, telefone, endereco})

        // console.warn(props.nome, props.telefone, props.endereco)

        // db.collection("contatos").doc("1").set({
        //     nome: props.nome,
        //     telefone: props.telefone,
        //     endereco: props.endereco,
        // })
        // .then(function() {
        //     console.log("Document successfully written!");
        // })
        // .catch(function(error) {
        //     console.error("Error writing document: ", error);
        // });

    }



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

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }


    constructor(props) {
        super(props);

        this.state = {
            dbData: {},
            avatarSource: null,
            nomeTeste: '',
            telefoneTeste: '',
            enderecoTeste: '',
        }

        base.bindCollection('contatos', {
            context: this,
            state: 'dbData',

        })

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
                            ref={(nome) => {this.nomeTeste = nome}}
                            style={Estilo.txtInput}
                            placeholder="Nome"
                            maxLength={40}
                            value={this.state.nomeTeste}
                            onChangeText={texto =>  this.setState({ nomeTeste: texto })}
                        />
                        <Text style={Estilo.textNome}>Telefone:</Text>
                        <TextInput
                        ref={(telefone) => {this.telefoneTeste = telefone}}
                            style={Estilo.txtInput}
                            placeholder="xx xxxxx-xxxx"
                            value={this.state.telefoneTeste}
                            onChangeText={texto =>  this.setState({ telefoneTeste: texto })}
                        />
                        <Text style={Estilo.textNome}>Endereço:</Text>
                        <TextInput
                        ref={(endereco) => {this.enderecoTeste = endereco}}
                            style={Estilo.txtInput}
                            placeholder="Endereço"
                            maxLength={50}
                            value={this.state.enderecoTeste}
                            onChangeText={texto =>  this.setState({ enderecoTeste: texto })}
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

const mapStateToProps = state => ({
    nome: state.infoContatoReducer.nome,
    telefone: state.infoContatoReducer.telefone,
    endereco: state.infoContatoReducer.endereco,
    imgPath: state.infoContatoReducer.imgPath
})

export default connect(mapStateToProps, { modificarNome, modificarTelefone, modificarEndereco, cadastrar })(cadastroContato)


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

