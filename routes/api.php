<?php

use App\Http\Controllers\api\ShipmentApiController;
use Illuminate\Support\Facades\Route;

Route::apiResource('shipments', ShipmentApiController::class);