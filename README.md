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

1. Instale PHP, Composer e PostgreSQL (recomendado: [Laravel Herd](https://herd.laravel.com/windows) para PHP/Composer no Windows)
2. Crie o banco `talento_rapido` no PostgreSQL
3. ```
   cd backend
   composer install
   cp .env.example .env   # se necessário
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

### Frontend

```
cd frontend
npm install
npm run dev
```
