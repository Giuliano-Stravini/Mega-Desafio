{/*
  TODO:
  
  -Fazer loop para puxar os contatos do firestore 
  -Enviar informações ao adicionar novo contato
  -Editar informações ao alterar campos no editContato.js
  -Criar as actions

*/}



import React from 'react';
import { Provider } from 'react-redux';
import {createStore} from 'redux'

import Routes from './routes';
import reducers from './src/reducers'


export default props => (
  <Provider store={createStore(reducers)}>
    <Routes />
  </Provider>

)
