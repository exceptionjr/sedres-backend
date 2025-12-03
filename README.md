<div align="center">
  <img src="./public/VIII-SEDRES-H1.svg" alt="VIII SEDRES" width="400"  />
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=plastic&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=plastic&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=plastic&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Zod-3E6F8E?style=plastic&logo=zod&logoColor=white" 
  alt="Zod" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192.svg?style=plastic&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=plastic&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=plastic&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<br>

Repositório de uma api desenvolvido para o VIII Seminário de Desenvolvimento 
Regional, Estado e Sociedade (VIII SEDRES), evento acadêmico que será realizado 
em 2026 na cidade de Marabá-PA.

## Início Rápido

Execute o projeto com o npm (é necessário ter o [Node.js 22v](https://nodejs.org/) instalado):
```bash
cp env_example .env   # Copiar o .env
npm install           # Instale as dependências
npm run build         # Faça o build do projeto
npm start             # Execute o projeto
```
* Depois, acesse `http://localhost:4000/`

Ou execute com o [Docker](https://www.docker.com/):
```bash
docker build -t sedres-backend .                          # Build da imagem
docker run -p 4000:4000 --env-file .env sedres-backend    # Rodar a imagem
```

* Depois, acesse `http://localhost:4000`

## Deploy na Vercel

Este projeto está configurado para deploy na [Vercel](https://vercel.com/) com [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres).

### Passos para Deploy

1. **Instale a Vercel CLI** (opcional, mas recomendado):
   ```bash
   npm install -g vercel
   ```

2. **Conecte seu repositório à Vercel**:
   - Acesse [vercel.com](https://vercel.com/) e importe seu repositório do GitHub
   - Ou use `vercel` na linha de comando

3. **Crie um banco de dados Vercel Postgres**:
   - No dashboard da Vercel, vá em **Storage** > **Create Database** > **Postgres**
   - Conecte o banco ao seu projeto

4. **Configure as variáveis de ambiente**:
   A Vercel irá automaticamente configurar as variáveis do Postgres, mas você precisa adicionar:
   ```
   JWT_SECRET=sua_chave_secreta_aqui
   ```

5. **Execute as migrações** (após o primeiro deploy):
   ```bash
   vercel env pull .env.local  # Baixar variáveis de ambiente
   npx prisma migrate deploy   # Aplicar migrações
   ```

### Variáveis de Ambiente na Vercel

| Variável | Descrição |
|----------|-----------|
| `POSTGRES_PRISMA_URL` | URL de conexão com pooling (automático) |
| `POSTGRES_URL_NON_POOLING` | URL de conexão direta (automático) |
| `JWT_SECRET` | Chave secreta para JWT (manual) |

### Estrutura do Projeto para Vercel

```
sedres-backend/
├── dist/                 # Build de produção (gerado)
├── prisma/
│   ├── schema.prisma     # Schema do Prisma
│   └── migrations/       # Migrações do banco
├── src/                  # Código fonte
├── vercel.json           # Configuração da Vercel
└── package.json
```
