const fs = require("fs");
const path = require("path");

function carregarDesafios() {

    const caminho = path.join(
        __dirname,
        "../../data/desafios.json"
    );

    const conteudo = fs.readFileSync(caminho, "utf8");

    return JSON.parse(conteudo);

}

module.exports = {
    carregarDesafios
};