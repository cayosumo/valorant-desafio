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

   Acesse `http://localhost:3000` no navegador para conferir se está funcionando, ou siga o passo abaixo para usá-lo direto no OBS.

### 🎥 Adicionando o overlay no OBS Studio

Com o servidor rodando (`npm start`), siga esses passos no OBS:

1. Na aba **Fontes**, clique no **+** e escolha **Navegador** (Browser Source)
2. Dê um nome, tipo "Desafios Overlay", e clique em OK
3. Nas propriedades da fonte, preencha:
   - **URL:** `http://localhost:3000`
   - **Largura:** 1920 (ou a resolução da sua cena)
   - **Altura:** 1080
4. Marque a opção **Atualizar navegador quando a cena ficar ativa** (Refresh browser when scene becomes active), para garantir que o overlay recarregue corretamente
5. Clique em **OK**

O overlay deve aparecer na sua cena, e os desafios vão surgir automaticamente sempre que forem sorteados (seja manualmente ou via doação pela LivePix).

> 💡 **Dica:** Se o overlay não aparecer ou ficar com fundo branco, verifique se o servidor (`npm start`) está rodando antes de abrir o OBS, e se a URL está exatamente `http://localhost:3000`.

### 🌐 Expondo o servidor com ngrok (necessário para receber webhooks da LivePix)

Como o servidor roda localmente (`localhost`), a LivePix não consegue enviar notificações de doação diretamente para sua máquina — é preciso um endereço público na internet. O [ngrok](https://ngrok.com/) cria esse túnel público apontando para o seu `localhost`.

1. Baixe e instale o ngrok em [ngrok.com/download](https://ngrok.com/download)

2. Com o servidor já rodando (`npm start`, passo anterior), abra outro terminal e rode:
   ```bash
   ngrok http 3000
   ```

3. O ngrok vai te dar uma URL pública, algo como:
   ```
   https://algum-nome-aleatorio.ngrok-free.dev
   ```

4. Copie essa URL e cole no painel da LivePix, em **API > sua aplicação > URL de notificações**, adicionando `/livepix` no final:
   ```
   https://algum-nome-aleatorio.ngrok-free.dev/livepix
   ```

5. Salve a configuração na LivePix. Agora, quando alguém fizer uma doação, a LivePix vai avisar seu servidor local através desse túnel, e o overlay vai reagir em tempo real.

> ⚠️ **Atenção:** no plano gratuito do ngrok, essa URL muda toda vez que você reinicia o túnel. Isso significa que você precisa atualizar a URL de notificações na LivePix sempre que reiniciar o ngrok. Para uma URL fixa, é necessário um plano pago do ngrok ou hospedar o servidor em um serviço na nuvem.

## 📋 Desafios

A lista de desafios fica em `data/desafios.json` e pode ser editada livremente para adicionar, remover ou ajustar o tempo de duração de cada um.

## 📌 Status do projeto

Projeto pessoal em desenvolvimento, criado para uso em lives próprias na Twitch. Contribuições e sugestões são bem-vindas!

## 👤 Autor

**Cayo**
Estudante e desenvolvedor com interesse em jogos, aplicativos e automações para streaming.

---

Se você é recrutador(a) ou tem interesse em conversar sobre oportunidades, fique à vontade para entrar em contato! 🚀