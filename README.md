### Projeto TrybeSmith

Este projeto consiste no desenvolvimento de um **CRUD** (_Create, Read, Update_ e _Delete_) de itens medievais, no formato de uma _API_, utilizando _Typescript_.

Será utilizado algumas _endpoints_ que irão ler e escrever em um banco de dados, utilizando o **MySQL**.

---

# Sumário

- [Sumário](#sumário)
- [Habilidades](#habilidades)
- [Desenvolvimento](#desenvolvimento)
- [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
- [Todos os endpoints estão no padrão REST](#todos-os-endpoints-estão-no-padrão-rest)
  - [Conexão com o Banco](#conexão-com-o-banco)
  - [Tabelas](#tabelas)
  - [Linter](#linter)
- [Requisitos do projeto](#requisitos-do-projeto)
  - [Requisitos Obrigatórios](#requisitos-obrigatórios)
    - [1 - Crie um endpoint para o cadastro de pessoas usuárias](#1---Crie-um-endpoint-para-o-cadastro-de-pessoas-usuárias)
    - [2 - Crie um endpoint para o login de pessoas usuárias](#2---Crie-um-endpoint-para-o-login-de-pessoas-usuárias)
    - [3 - Crie um endpoint para o cadastro de produtos](#3---Crie-um-endpoint-para-o-cadastro-de-produtos)
    - [4 - Crie um endpoint para a listagem de produtos](#4---Crie-um-endpoint-para-a-listagem-de-produtos)
    - [5 - Crie um endpoint para o cadastro de um pedido](#5---Crie-um-endpoint-para-o-cadastro-de-um-pedido)
  - [Requisitos Bônus](#requisitos-bônus)
    - [6 - Crie um endpoint para consultar um pedido](#6---Crie-um-endpoint-para-consultar-um-pedido)
    - [7 - Crie um endpoint para listar os pedidos](#7---Crie-um-endpoint-para-listar-os-pedidos)
    
 ---

# Habilidades

Neste projeto, você será capaz de:

- Declarar variáveis e funções com tipagens _Typescript_;

- Construir uma _API Node Express_ utilizando o _Typescript_.

---

# Desenvolvimento

Você vai desenvolver todas as camadas da aplicação (_Models_, _Service_ e _Controllers_) em seu código e, por meio dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜).

O código para cadastro de pessoas usuárias deve ser criado por você utilizando os conhecimentos adquiridos nesse bloco.

---

# Antes de começar a desenvolver

1. Clone o repositório

- `git clone https://github.com/WalmirLucena/trybesmith`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd trybesmith`

2. Instale as dependências

- `npm install`

---

#  Todos os endpoints estão no padrão REST

- Foi usado os verbos `HTTP` adequados para cada operação.

- Foi agrupado e padronizado suas _URL_ em cada recurso.

- Garantiu-se que seus _endpoints_ sempre retornem uma resposta, havendo sucesso nas operações ou não.

- Foi retornado os códigos de _status_ corretos (recurso criado, erro de validação, etc).

---

```typescript
import express from 'express';

const app = express();

app.use(express.json());

export default app;
```

## Conexão com o Banco

A conexão do banco local contem os seguintes parâmetros:

```typescript
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export default connection;
```


```
  host: process.env.MYSQL_HOST
  user: process.env.MYSQL_USER
  password: process.env.MYSQL_PASSWORD
```

**:warning: É esperado que o arquivo tenha o nome de `connection.ts` e esteja no diretório `src/models` :warning:**

## Tabelas

O banco terá três tabelas: pessoas usuárias, produtos e pedidos.

```sql
DROP SCHEMA IF EXISTS Trybesmith;
CREATE SCHEMA Trybesmith;

CREATE TABLE Trybesmith.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  classe TEXT NOT NULL,
  level INTEGER NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Trybesmith.Orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES Trybesmith.Users (id)
);

CREATE TABLE Trybesmith.Products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  amount TEXT NOT NULL,
  orderId INTEGER,
  FOREIGN KEY (orderId) REFERENCES Trybesmith.Orders (id)
);
```

---

## Linter

Usaremos o [ESLint](https://eslint.org/) para fazer a análise estática do seu código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas no arquivos `package.json`.

Para poder rodar os `ESLint` em um projeto, basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

# Requisitos do projeto

## Requisitos Obrigatórios

### 1 - Crie um endpoint para o cadastro de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/users`);

- As informações de pessoas usuárias cadastradas devem ser salvas na tabela `Users` do banco de dados;

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no _cadastro_. No seu _payload_ deve estar presente o _id_ e _username_.

- O endpoint deve receber a seguinte estrutura:
```json
{
  "username": "string",
  "classe": "string",
  "level": 1,
  "password": "string"
}
```

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > :point_right: Para username
  - **[Será validado que o campo "username" é obrigatório]**
    - Se a requisição não tiver o campo "username", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "error": "Username is required" }
    ```

  - **[Será validado que o campo "username" tem o tipo string]**
    - Se o campo "username" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Username must be a string" }
    ```

  - **[Será validado que o campo "username" é uma string com mais de 2 caracteres]**
    - Se o campo "username" não for do tipo `string` com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Username must be longer than 2 characters" }
    ```

  <br>

  > :point_right: Para classe
  - **[Será validado que o campo "classe" é obrigatório]**
    - Se a requisição não tiver o campo "classe", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "error": "classe is required" }
    ```

  - **[Será validado que o campo "classe" tem o tipo string]**
    - Se o campo "classe" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Classe must be a string" }
    ```

  - **[Será validado que o campo "classe" é uma string com mais de 2 caracteres]**
    - Se o campo "classe" não for do tipo `string` com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Classe must be longer than 2 characters" }
    ```

  <br>

  > :point_right: Para level
  - **[Será validado que o campo "level" é obrigatório]**
    - Se a pessoa usuária não tiver o campo "level", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "error": "Level is required" }
    ```

  - **[Será validado que o campo "level" tem o tipo number]**
    - Se o campo "level" não for do tipo `number`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Level must be a number" }
    ```

  - **[Será validado que o campo "level" deve ser um número maior que 0]**
    - Se o campo "level" não for do tipo `number` maior que 0, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Level must be greater than 0" }
    ```

  <br>

  > :point_right: Para password
  - **[Será validado que o campo "password" é obrigatório]**
    - Se a requisição não tiver o campo "password", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "error": "Password is required" }
    ```

  - **[Será validado que o campo "password" tem o tipo string]**
    - Se o campo "password" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Password must be a string" }
    ```

  - **[Será validado que o campo "password" é uma string com 8 ou mais caracteres]**
    - Se o campo "password" não for do tipo `string` com mais de 8 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Password must be longer than 7 characters" }
    ```

  <br>

  > :point_right: Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível cadastrar a pessoa usuária com sucesso]**
    - Se a pessoa usuária for cadastrada com sucesso, o resultado deverá ser conforme o exibido abaixo, com um _status http_ `201` e retornando um _token_:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```

</details>

---

### 2 - Crie um endpoint para o login de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/login`).

- A rota deve receber os campos `username` e `password`, e esses campos devem ser validados no banco de dados.

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no _login_. No seu _payload_ deve estar presente o _id_ e _username_.

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "username": "string",
    "password": "string"
  }
```

**:warning: Na configuração do `JWT` não use variáveis de ambientes para não ter conflito com o avaliador.**

<details close>
 <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > :point_right: Para caso haja problemas no login
  - **[Será validado que o campo "username" é enviado]**
    - Se o _login_ não tiver o campo "username", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "error": "Username is required" }
    ```

  - **[Será validado que o campo "password" é enviado]**
    - Se o _login_ não tiver o campo "password", o resultado retornado deverá ser um _status http_ `400`
    ```json
      { "error": "Password is required" }
    ```

  - **[Será validado que não é possível fazer login com um username inválido]**
    - Se o _login_ tiver o username inválido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Username or password invalid" }
    ```

  - **[Será validado que não é possível fazer login com uma senha inválida]**
    - Se o login tiver a senha inválida, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Username or password invalid" }
    ```

  <br>

  > :point_right: Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível fazer login com sucesso]**
    - Se o login foi feito com sucesso, o resultado deverá ser um _status http_ `200` e deverá retornar um _token_:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```
</details>

---

### 3 - Crie um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`).

- Um produto só pode ser criado caso a pessoa usuária esteja _logada_ e o _token_ `JWT` validado.

- Os produtos enviados devem ser salvos na tabela `Products` do banco de dados;

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "name": "Espada longa",
    "amount": "30 peças de ouro"
  }
```

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > :point_right: Para token
  - **[Será validado que não é possível cadastrar um produto sem token]**
    - Se o token não for informado, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Token not found" }
    ```

  - **[Será validado que não é possível cadastrar um produto com um token inválido]**
    - Se o token informado não for válido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Invalid token" }
    ```

  <br>

  > :point_right: Para name
  - **[Será validado que o campo "name" é obrigatório]**
    - Se o campo "name" não for informado, o resultado retornado deverá ser um  _status http_ `400` e
    ```json
      { "error": "Name is required" }
    ```

  - **[Será validado que o campo "name" tem o tipo string]**
    - Se o campo "name" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Name must be a string" }
    ```

  - **[Será validado que o campo "name" é uma string com mais de 2 caracteres]**
    - Se o campo "name" não for uma string com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Name must be longer than 2 characters" }
    ```

  <br>

  > :point_right: Para amount
  - **[Será validado que o campo "amount" é obrigatório]**
    - Se o campo "amount" não for informado, o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "error": "Amount is required" }
    ```

  - **[Será validado que o campo "amount" tem o tipo string]**
    - Se o campo "amount" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Amount must be a string" }
    ```

  - **[Será validado que o campo "amount" é uma string com mais de 2 caracteres]**
    - Se o campo "amount" não for uma string com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Amount must be longer than 2 characters" }
    ```

  <br>

  > :point_right: Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível cadastrar um produto com sucesso]**
    - O resultado retornado para cadastrar o produto com sucesso deverá ser conforme exibido abaixo, com um _status http_ `201`:
    ```json
      {
        "item": {
          "id": 1,
          "name": "Poção de cura",
          "amount": "20 gold",
        }
      }
    ```

</details>

---

### 4 - Crie um endpoint para a listagem de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- A rota pode ser acessada apenas por pessoas logadas e com token `JWT` válido;

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > :point_right: Para token
  - **[Será validado que não é possível listar todos os produtos sem token]**
    - Se o token não for informado, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Token not found" }
    ```

  - **[Será validado que não é possível listar todos os produtos com um token inválido]**
    - Se o token informado não for válido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Invalid token" }
    ```

  <br>

  > :point_right: Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível listar todos os produtos com sucesso]**
    - O resultado retornado para listar produtos com sucesso deverá ser conforme exibido abaixo, com um _status http_ `200`:
    ```json
    [
      {
        "id": 1,
        "name": "Poção de cura",
        "amount": "20 gold",
        "orderId": null
      },
      {
        "id": 2,
        "name": "Escudo do Herói",
        "amount": "100 diamond",
        "orderId": 1
      }
    ]
    ```
</details>

---

### 5 - Crie um endpoint para o cadastro de um pedido

- O endpoint deve ser acessível através do caminho (`/orders`).

- Um pedido só pode ser criado caso a pessoa usuária esteja logada e o token `JWT` validado.

- Os pedidos enviados devem ser salvos na tabela `Orders` do banco de dados. A tabela `Products` também deve ser alterada;

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "products": [1, 2]
  }
```

**:warning: Ao cadastrar um pedido, lembre-se de atualizar os respectivos produtos no banco de dados, incluindo neles o número do pedido criado.**

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > :point_right: Para token
  - **[Será validado que não é possível cadastrar pedidos sem token]**
    - Se o token não for informado, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Token not found" }
    ```

  - **[Será validado que não é possível cadastrar um pedido com token inválido]**
    - Se o token informado não for válido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Invalid token" }
    ```

  <br>

  > :point_right: Para products
  - **[Será validado que o campo "products" é obrigatório]**
    - Se o corpo da requisição não possuir o campo "products", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "error": "Products is required" }
    ```

  - **[Será validado que não é possível criar um pedido com o campo "products" não sendo um array]**
    - Se o valor do campo "products" não for um array, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Products must be an array of numbers" }
    ```

  - **[Será validado que não é possível cadastrar um pedido se o campo "products" for um array vazio]**
    - Se o campo "products" possuir um array vazio, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "error": "Products can't be empty" }
    ```

  <br>

  > :point_right: Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível criar um pedido com sucesso com 1 item]**
    - O resultado retornado para cadastrar um pedido com sucesso deverá ser conforme exibido abaixo, com um _status http_ `201`:
    ```json
      {
        "order": {
          "userId": 1,
          "products": [1],
        }
      }
    ```

  - **[Será validado que é possível criar um pedido com sucesso com vários itens]**
    - O resultado retornado para cadastrar um pedido com sucesso deverá ser conforme exibido abaixo, com um _status http_ `201`:
    ```json
      {
        "order": {
          "userId": 1,
          "products": [1, 2]
        }
      }
    ```
</details>

---

## Requisito Bônus

### 6 - Crie um endpoint para consultar um pedido

- O endpoint deve ser acessível através do caminho (`/orders/:id`);

- O pedido só poderá ser acessado caso uma pessoa usuária esteja logada e o token `JWT` validado;

- É necessário passar o `id` correspondente ao pedido na rota;

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > :point_right: Para token
  - **[Será validado que não é possível exibir um pedido sem token]**
    - Se o token não for informado, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Token not found" }
    ```

  - **[Será validado que não é possível exibir um pedido com token inválido]**
    - Se o token informado não for válido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Invalid token" }
    ```

  <br>

  > :point_right: Para order
  - **[Será validado que não é possível exibir um pedido inexistente]**
    - Se o pedido não existir, o resultado retornado deverá ser um _status http_ `404` e
    ```json
      { "error": "Order not found" }
    ```

  <br>

  > :point_right: Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível exibir um pedido com sucesso buscando pelo seu id]**
    - O resultado retornado para consultar um pedido com sucesso deverá ser conforme exibido abaixo, com um _status http_ `200`:
    ```json
      {
        "id": 1,
        "userId": 2,
        "products": [1, 2]
      }
    ```
</details>

---

### 7 - Crie um endpoint para listar todos os pedidos

- O endpoint deve ser acessível através do caminho (`/orders`).

- A lista só poderá ser acessada caso a pessoa usuária esteja logada e o token `JWT` validado.

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > :point_right: Para token
  - **[Será validado que não é possível listar pedidos sem token]**
    - Se o token não for informado, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Token not found" }
    ```

  - **[Será validado que não é possível listar pedidos com token inválido]**
    - Se o token informado não for válido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "error": "Invalid token" }
    ```

  <br>

  > :point_right: Para orders
  - **[Será validado que é possível listar todos os pedidos com sucesso quando houver apenas um pedido]**
    - Quando houver apenas um pedido, o resultado retornado para listar pedidos com sucesso deverá ser conforme exibido abaixo, com um _status http_ `200`:
    ```json
      [
        {
          "id": 1,
          "userId": 2,
          "products": [1, 2]
        }
      ]
    ```

  - **[Será validado que é possível listar todos os pedidos com sucesso quando hover mais de um pedido]**
    - Quando houver mais de um pedido, o resultado retornado para listar pedidos com sucesso deverá ser conforme exibido abaixo, com um _status http_ `200`:
    ```json
      [
        {
          "id": 1,
          "userId": 2,
          "products": [1, 2]
        },
        {
          "id": 2,
          "userId": 2,
          "products": [3, 1, 4]
        }
      ]
    ```
</details>
