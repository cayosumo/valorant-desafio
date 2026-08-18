const { carregarDesafios } = require("./desafios");

let ultimoDesafio = null;

function sortearDesafio() {

    const desafios = carregarDesafios();

    if (desafios.length <= 1) {
        return desafios[0];
    }

    let desafio;

    do {

        const indice = Math.floor(
            Math.random() * desafios.length
        );

        desafio = desafios[indice];

    } while (desafio.id === ultimoDesafio);

    ultimoDesafio = desafio.id;

    return desafio;

}

module.exports = {
    sortearDesafio
};