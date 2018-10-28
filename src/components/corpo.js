import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { db, base } from '../configFirebase'
import { connect } from 'react-redux'
import { actionData } from '../actions/infoContatoActions'

import Contato from './contato'

class corpo extends Component {

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

const mapStateToProps = state => ({
  nome: state.infoContatoReducer.nome,
  telefone: state.infoContatoReducer.telefone,
  endereco: state.infoContatoReducer.endereco,
  imgPath: state.infoContatoReducer.imgPath,
  data: state.infoContatoReducer.data
})

export default connect(mapStateToProps, { actionData })(corpo)


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