# Students Hub

Um projeto criado para gerenciar cadastro de alunos usando no frontend: ReactJs, MaterialUI, Axios e outros; e no backend: NestJs, Jest, TypeORM e SQLite.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/erikadonato/students-hub
   cd students-hub

2. Instale as dependências
   ```bash
   $ cd frontend
   $ yarn install
   $ cd .. 
   $ cd backend
   $ yarn install

## Configuração

A configuração do banco de dados está no arquivo students-hub/backend/database/typeorm-config.service. A API utiliza SQLite como banco de dados.


## Execução

- Para iniciar frontend e backend ao mesmo tempo, certifique que está na raiz da pasta students-hub:

   ```bash
   $ yarn start

A api estará rodando em http://localhost:3001.
O front estará rodando em http://localhost:3000.

- Se preferir, ambos tem dockerfile: 
   ```bash
   $ cd frontend
   $ docker build -t nome_do_container_front .
   $ docker run nome_do_container_front 
   $ cd .. 
   $ cd backend
   $ docker build -t nome_do_container_back .
   $ docker run nome_do_container_back 

A api estará rodando em http://localhost:3001.
O front estará rodando em http://localhost:3000.

## Endpoints

# Adicionar um novo aluno
- URL: /student/save
    Método: POST
    Body:
    json
    {
        "nome": "Test",
        "email": "Test@email",
        "cpf": "2334" 
    }

# Buscar um aluno por parametro
- URL: /student/search
    Método: GET
    Query Params: nome (string), email (string), cpf(string)
    

# Atualizar um aluno por parametro
- URL: /student/update
    Método: PATCH
    Body:
    json
    {
        "id": "1",
        "nome": "Test",
        "email": "Test@email",
        "cpf": "2334" 
    }

# Deletar uma aluno
- URL: /student/delete
    Método: DELETE
    Query Params: id (string)

## Testes

- Para executar os testes, feitos somente no backend, certifique que está na raiz da pasta students-hub:
    ```bash
   $ cd backend
   $ yarn test
