const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const MIN_MASTER_CARD = 63;
const MAX_MASTER_CARD = 93;

const MIN_PLAYER_CARD = 1;
const MAX_PLAYER_CARD = 62;

const NB_PLAYER_CARD = 10;

masterCards = [];
playerCards = [];

const server = http.createServer((req, res) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.setHeader('Content-Type', 'text/plain');
  const reqURL = req.url;
  const reqMethod = req.method;
  switch (reqMethod) {
    case "GET":
        if (reqURL === "/master") {
            res.statusCode = 200;
            res.end('' + randomMasterCard())
        } else if (reqURL === "/player") {
            res.statusCode = 200;
            let cards = [];
            Array.from({ length: NB_PLAYER_CARD }, (x, i) => {
                cards.push('' + randomPlayerCard());
            });
            res.end(cards.join(','));
        } else if (reqURL === "/reset") {
            playerCards = [];
            masterCards = [];
            res.statusCode = 200;
            res.end('Game reseted')
        } else if (reqURL === "/start") {
            playerCards = [];
            res.statusCode = 200;
            res.end('Game started')
        }
    default: {
        res.statusCode = 404;
        res.end()
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function randomMasterCard() {
    let card;
    do {
        card = Math.floor(Math.random() * (MAX_MASTER_CARD - MIN_MASTER_CARD + 1) + MIN_MASTER_CARD)
    } while(masterCards.includes(card));
    masterCards.push(card);
    return ('0' + card).slice(-2);
  }

  function randomPlayerCard() {
    let card;
    do {
        card = Math.floor(Math.random() * (MAX_PLAYER_CARD - MIN_PLAYER_CARD + 1) + MIN_PLAYER_CARD)
    } while(playerCards.includes(card));
    playerCards.push(card);
    return ('0' + card).slice(-2);
  }
