# Talento Rápido

Marketplace de serviços: usuários podem cadastrar serviços que prestam, procurar serviços de outros usuários e deixar reviews.

## Stack

- **Backend:** Laravel 13 + PostgreSQL (com pgvector) + Sanctum (autenticação de API)
- **Frontend:** React + TypeScript + Vite, React Query, React Router, Axios
- **Busca inteligente:** embeddings via Gemini (`gemini-embedding-001`) + busca por similaridade de vetor no Postgres (pgvector)

## Estrutura

- `backend/` — API Laravel
- `frontend/` — SPA React

## Setup local

### Backend

1. Instale PHP e Composer (recomendado: [Laravel Herd](https://herd.laravel.com/windows) para Windows)
2. Suba um PostgreSQL isolado via Docker (imagem com a extensão pgvector):
   ```
   docker run --name talento-rapido-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=talento_rapido -p 5433:5432 -d pgvector/pgvector:pg16
   ```
3. Crie uma API key gratuita do Gemini em https://aistudio.google.com/apikey e coloque em `GEMINI_API_KEY` no `.env` (usada pra busca inteligente)
4. ```
   cd backend
   composer install
   cp .env.example .env   # se necessário
   php artisan key:generate
   php artisan storage:link
   php artisan migrate --seed
   php artisan services:embed   # gera os embeddings dos serviços seedados
   php artisan serve
   ```

Usuários de teste criados pelo seeder (senha `password` para ambos):
- `provider@example.com` — tem serviços cadastrados
- `client@example.com` — tem uma contratação concluída e avaliada

**Busca inteligente:** toda vez que um serviço é criado/editado (título ou
descrição), o embedding é gerado automaticamente. Pra reindexar tudo depois
de mexer nos dados diretamente no banco (ex: seeder), rode
`php artisan services:embed --all`.

**Upload de imagens (avatar/reviews) no Windows:** se o upload falhar com
"unable to create a temporary file", o PHP não está achando um
`upload_tmp_dir` gravável. Defina explicitamente no `php.ini` usado
(`php --ini` mostra o caminho):
```
upload_tmp_dir = "C:\Users\SEU_USUARIO\AppData\Local\Temp"
```

### Frontend

```
cd frontend
npm install
cp .env.example .env   # se necessário
npm run dev
```
