import { db } from '../configFirebase'

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

export const cadastrar = ({nome, telefone, endereco}) => {
    db.collection("contatos").doc("1").set({
        nome: nome,
        telefone: telefone,
        endereco: endereco,
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    return{
        type: 'teste'
    }
}