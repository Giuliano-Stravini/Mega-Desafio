import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import { Actions } from 'react-native-router-flux'

import imgUserDefault from './imgs/userdefault.png'
import imgEdit from './imgs/edit.png'


export default class Contato extends Component {
    render (){
    return (
                <TouchableOpacity onPress={() => Actions.infoContato({conteudo: this.props.conteudo})}>
            <View style={Estilo.view}>

                    <View style={Estilo.viewContato1}>
                        <Image style={Estilo.imgContato} source={(this.props.conteudo.imgPath == null) ? imgUserDefault : this.props.conteudo.imgPath} />
                        <View style={{flexDirection: 'column'}}>
                        <Text style={Estilo.txtNome}>{this.props.conteudo.nome}</Text>
                        <Text style={Estilo.txtTel}>{this.props.conteudo.telefone}</Text>
                        <Text style={Estilo.txtTel}>{this.props.conteudo.endereco}</Text>
                        </View>
                    </View>
                <View style={Estilo.viewContato2}>
                    <TouchableOpacity onPress={() => Actions.editContato({conteudo: this.props.conteudo})}>
                        <Image style={Estilo.imgEditar} source={imgEdit}/>
                    </TouchableOpacity>
                </View>
            </View>
                </TouchableOpacity>

        )
    }
}

    const Estilo = {
    
        view: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
    
        viewContato1: {
            backgrounColor: 'whitesmoke',
            flexDirection: 'row',
            marginTop: 2,
            paddingTop: 5,
            paddingBottom: 5,
        },
        imgContato: {
            borderRadius: 100,
            height: 50,
            width: 50,
            marginLeft: 10
        },
        txtNome: {
            color: "black",
            alignSelf: 'center',
            paddingLeft: 15,
            fontSize: 20,
        },
        txtTel: {
            color: "grey",
            alignSelf: 'flex-start',
            paddingLeft: 15,
            fontSize: 10,
        },
    
        viewContato2: {
            justifyContent: 'center',
            alignContent: 'center'
        },
    
        botaoEditar: {
            backgrounColor: 'transparent'
        },
    
        imgEditar: {
            marginRight: 10,
            height: 30,
            width: 30,
        }
    
    }