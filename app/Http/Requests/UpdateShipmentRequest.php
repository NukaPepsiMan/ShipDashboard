<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateShipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     * 
     * 
     * Ho aggiunto sometimes prima di required in modo che laravel dica:
     * se non è presente il campo ignoralo
     * se è presente verifica che non sia empty o null
     */
    public function rules(): array
    {
        return [
            'recipient_name'  => 'sometimes|required|string|max:255',
            'address'         => 'sometimes|required|string|max:500',
            'weight'          => 'sometimes|required|numeric|min:0.1|max:9999.99',
            'departure_date'  => 'sometimes|required|date',
            'delivery_date'   => 'sometimes|required|date|after_or_equal:departure_date'
        ];
    }
}
