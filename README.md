![API](https://img.shields.io/badge/Projeto-API-blue)

# 🛍️ API RESTful para Sistema de E-commerce
> Estudo – Estrutura de Dados | 2º Semestre ADS

Este projeto foi desenvolvido como parte da atividade final da disciplina de **Desenvolvimento Backend**, com o objetivo de criar uma **API RESTful robusta, segura e modular**, utilizando a stack **Node.js + Express + MySQL + Sequelize**.

O sistema simula um ambiente de e-commerce real, com **autenticação JWT**, **criptografia de senhas**, **relacionamentos entre tabelas**, e uma **documentação interativa com Swagger**.

---

## 📌 Funcionalidades Implementadas

### ✅ Autenticação e Usuários

- Cadastro de usuário com hash de senha (bcrypt)
- Login com geração de token JWT
- Middleware de autenticação para rotas protegidas
- Atualização de perfil
- Exclusão de conta
- Consulta de perfil autenticado

### ✅ Gestão de Categorias

- CRUD completo (Criar, Listar, Atualizar, Deletar)
- Associação de produtos a uma categoria
- Validação de exclusão apenas se a categoria não tiver produtos vinculados

### ✅ Gestão de Produtos

- Cadastro de produtos com nome, descrição, preço e estoque
- Listagem geral e individual
- Atualização e exclusão de produtos
- Relacionamento com categorias (1:N)

### ✅ Gestão de Pedidos

- Criação de pedidos por usuários autenticados
- Cada pedido pode conter múltiplos produtos (N:N)
- Consulta de pedidos por usuário e por ID
- Cancelamento de pedidos
- Controle de estoque com transações atômicas para garantir integridade dos dados

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Finalidade                              |
|-----------------|-----------------------------------------|
| Node.js         | Ambiente de execução JavaScript no backend |
| Express.js      | Framework web para APIs RESTful         |
| MySQL           | Banco de dados relacional               |
| Sequelize       | ORM para manipulação do banco           |
| bcryptjs        | Criptografia de senhas                  |
| JWT             | Autenticação com tokens seguros         |
| dotenv          | Gerenciamento de variáveis de ambiente  |
| Swagger         | Documentação interativa da API          |
| Nodemon         | Reinicialização automática no desenvolvimento (opcional) |

---

## 📂 Estrutura do Projeto

API_Loja/
├── 📄 .sequelizerc      # Aponta para onde o Sequelize deve criar os arquivos
├── 📄 .env.example      # Exemplo de como configurar as variáveis de ambiente
├── 📄 package.json      # Lista de dependências e scripts do projeto
│
└── 📦 src/
    ├── 📄 app.js        # Arquivo principal que configura o Express e o Swagger
    ├── 📄 server.js     # Arquivo que inicia o servidor e o faz "ouvir" requisições
    │
    ├── 📂 config/       # Configuração do banco de dados para o Sequelize
    ├── 📂 controllers/  # Lógica de negócio de cada rota (o que fazer)
    ├── 📂 database/     # Migrations para criar as tabelas do banco
    ├── 📂 middlewares/  # Funções executadas entre a requisição e a resposta (ex: auth)
    ├── 📂 models/       # Representação das tabelas do banco de dados (os "moldes")
    └── 📂 routes/       # Definição dos endpoints da API (os caminhos/URLs)

## ⚙️ Como Executar o Projeto Localmente

### ✅ Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- MySQL Server (ex: XAMPP, WAMP, MySQL oficial)

---

### 📋 Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/ATalDaAiume/API_Loja.git
cd API_Loja
```

---

2. **Instale as dependências**

```bash
npm install
```

---

3. **Configure o ambiente**

- Copie o arquivo .env.example e renomeie para .env:

```bash
cp .env.example .env
```

- Edite o .env com os seus dados de configuração:

```bash
# Configuração do Servidor
PORT=3001

# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_mysql
DB_NAME=api_loja
DB_DIALECT=mysql

# JWT
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```
