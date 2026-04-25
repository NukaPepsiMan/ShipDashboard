<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    /** @use HasFactory<\Database\Factories\ShipmentFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'recipient_name',
        'address',
        'weight',
        'departure_date',
        'delivery_date',
        'status'
    ];

    /**
     *  Uso il trait HasUuids per dire a laravel 
     *  di valorizzare automaticamente questo campo
     * 
     *  */ 
    public function uniqueIds() {
        return ['tracking_number'];
    }

    // Una spedizone può avere molti eventi
    public function trackingEvents() {
        return $this->hasMany(TrackingEvent::class);
    }
}
