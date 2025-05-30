import express from "express";
const PORTA = 3000;
const server = express();
server.use(express.json());

let estoque = [
  {
    id: 1,
    nome: "Teclado Gaymer",
    preco: 300.99,
    quantidade: 10
  },
  {
    id: 2,
    nome: "Mouse Sem Fio",
    preco: 89.90,
    quantidade: 25
  },
  {
    id: 3,
    nome: "Fone QCY H3",
    preco: 280.00,
    quantidade: 1
  }
];

let ultimoId = estoque.length;

server.get("/estoque", (request, response) => {
  response.json(estoque);
});

server.post("/estoque", (request, response) => {
  console.log("Adicionando novo produto: ", request.body);

  ultimoId++;
  request.body.id = ultimoId;

  estoque.push(request.body);

  response.sendStatus(201);
});

server.get("/estoque/:id", (request, response) => {
  const index = estoque.findIndex(produto => produto.id === Number(request.params.id));

  if (index === -1) {
    response.sendStatus(404);
  } else {
    response.json(estoque[index]);
  }
});

server.patch("/estoque/:id", (request, response) => {
  const index = estoque.findIndex(produto => produto.id === Number(request.params.id));

  if (index === -1) {
    response.sendStatus(404);
  } else {
    request.body.id = estoque[index].id; 

    estoque[index] = request.body;
    response.json(estoque[index]);
  }
});

server.delete("/estoque/:id", (request, response) => {
  const index = estoque.findIndex(produto => produto.id === Number(request.params.id));

  if (index === -1) {
    response.sendStatus(404);
  } else {
    estoque.splice(index, 1);
    response.sendStatus(200);
  }
});

server.listen(PORTA, () => {
  console.log("Servidor de estoque rodando na porta:", PORTA);
});