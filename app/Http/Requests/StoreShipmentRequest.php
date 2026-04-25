<?php

namespace App\Http\Requests;

use App\Enum\DeliveryStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreShipmentRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'recipient_name'  => 'required|string|max:255',
            'address'         => 'required|string|max:500',
            'weight'          => 'required|numeric|min:0.1|max:9999.99',
            'departure_date'  => 'required|date',
            'delivery_date'   => 'required|date|after_or_equal:departure_date'
        ];
    }
}
