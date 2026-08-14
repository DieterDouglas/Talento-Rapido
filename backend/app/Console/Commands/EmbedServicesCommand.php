<?php

namespace App\Console\Commands;

use App\Models\Service;
use App\Services\GeminiEmbeddingService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('services:embed {--all : Reindexa também os serviços que já têm embedding}')]
#[Description('Gera o embedding (busca inteligente) dos serviços que ainda não têm um')]
class EmbedServicesCommand extends Command
{
    public function handle(GeminiEmbeddingService $embeddings): int
    {
        $services = $this->option('all')
            ? Service::query()->get()
            : Service::query()->whereNull('embedding')->get();

        if ($services->isEmpty()) {
            $this->info('Nenhum serviço pendente de indexação.');

            return self::SUCCESS;
        }

        $this->withProgressBar($services, function (Service $service) use ($embeddings) {
            try {
                $vector = $embeddings->embed("{$service->title}. {$service->description}");
                $service->update(['embedding' => $vector]);
            } catch (\Throwable $e) {
                $this->newLine();
                $this->error("Falha ao indexar serviço #{$service->id}: {$e->getMessage()}");
            }
        });

        $this->newLine(2);
        $this->info("{$services->count()} serviço(s) processado(s).");

        return self::SUCCESS;
    }
}
