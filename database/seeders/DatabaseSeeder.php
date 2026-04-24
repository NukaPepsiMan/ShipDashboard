<?php

namespace Database\Seeders;

use App\Models\Shipment;
use App\Models\TrackingEvent;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        //Popolo il DB con i dati generati dai factory
        Shipment::factory(3)->create()->each(
            function (Shipment $shipment) {
                TrackingEvent::factory(3)->create([
                    'shipment_id' => $shipment->id
                ]);
            }
        );
    }
}
