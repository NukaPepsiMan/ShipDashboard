<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShipmentRequest;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $query = Shipment::query();

        if($request->filled('search')){
            $search = $request->input('search');
            $query->where('tracking_number', 'like', "%{$search}%")
                ->orWhere('recipient_name', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%$search%");
        }

        return Inertia::render('shipments/index', [
            'shipments' => $query->latest()->get(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('shipments/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShipmentRequest $request) {
        Shipment::create($request->validated());
        redirect()->route('shipments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shipment $shipment) {
        return Inertia::render('shipments/show', [
            'shipment' => $shipment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipment $shipment)
    {
        //
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
        redirect()->route('shipments.index');
    }
}
