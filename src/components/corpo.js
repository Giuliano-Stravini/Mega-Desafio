import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

//Possibilita navegação entre os componentes
import { Actions } from 'react-native-router-flux'

//Possibilita utilização do firestore
import { base } from '../configFirebase'

//impor do componente Contado.js
import Contato from './contato'

export default class Corpo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //Onde vai ser armazenado os dados
      dbData: {}
    }

    //Conexão feita com fireStore através da biblioteca Re-base
    base.bindCollection('contatos', {
      context: this,
      //Onde vai ser armazenado os dados
      state: 'dbData',
      withIds: true,
      query: ref => {
        return ref
        //Ordem em que vai ser recebido os dados
          .orderBy("nome", "asc")
      }

    })

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {
              //Passa por toda lista puxando e inserindo os dados via props no contato.js
              Object.keys(this.state.dbData)
                .map(keys => {
                  return (
                    <Contato key={keys} conteudo={this.state.dbData[keys]} />
                    )
                })
            }

          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => Actions.cadastroContato()} style={{ marginBottom: 15 }}>
          <Text style={Estilos.txtAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

//Style
const Estilos = {
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