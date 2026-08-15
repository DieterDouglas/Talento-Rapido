<?php

namespace App\Http\Requests;

use App\Models\ServiceRequest;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->is($this->route('serviceRequest')->requester);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'rating' => ['required', 'integer', 'between:1,5'],
            'comment' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            /** @var ServiceRequest $serviceRequest */
            $serviceRequest = $this->route('serviceRequest');

            if ($serviceRequest->status !== ServiceRequest::STATUS_COMPLETED) {
                $validator->errors()->add('service_request', 'Só é possível avaliar uma contratação concluída.');
            }
        });
    }
}
