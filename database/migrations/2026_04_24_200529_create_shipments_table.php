<?php

use App\Enum\DeliveryStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->uuid('tracking_number')->unique(); // Codice univoco della spedizione
            $table->string('recipient_name'); // Nome destinatario
            $table->string('address'); // Indirizzo
            $table->decimal('weight'); // Peso
            $table->date('departure_date'); // Data di partenza
            $table->date('delivery_date'); // Data di consegna
            $table->string('status')->default(DeliveryStatus::PENDING); //Stato della spedizione
            $table->timestamps(); // Crea created_at e updated_at 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
