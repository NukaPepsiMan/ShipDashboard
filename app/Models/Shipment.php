<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    /** @use HasFactory<\Database\Factories\ShipmentFactory> */
    use HasFactory;

    protected $fillable = [
        'tracking_number',
        'recipent_name',
        'address',
        'weight',
        'departure_date',
        'delivery_date',
        'status'
    ];


    // Una spedizone può avere molti eventi
    public function trackingEvents() {
        return $this->hasMany(TrackingEvent::class);
    }
}
