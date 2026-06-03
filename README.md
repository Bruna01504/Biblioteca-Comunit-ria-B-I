# Biblioteca Comunitária B-I

## Descrição do Projeto

Este projeto é um MVP (Produto Mínimo Viável) desenvolvido para a gestão de uma **Biblioteca Comunitária**. Ele permite o controle simplificado de leitores, acervo de livros e o fluxo de empréstimos e devoluções, garantindo que a comunidade possa organizar suas leituras de forma eficiente.

A aplicação utiliza uma arquitetura cliente-servidor simples, com um backend em Node.js e um banco de dados local SQLite, ideal para implementações rápidas e de baixo custo.

## Funcionalidades Principais

-   **Cadastro de Leitores**: Registro de nome, telefone e e-mail para contato.
-   **Controle de Acervo**: Cadastro de livros com título, autor e controle de quantidade em estoque.
-   **Gestão de Empréstimos**: 
    -   Registro de novos empréstimos vinculados a leitores.
    -   Verificação automática de disponibilidade de estoque.
    -   Controle de datas de devolução prevista.
    -   Sistema de devolução que atualiza automaticamente o status do empréstimo e o estoque de livros.

## Tecnologias Utilizadas

-   **Linguagem**: JavaScript (Node.js)
-   **Framework Web**: [Express.js](https://expressjs.com/)
-   **Banco de Dados**: [SQLite3](https://www.sqlite.org/)
-   **Frontend**: HTML5, CSS3 e JavaScript puro (Vanilla JS)

## Estrutura de Arquivos

```text
Biblioteca-Comunit-ria-B-I/
├── README.md                 # Documentação do projeto
└── biblioteca-mvp/
    └── biblioteca-mvp/
        ├── server.js         # Servidor Express e lógica de API
        ├── database.db       # Arquivo do banco de dados SQLite
        ├── package.json      # Dependências e scripts do Node.js
        └── public/           # Arquivos estáticos do frontend
            ├── index.html    # Interface do usuário
            └── app.js        # Lógica de interação do frontend
```

## Como Instalar e Rodar

### Pré-requisitos

-   [Node.js](https://nodejs.org/) instalado em sua máquina.
-   Git para clonar o repositório.

### Passo a Passo

1.  **Clone este repositório:**
    ```bash
    git clone https://github.com/Bruna01504/Biblioteca-Comunit-ria-B-I.git
    ```

2.  **Acesse a pasta do servidor:**
    ```bash
    cd Biblioteca-Comunit-ria-B-I/biblioteca-mvp/biblioteca-mvp
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie a aplicação:**
    ```bash
    npm start
    ```

5.  **Acesse no navegador:**
    Abra o endereço [http://localhost:3000](http://localhost:3000).

## Documentação da API

A aplicação disponibiliza uma API REST para integração:

### Leitores
- `GET /api/leitores`: Lista todos os leitores.
- `POST /api/leitores`: Cadastra um novo leitor.

### Livros
- `GET /api/livros`: Lista o acervo completo.
- `POST /api/livros`: Adiciona um novo título ao acervo.

### Empréstimos
- `GET /api/emprestimos`: Lista empréstimos ativos.
- `POST /api/emprestimos`: Registra um novo empréstimo.
- `POST /api/emprestimos/:id/devolver`: Realiza a devolução de um livro.

---
Desenvolvido como parte do projeto de Biblioteca Comunitária B-I. Contribuições e sugestões são sempre bem-vindas!
