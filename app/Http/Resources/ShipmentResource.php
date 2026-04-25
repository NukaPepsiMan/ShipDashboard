<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
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
            'tracking_number' => $this->tracking_number,
            'recipient_name' => $this->recipient_name,
            'address' => $this->address,
            'weight' => $this->weight,
            'departure_date' => $this->departure_date,
            'delivery_date' => $this->delivery_date,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'tracking_events' => TrackingEventResource::collection($this->whenLoaded('trackingEvents'))

        ];
    }
}
