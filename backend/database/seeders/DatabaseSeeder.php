<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Review;
use App\Models\Service;
use App\Models\ServiceRequest;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $categories = Category::factory(10)->create();

        $knownPassword = Hash::make('password');

        $provider = User::factory()->create([
            'name' => 'Prestador Teste',
            'email' => 'provider@example.com',
            'password' => $knownPassword,
        ]);

        $client = User::factory()->create([
            'name' => 'Cliente Teste',
            'email' => 'client@example.com',
            'password' => $knownPassword,
        ]);

        $otherUsers = User::factory(18)->create();
        $allUsers = $otherUsers->push($provider, $client);

        $services = $allUsers->flatMap(
            fn (User $user) => Service::factory(random_int(1, 3))
                ->for($user, 'provider')
                ->for($categories->random())
                ->create()
        );

        // Garante que o usuário "Cliente Teste" tenha pelo menos uma contratação
        // concluída e avaliada, pra dar algo pra ver ao logar com ele no frontend.
        $seedService = $services->first(fn (Service $service) => ! $service->provider->is($client));
        $seedRequest = ServiceRequest::factory()
            ->completed()
            ->for($seedService)
            ->for($client, 'requester')
            ->create();
        Review::factory()->for($seedRequest)->create([
            'rating' => 5,
            'comment' => 'Serviço excelente, recomendo!',
        ]);

        $services->each(function (Service $service) use ($allUsers) {
            $requesters = $allUsers->reject(fn (User $user) => $user->is($service->provider))->random(random_int(0, 4));

            foreach ($requesters as $requester) {
                $serviceRequest = ServiceRequest::factory()
                    ->for($service)
                    ->for($requester, 'requester')
                    ->create();

                if ($serviceRequest->status === ServiceRequest::STATUS_COMPLETED && fake()->boolean(70)) {
                    Review::factory()->for($serviceRequest)->create();
                }
            }
        });
    }
}
