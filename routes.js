import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux'

import corpo from './src/components/corpo'
import cadastroContato from './src/components/cadastroContato'
import infoContato from './src/components/infoContato'
import editContato from './src/components/editContato'
// import contato from './src/contato'

export default props => (
    <Router>
        <Stack key='root'>
            <Scene key='corpo' component={corpo} title="Contatos" initial/>
            {/* <Scene key='contato' component={contato} title="Contatos"/> */}
            <Scene key='cadastroContato' component={cadastroContato} title="Cadastro" />
            <Scene key='infoContato' component={infoContato} title="Informações" />
            <Scene key='editContato' component={editContato} title="Editar" />
        </Stack>
    </Router>
)