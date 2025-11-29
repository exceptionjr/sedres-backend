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
* Depois, acesse `http://localhost:3000/`

Ou execute com o [Docker](https://www.docker.com/):
```bash
docker build -t sedres-backend .                          # Build da imagem
docker run -p 3000:3000 --env-file .env sedres-backend    # Rodar a imagem
```

* Depois, acesse `http://localhost:3000`
