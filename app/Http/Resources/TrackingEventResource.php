<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrackingEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'shipment_id' => $this->shipment_id,
            'location' => $this->location,
            'description' => $this->description,
            'event_time' => $this->event_time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
