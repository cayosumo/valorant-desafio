# 🎯 Valorant Challenge Overlay

Overlay em tempo real para lives de **Valorant**, que sorteia desafios aleatórios (ex: "sem habilidades", "apenas headshot", "não correr") e os exibe na tela via **WebSocket**. Os desafios podem ser ativados por doações através da integração com a **LivePix**.

## ✨ Funcionalidades

- 🎲 Sorteio de desafios aleatórios, sem repetir o último sorteado
- 🔌 Comunicação em tempo real entre servidor e overlay via WebSocket
- 💸 Integração com a API da LivePix para autenticação (OAuth2) e leitura de doações/mensagens
- 🖥️ Overlay leve em HTML/CSS/JS puro, pronto para ser usado como fonte de navegador no OBS/Streamlabs
- ⚙️ Backend em Node.js com Express, fácil de configurar e rodar localmente

## 🛠️ Tecnologias

- **Backend:** Node.js, Express, WebSocket (`ws`), Axios, dotenv
- **Frontend/Overlay:** HTML, CSS, JavaScript (vanilla)
- **Integração:** API LivePix (OAuth2)

## 📁 Estrutura do projeto

```
Valorant desafio/
├── index.html          # Overlay exibido no OBS/navegador
├── script.js           # Lógica do overlay (WebSocket, animações)
├── style.css           # Estilos do overlay
├── data/
│   └── desafios.json   # Lista de desafios disponíveis
├── images/              # Assets visuais do overlay
├── sounds/              # Efeitos sonoros
└── server/
    ├── index.js               # Servidor Express + WebSocket
    ├── .env.example           # Modelo de variáveis de ambiente
    ├── services/
    │   ├── desafios.js        # Carregamento dos desafios
    │   ├── sorteio.js         # Lógica de sorteio
    │   ├── websocket.js       # Gerenciamento de clientes conectados
    │   └── livepix.js         # Integração com a API da LivePix
    └── package.json
```

## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18+)
- Uma conta na [LivePix](https://livepix.gg) com uma aplicação criada (Painel > API > Criar Aplicação)

### Passo a passo

1. Clone o repositório
   ```bash
   git clone https://github.com/cayosumo/valorant-desafio.git
   cd valorant-desafio
   ```

2. Instale as dependências do servidor
   ```bash
   cd server
   npm install
   ```

3. Configure as variáveis de ambiente

   Copie o arquivo de exemplo e preencha com suas credenciais da LivePix:
   ```bash
   cp .env.example .env
   ```
   ```dotenv
   LIVEPIX_CLIENT_ID=seu_client_id_aqui
   LIVEPIX_CLIENT_SECRET=seu_client_secret_aqui
   ```

4. Inicie o servidor
   ```bash
   npm start
   ```

5. Abra o overlay

   Acesse `http://localhost:3000` no navegador, ou adicione essa URL como fonte de navegador no OBS/Streamlabs.

## 📋 Desafios

A lista de desafios fica em `data/desafios.json` e pode ser editada livremente para adicionar, remover ou ajustar o tempo de duração de cada um.

## 📌 Status do projeto

Projeto pessoal em desenvolvimento, criado para uso em lives próprias na Twitch. Contribuições e sugestões são bem-vindas!

## 👤 Autor

**Cayo**
Estudante e desenvolvedor com interesse em jogos, aplicativos e automações para streaming.

---

Se você é recrutador(a) ou tem interesse em conversar sobre oportunidades, fique à vontade para entrar em contato! 🚀
