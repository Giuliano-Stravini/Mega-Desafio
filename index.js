/** 
 * Agenda de contatos - Desafio Mega
 * Feito por: Giuliano S. Stravini
 * 
 * Requisitos minimos: 
 * - React Native e Firebase FireStore
 * - Cadastrar (Nome, Telefone, Endereco e Avatar/Foto)
 * - Editar
 * - Excluir
 * - Mostrar em ordem alfabética
 * 
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
