const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const { carregarDesafios } = require("./services/desafios");
const { sortearDesafio } = require("./services/sorteio");


const {
    adicionarCliente,
    removerCliente,
    enviarTodos
} = require("./services/websocket");

const {
    obterToken,
    obterConta,
    obterMensagem
} = require("./services/livepix");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.static(path.join(__dirname, "..")));
app.use(express.json());

// ======================================
// WEBSOCKET
// ======================================

wss.on("connection", (ws) => {

    console.log("Overlay conectada!");

    adicionarCliente(ws);

    ws.send(JSON.stringify({

        tipo: "desafios",

        desafios: carregarDesafios()

    }));

    ws.on("close", () => {

        removerCliente(ws);

        console.log("Overlay desconectada.");

    });

});

// ======================================
// TESTE MANUAL
// ======================================

app.post("/teste", (req, res) => {

    console.log("\nTESTE MANUAL");
    console.log(req.body);

    enviarTodos(req.body);

    res.sendStatus(200);

});

// ======================================
// WEBHOOK LIVEPIX
// ======================================

app.post("/livepix", async (req, res) => {

    console.log("\n================================");
    console.log("LIVEPIX");
    console.log("================================");

    console.log(req.body);

    try {

        if (

            !req.body.resource ||

            req.body.resource.type !== "message"

        ) {

            return res.sendStatus(200);

        }

        // Busca a mensagem completa

        const mensagem = await obterMensagem(

            req.body.resource.id

        );

        console.log("\n===============================");
        console.log("MENSAGEM");
        console.log("===============================");

        console.log(mensagem);

        const valor = mensagem.data.amount / 100;

        console.log(
            "\nValor recebido: R$ " +
            valor.toFixed(2)
        );

        const desafio = sortearDesafio();

        console.log("\n===============================");
        console.log("DESAFIO SORTEADO");
        console.log("===============================");

        console.log(desafio);

        enviarTodos({

            tipo: "desafio",

            valor,

            desafio,

            doador: mensagem.data.username,

            mensagem: mensagem.data.message

        });

        console.log("\nOverlay atualizada!");

    }

    catch (erro) {

        console.log("\n===============================");
        console.log("ERRO");
        console.log("===============================");

        console.log(

            erro.response?.data ||

            erro.message

        );

    }

    res.sendStatus(200);

});

// ======================================
// INICIALIZAÇÃO
// ======================================

async function iniciarServidor() {

    try {

        console.log("Obtendo token...");

        await obterToken();

        console.log("TOKEN OK");

        const conta = await obterConta();

        console.log("CONTA:");

        console.log(conta.data);

    }

    catch (erro) {

        console.log(

            erro.response?.data ||

            erro.message

        );

    }

}

console.log("Desafios carregados:");

console.log(carregarDesafios());

iniciarServidor();

// ======================================
// SERVIDOR
// ======================================

server.listen(3000, () => {

    console.log("\nServidor iniciado!");

    console.log("http://localhost:3000");

});