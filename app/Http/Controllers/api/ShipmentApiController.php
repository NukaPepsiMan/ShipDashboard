<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShipmentRequest;
use App\Http\Resources\ShipmentResource;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ShipmentResource::collection(Shipment::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShipmentRequest $request) {
        $shipment = Shipment::create($request->validated());
        return ShipmentResource::make($shipment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Shipment $shipment)
    {
        $shipment->load('trackingEvents');
        return ShipmentResource::make($shipment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shipment $shipment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shipment $shipment)
    {
        $shipment->delete();
        return response()->noContent();
    }
}
