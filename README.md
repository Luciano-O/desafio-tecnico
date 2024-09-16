# Teste fullstack - Lupit.io com Next.js, NestJS, Prisma e PostgreSQL

Este projeto é uma aplicação fullstack composta por um **frontend** feito com **Next.js**, um **backend** desenvolvido em **NestJS** com **PrismaORM**, e um banco de dados **PostgreSQL**.

## Acessando o projeto

### Frontend
- **[Vercel](https://desafio-tecnico-lupit.vercel.app/)**: O frontend do projeto esta hospedado no vercel, e pode ser acessado através desse link

### Backend
- O backend do projeto esta hospedado no Render, e sua url é: https://desafio-tecnico-yzpm.onrender.com

### Banco de Dados
- O serviço utilizado para hospedar o banco de dados desse projeto foi o Supabase

## Tecnologias Utilizadas

### Frontend
- **[Next.js](https://nextjs.org/)**: Framework React para renderização híbrida (SSR e SSG).
- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript para o frontend.

### Backend
- **[NestJS](https://nestjs.com/)**: Framework para desenvolvimento de aplicações backend escaláveis usando TypeScript.
- **[PrismaORM](https://www.prisma.io/)**: ORM para interação com o banco de dados relacional (PostgreSQL).

### Banco de Dados
- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de gerenciamento de banco de dados relacional.

### Infraestrutura
- **[Docker](https://www.docker.com/)**: Plataforma para criação de ambientes isolados por contêineres.
- **[Docker Compose](https://docs.docker.com/compose/)**: Ferramenta para orquestração de múltiplos contêineres Docker.

## Pré-requisitos

- **Docker** e **Docker Compose** instalados em seu ambiente.  
  Se você ainda não tem essas ferramentas instaladas, siga as instruções:
  - [Instalar Docker](https://docs.docker.com/get-docker/)
  - [Instalar Docker Compose](https://docs.docker.com/compose/install/)

## Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/Luciano-O/desafio-tecnico.git
cd desafio-tecnico.git
```
### 2. Build e Execução com Docker Compose

Para construir e executar a aplicação com o Docker Compose, execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build
```

Isso fará o Docker Compose:

- Construir as imagens do frontend e backend.
- Baixar e iniciar o banco de dados PostgreSQL.
- Aplicar as migrações do banco de dados automaticamente via Prisma.

### 3. Acessando a aplicação
- Frontend: Acesse http://localhost:3000
- Backend (NestJS): Acesse http://localhost:3001
- PostgreSQL: O banco de dados estará acessível via localhost:5432 com o nome de usuário postgres e senha password.
