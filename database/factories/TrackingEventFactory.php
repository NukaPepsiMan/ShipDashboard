<?php

namespace Database\Factories;

use App\Models\Shipment;
use App\Models\TrackingEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrackingEvent>
 */
class TrackingEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $shipment_id = Shipment::factory();
        $location = $this->faker->address();
        $description = $this->faker->sentence();
        $event_time = $this->faker->dateTimeThisMonth();

        return [
            'shipment_id' => $shipment_id,
            'location' => $location,
            'description' => $description,
            'event_time' => $event_time
        ];
    }
}
