# Code Burger - BackEnd

Este é a parte back-end do projeto full-stack final desenvolvido no curso Dev Club, nele simulamos um real sistema administrativo de uma hamburgueria
em que terá cadastro de usuario, se este é administrativo ou não, acesso por autenticação ou seja o usuario terá que estar logado para acessar
determinadas rotas. Temos a parte de compras em que um usuario poderá escolher os produtos e adicionar na ordem, e tudo isso é cadastrado em banco de
dados para persistencia dos dados como seria em uma aplicação real.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o projeto](#executando-o-projeto)
- [Endpoints/API](#endpointsapi)
- [Licença](#licença)
- [Contato](#contato)

## Requisitos

node - 18.16.0
npm - 9.5.1
postgres - PORT: 5432
mongoDb - PORT: 27017
Docker - "opcional"
insomnia - teste de rotas

## Instalação 

Faça o clone do reposittório 

```bash
git clone https://github.com/CamposLeo95/code_burger_dev_club.git

```

Depois acesse a a pasta atraves do prompt 

```bash
cd code_burger_dev_club

```
E rode o comando yarn para instalar as dependencias 

```bash
yarn 

```

## Executando o projeto

Para executar o projeto é necessario que você esteja com os bancos de dados conectados, para isso você pode instalar os bancos localmente
ou usar uma imagem pelo docker

Após dar o start nos bancos de dados iniciei o aplicativo usando 

```bash
node ./src/app.js

```
Para testar as rotas você pode usar o insominia.

## Endpoints/API

### User

Rota user: Essa rota usamos para cadastrar um usuario em nosso sistema registrando no DB 

```javaScript
routes.post("/users", UserController.store);
```
<img src="https://github.com/CamposLeo95/code_burger_dev_club/assets/98062615/496caa12-daef-4b3a-b003-33cf72e5a5a4"/>

------

### Session

Rota session: Rota criada para logarmos no sistema, essa rota irá devolver um token necessario para ter acesso a outras rotas do sistema.

```javaScript
routes.post("/sessions", SessionController.store);
```
<img src="https://github.com/CamposLeo95/code_burger_dev_club/assets/98062615/2207544f-5ba7-4016-8c1b-d6142ba0e1bd"/>

------

### Products

 Rotas são usadas para cadastrar, visualizar ou editar um produto. (Necessario Token para acessar)
```javaScript
// Dados para cadastrar um produto - (POST) - User precisa ser ADMIN
routes.post("/products", upload.single("file"), ProductController.store);

//Não é necessario enviar dados apenas acessar a rota (GET)
routes.get("/products", ProductController.index);

// Dados para editar algum produto (PUT), necessario enviar o id da categoria como parametro - User precisa ser ADMIN
routes.put("/products/:id", upload.single("file"), ProductController.update);
```
<img src="https://github.com/CamposLeo95/code_burger_dev_club/assets/98062615/28e3f1e6-508e-4901-931b-811a983110fd"/>

------

### Categories

 Rotas são usadas para cadastrar, visualizar ou editar uma categoria. (Necessario Token para acessar)

```javaScript
// Dados para cadastrar uma categoria (POST) - User precisa ser ADMIN
routes.post("/categories", upload.single("file"), CategoryController.store);

//Não é necessario enviar dados apenas acessar a rota (GET)
routes.get("/categories", CategoryController.index);

// Dados para editar alguma categoria (PUT), necessario enviar o id da categoria como parametro - User precisa ser ADMIN
routes.put("/categories/:id", upload.single("file"), CategoryController.update);
```

<img src="https://github.com/CamposLeo95/code_burger_dev_club/assets/98062615/cd42b3e4-f1db-4306-a513-f3f77740dce8"/>

------

### Orders

 Rotas são usadas para cadastrar, visualizar ou editar um pedido, aqui podemos enviar mais de um pedido. (Necessario Token para acessar)


```javaScript
// Dados para cadastrar um pedido (POST), é necessario enviar o id do usuário no corpo
// id - number - (obrigatório)
// quantity - number - (obrigatório)
routes.post("/orders", OrderController.store);

//Não é necessario enviar dados apenas acessar a rota (GET)
routes.get("/orders", OrderController.index);

// Dados para editar o status do pedido (PUT) - necessario enviar o id da categoria como parametro - User precisa ser ADMIN
// status - string - (obrigatório)
routes.put("/orders/:id", OrderController.update);
```
<img src="https://github.com/CamposLeo95/code_burger_dev_club/assets/98062615/d871de21-2f7b-4281-bf58-505e51a21f0a"/>

------

## License
Este projeto está licenciado sob a LICENSE MIT.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/CamposLeo95/code_burger_dev_club/blob/main/LICENSE)

