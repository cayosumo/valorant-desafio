require("dotenv").config();

const axios = require("axios");

let token = null;
let expiracao = 0;

// ======================================
// TOKEN
// ======================================

async function obterToken() {

    if (token && Date.now() < expiracao) {

        return token;

    }

    console.log("Obtendo novo token...");

    const params = new URLSearchParams();

    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.LIVEPIX_CLIENT_ID);
    params.append("client_secret", process.env.LIVEPIX_CLIENT_SECRET);

    params.append(
        "scope",
        "account:read wallet:read webhooks payments:read messages:read"
    );

    const resposta = await axios.post(

        "https://oauth.livepix.gg/oauth2/token",

        params,

        {

            headers: {

                "Content-Type":
                    "application/x-www-form-urlencoded"

            }

        }

    );

    token = resposta.data.access_token;

    expiracao =
        Date.now() +
        (resposta.data.expires_in - 60) * 1000;

    console.log("RESPOSTA DO OAUTH:");
    console.log(resposta.data);

    return token;

}

// ======================================
// HEADERS
// ======================================

async function obterHeaders() {

    const token = await obterToken();

    return {

        Authorization: `Bearer ${token}`

    };

}

// ======================================
// WEBHOOK
// ======================================

async function criarWebhook(url) {

    const resposta = await axios.post(

        "https://api.livepix.gg/v2/webhooks",

        {

            url

        },

        {

            headers: await obterHeaders()

        }

    );

    return resposta.data;

}

// ======================================
// CONTA
// ======================================

async function obterConta() {

    const resposta = await axios.get(

        "https://api.livepix.gg/v2/account",

        {

            headers: await obterHeaders()

        }

    );

    return resposta.data;

}

// ======================================
// MENSAGEM
// ======================================

async function obterMensagem(id) {

    const resposta = await axios.get(

        `https://api.livepix.gg/v2/messages/${id}`,

        {

            headers: await obterHeaders()

        }

    );

    return resposta.data;

}

// ======================================
// PAGAMENTO
// ======================================

async function obterPagamento(reference) {

    try {

        const resposta = await axios.get(

            "https://api.livepix.gg/v2/payments",

            {

                headers: await obterHeaders(),

                params: {

                    reference

                }

            }

        );

        return resposta.data;

    }

    catch (erro) {

        console.log("\n================================");
        console.log("ERRO AO CONSULTAR PAGAMENTO");
        console.log("================================");

        console.log("Status:");
        console.log(erro.response?.status);

        console.log("Headers:");
        console.log(erro.response?.headers);

        console.log("Body:");
        console.log(erro.response?.data);

        throw erro;

    }

}

// ======================================

module.exports = {

    obterToken,
    obterConta,
    obterMensagem,
    obterPagamento,
    criarWebhook

};