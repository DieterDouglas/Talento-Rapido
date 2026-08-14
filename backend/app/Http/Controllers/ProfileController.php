<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;

class ProfileController extends Controller
{
    public function update(UpdateProfileRequest $request): User
    {
        $user = $request->user();
        $user->update($request->validated());

        return $user;
    }
}
