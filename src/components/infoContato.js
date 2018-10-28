import React, { Component } from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import {connect} from 'react-redux'


import imgUserDefault from './imgs/userdefault.png'


const infoContato = props => {
        return (
            <View>
                <View style={Estilo.view}>
                    <Image style={Estilo.imgContato} source={(props.conteudo.imgPath == null) ? imgUserDefault : props.conteudo.imgPath} />
                </View>
                <View style={Estilo.view3}>
                    <Text style={Estilo.textNome}>Nome:</Text>
                    <Text style={Estilo.textNome2}>{props.conteudo.nome}</Text>

                    <Text style={Estilo.textNome}>Telefone:</Text>
                    <Text style={Estilo.textNome2}>{props.conteudo.telefone}</Text>
                    
                    <Text style={Estilo.textNome}>Endereço:</Text>
                    <Text style={Estilo.textNome2}>{props.conteudo.endereco}</Text>
                </View>
            </View>
        )
    }



const mapStateToProps = state => ({
    nome: state.infoContatoReducer.nome,
    telefone: state.infoContatoReducer.telefone,
    endereco: state.infoContatoReducer.endereco,
    imgPath: state.infoContatoReducer.imgPath
})

export default connect(mapStateToProps, null)(infoContato)


const Estilo = {
    view: {

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
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
    },
    textNome: {
        alignContent: 'center',
        fontSize: 20,
        color: 'black',
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottomWidth: 1
    },
    textNome2: {
        alignContent: 'center',
        fontSize: 20,
        color: 'black',
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    txtInput: {
        borderBottomWidth: 1,
        paddingBottom: 0,
    }
}