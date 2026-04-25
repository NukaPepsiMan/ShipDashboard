<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackingEvent extends Model
{
    /** @use HasFactory<\Database\Factories\TrackingEventFactory> */
    use HasFactory;

    protected $fillable = [
        'location',
        'description',
        'status',
        'event_time'
    ];

    //un evento appartiene a una spedizione
    public function shipment() {
        return $this->belongsTo(Shipment::class);
    }
}
