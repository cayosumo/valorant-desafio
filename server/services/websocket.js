const WebSocket = require("ws");

let clientes = [];

function adicionarCliente(ws) {

    clientes.push(ws);

}

function removerCliente(ws) {

    clientes = clientes.filter(cliente => cliente !== ws);

}

function enviarTodos(dados) {

    const mensagem = JSON.stringify(dados);

    clientes = clientes.filter(cliente => {

        if (cliente.readyState === WebSocket.OPEN) {

            cliente.send(mensagem);

            return true;

        }

        return false;

    });

}

module.exports = {

    adicionarCliente,
    removerCliente,
    enviarTodos

};