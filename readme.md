Voter Server
=============

Servidor NodeJS para a aplicação Voter, um sistema de votações rápido e anônimo.

Descrição
-----------
O servidor da Voter possui endpoints para comunidação com o front-end e responde requisições gerais de login, votação etc.

Dependências Principais
------------
* NodeJS
* JSONWebToken
* MySQL
* Body-parser

Instalação/Setup
-------------
1. Execute `npm install` para instalar as dependências do Node.JS.
2. Crie um arquivo .env na raiz do projeto e insira as variáveis de ambiente para iniciar o Banco de Dados:

```
USER=root
PASSWORD=
HOST=localhost
DATABASE=vote
```
O Banco de Dados deve ser criado a partir do arquivo de dump `/dump[2021-12-24].sql` na pasta Backup. Modifique
a variável PASSWORD com a senha do seu MySQL.

3. Execute `npm start` para iniciar o servidor.
4. Execute `npm test` para executar os testes unitários.
