const INITIAL_STATE = {
    nome: '',
    telefone: '',
    endereco: '',
    imgPath: ''
}

export default (state = INITIAL_STATE, action) => {
    // console.warn("reducer" , action)
    
    if (action.type == 'modificarNome') {
        return {...state, nome: action.payload}
    }
    
    if (action.type == 'modificarTelefone') {
        return {...state, telefone: action.payload}
    }
    
    if (action.type == 'modificarEndereco') {
        return {...state, endereco: action.payload}
    }

    return state;
}