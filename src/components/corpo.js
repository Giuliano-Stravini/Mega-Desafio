import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { base } from '../configFirebase'

import Contato from './contato'

export default class Corpo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dbData: {}
    }

    base.bindCollection('contatos', {
      context: this,
      state: 'dbData',
      withIds: true,
      query: ref => {
        return ref
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