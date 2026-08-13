<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => fake()->catchPhrase(),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 30, 500),
            'location' => fake()->city(),
        ];
    }
}
