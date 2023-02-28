<h1 align="center"> Rest API com Node.js </h1>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Badge Versão do Angular CLI](https://img.shields.io/badge/Node.js-v18.12.0-blue)
![Badge Versão do Angular CLI](https://img.shields.io/badge/npm-v8.19.2-blue)

Esse projeto está sendo desenvolvido a partir de uma [aula](https://www.youtube.com/watch?v=xR4D2bp8_S0&t=1s) do Erick Wendel. É uma rest API (ainda incompleta) feita em Node.js, sem frameworks, e com a arquitetura n-layer (há mais detalhes sobre isso no arquivo notes.txt).

<br>

## Como Abrir e Rodar o Projeto
Depois de baixado, e acessada a pasta, você pode instalar as dependências do projeto por meio do comando `npm install`. Em seguida, para rodar o código, use `npm start`; ele vai estar disponível em [localhost:3000](http://localhost:3000)

<br>

## Acessando a API :door:
* `GET`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**/heroes** &nbsp; -> &nbsp; Retorna todos os heróis presentes na base de dados  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
**/heroes/{id}**  &nbsp; -> &nbsp; Retorna o herói com ID correspondente ao informado, caso exista 

* `POST`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**/heroes** &nbsp; -> &nbsp; Cria um novo herói  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Corpo da requisição &nbsp; -> &nbsp; **{ "name": string, "age": number, "power": string }**

* `PATCH`   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**/heroes/{id}** &nbsp; -> &nbsp; Altera os dados do herói informado  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
Corpo da requisição &nbsp; -> &nbsp; Você escolhe qual(is) campo(s) alterar 


* `DELETE`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**/heroes/{id}** &nbsp; -> &nbsp; apaga o herói informado 
