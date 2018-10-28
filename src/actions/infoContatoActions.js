export const modificarNome = (texto) => {
    return {
        type: 'modificarNome',
        playload: texto
    }
}
export const modificarTelefone = (texto) => {
    return {
        type: 'modificarTelefone',
        playload: texto
    }
}
export const modificarEndereco = (texto) => {
    return {
        type: 'modificarEndereco',
        playload: texto
    }
}
export const actionData = (objDataDoc) => {
    // console.warn("action", objDataDoc)
    return {
        type: 'actionData',
        playload: objDataDoc
    }
}
