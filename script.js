console.log("SCRIPT CARREGADO");

const container = document.getElementById("container");

const socket = new WebSocket("ws://localhost:3000");

let desafiosDisponiveis = [];
const desafiosAtivos = [];

// ======================================
// WEBSOCKET
// ======================================

socket.onopen = () => {

    console.log("Conectado ao servidor!");

};

socket.onclose = () => {

    console.log("Servidor desconectado.");

};

socket.onmessage = (event) => {

    const dados = JSON.parse(event.data);

    console.log("Recebido:");
    console.log(dados);

    switch (dados.tipo) {

        case "desafios":

            desafiosDisponiveis = dados.desafios;

            console.log("Desafios carregados:");
            console.log(desafiosDisponiveis);

            if (desafiosAtivos.length === 0) {

                adicionarDesafioAleatorio();

            }

            break;

        case "desafio":

            receberDoacao(

                dados.valor,
                dados.desafio,
                dados.doador,
                dados.mensagem

            );

            break;

    }

};

// ======================================
// TEMPO
// ======================================

function formatarTempo(segundos) {

    const minutos = Math.floor(segundos / 60);

    const resto = segundos % 60;

    return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(resto).padStart(2, "0")
    );

}

// ======================================
// CARD
// ======================================

function criarCard(desafio) {

    const card = document.createElement("div");

    card.className = "challenge";

    card.innerHTML = `

        <div class="challengeTitle">
            ⚠ DESAFIO
        </div>

        <div class="challengeName">
            ${desafio.nome}
        </div>

        <div class="challengeDoador">
            ${desafio.doador ? "💰 " + desafio.doador : ""}
        </div>

        <div class="challengeMensagem">
            ${desafio.mensagem ?? ""}
        </div>

        <div class="challengeTimer">
            ${formatarTempo(desafio.tempo)}
        </div>

    `;

    container.appendChild(card);

    desafio.elemento = {

        card,

        tempo: card.querySelector(".challengeTimer")

    };

}

// ======================================
// DESAFIOS
// ======================================

function adicionarDesafioAleatorio() {

    const disponiveis = desafiosDisponiveis.filter(

        desafio => !desafiosAtivos.some(

            ativo => ativo.id === desafio.id

        )

    );

    if (disponiveis.length === 0) return;

    const sorteado = disponiveis[
        Math.floor(Math.random() * disponiveis.length)
    ];

    ativarDesafio(sorteado);

}

function ativarDesafio(

    desafioBase,
    doador = "",
    mensagem = ""

) {

    if (

        desafiosAtivos.some(

            desafio => desafio.id === desafioBase.id

        )

    ) {

        return;

    }

    const desafio = {

        id: desafioBase.id,

        nome: desafioBase.nome,

        tempo: desafioBase.tempo,

        doador,

        mensagem,

        elemento: null

    };

    desafiosAtivos.push(desafio);

    criarCard(desafio);

}

function removerDesafio(indice) {

    const desafio = desafiosAtivos[indice];

    if (!desafio) return;

    desafio.elemento.card.remove();

    desafiosAtivos.splice(indice, 1);

}

// ======================================
// TEMPO EXTRA
// ======================================

function adicionarTempo(segundos) {

    desafiosAtivos.forEach(desafio => {

        desafio.tempo += segundos;

        desafio.elemento.tempo.textContent =

            formatarTempo(desafio.tempo);

    });

}

// ======================================
// PIX
// ======================================

function receberDoacao(

    valor,
    desafio,
    doador,
    mensagem

) {

    console.log("PIX recebido!");

    console.log("Valor:", valor);

    // R$1 = +45 segundos em todos os desafios ativos

    adicionarTempo(valor * 45);

    if (desafio) {

        ativarDesafio(

            desafio,
            doador,
            mensagem

        );

    }

}
// ======================================
// DESAFIO AUTOMÁTICO
// ======================================

function adicionarDesafioAutomatico() {

    // Já existem todos os desafios ativos?
    if (desafiosAtivos.length >= desafiosDisponiveis.length) {

        console.log("Todos os desafios já estão ativos.");

        return;

    }

    adicionarDesafioAleatorio();

}

// A cada 5 minutos
setInterval(() => {

    adicionarDesafioAutomatico();

}, 300000);
// ======================================
// TIMER
// ======================================

setInterval(() => {

    for (

        let i = desafiosAtivos.length - 1;

        i >= 0;

        i--

    ) {

        const desafio = desafiosAtivos[i];

        desafio.tempo--;

        if (desafio.tempo <= 0) {

            removerDesafio(i);

            continue;

        }

        desafio.elemento.tempo.textContent =

            formatarTempo(desafio.tempo);

    }

}, 1000);

// ======================================
// TESTES
// ======================================

// receberDoacao(
//     1,
//     {
//         id: 5,
//         nome: "💣 Só Bucky",
//         tempo: 300
//     },
//     "Cayo",
//     "Boa sorte!"
// );