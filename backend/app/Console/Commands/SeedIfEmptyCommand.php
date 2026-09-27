<?php

namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;

class SeedIfEmptyCommand extends Command
{
    protected $signature = 'db:seed-if-empty';

    protected $description = 'Roda o DatabaseSeeder apenas se o banco ainda nao tiver categorias';

    public function handle(): int
    {
        if (Category::count() > 0) {
            $this->info('Banco ja tem dados, pulando seed.');

            return self::SUCCESS;
        }

        $this->call('db:seed', ['--force' => true]);

        return self::SUCCESS;
    }
}
