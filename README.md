# Talento Rápido

Marketplace de serviços: usuários podem cadastrar serviços que prestam, procurar serviços de outros usuários e deixar reviews.

## Stack

- **Backend:** Laravel 13 + PostgreSQL + Sanctum (autenticação de API)
- **Frontend:** React + TypeScript + Vite, React Query, React Router, Axios

## Estrutura

- `backend/` — API Laravel
- `frontend/` — SPA React

## Setup local

### Backend

1. Instale PHP e Composer (recomendado: [Laravel Herd](https://herd.laravel.com/windows) para Windows)
2. Suba um PostgreSQL isolado via Docker:
   ```
   docker run --name talento-rapido-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=talento_rapido -p 5433:5432 -d postgres:16-alpine
   ```
3. ```
   cd backend
   composer install
   cp .env.example .env   # se necessário
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

Usuários de teste criados pelo seeder (senha `password` para ambos):
- `provider@example.com` — tem serviços cadastrados
- `client@example.com` — tem uma contratação concluída e avaliada

### Frontend

```
cd frontend
npm install
cp .env.example .env   # se necessário
npm run dev
```
