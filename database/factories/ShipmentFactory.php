<?php

namespace Database\Factories;

use App\Enum\DeliveryStatus;
use App\Models\Shipment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $tracking_number = Str::uuid();
        $recipient_name = $this->faker->name();
        $address = $this->faker->address();
        $weight = $this->faker->randomFloat(2, 0.5, 50);
        $departure_date = $this->faker->dateTimeBetween('-90 days', 'now');
        $delivery_date = $this->faker->dateTimeBetween('now', '+ 90 days');
        $status = $this->faker->randomElement(DeliveryStatus::class);

        return [
            'tracking_number' => $tracking_number,
            'recipient_name' => $recipient_name,
            'address' => $address,
            'weight' => $weight,
            'departure_date' => $departure_date,
            'delivery_date' => $delivery_date,
            'status' => $status
        ];
    }
}
