import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux'

import corpo from './src/components/corpo'
import cadastroContato from './src/components/cadastroContato'
import infoContato from './src/components/infoContato'
import editContato from './src/components/editContato'

export default props => (
    <Router>
        <Stack key='root'>
            <Scene navigationBarStyle={Estilos.navbarDefault} titleStyle={Estilos.navbarDefaultTitulo} key='corpo' component={corpo} title="Contatos" initial/>
            <Scene navBarButtonColor='whitesmoke' navigationBarStyle={Estilos.navbarDefault} titleStyle={Estilos.navbarDefaultTitulo} key='cadastroContato' component={cadastroContato} title="Cadastro" />
            <Scene navBarButtonColor='whitesmoke' navigationBarStyle={Estilos.navbarDefault} titleStyle={Estilos.navbarDefaultTitulo} key='infoContato' component={infoContato} title="Informações" />
            <Scene navBarButtonColor='whitesmoke' navigationBarStyle={Estilos.navbarDefault} titleStyle={Estilos.navbarDefaultTitulo} key='editContato' component={editContato} title="Editar" />
        </Stack>
    </Router>
)

const Estilos = {
    navbarDefault: {
        backgroundColor: '#abce45',
        alignContent: 'center'
    },
    navbarDefaultTitulo: {
        color: 'whitesmoke',
        textAlign: 'center',
        fontSize: 25
    }
}