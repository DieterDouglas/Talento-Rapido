<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\SmartSearchController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::post('/services/smart-search', [SmartSearchController::class, 'search']);
Route::post('/services', [ServiceController::class, 'store']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/me/avatar', [AvatarController::class, 'update']);
    Route::patch('/me', [ProfileController::class, 'update']);
    Route::get('/me/services', [ServiceController::class, 'me']);

    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    Route::post('/service-requests', [ServiceRequestController::class, 'store']);
    Route::get('/service-requests/{serviceRequest}', [ServiceRequestController::class, 'show']);
    Route::get('/service-requests/sent', [ServiceRequestController::class, 'sent']);
    Route::get('/service-requests/received', [ServiceRequestController::class, 'received']);
    Route::patch('/service-requests/{serviceRequest}/status', [ServiceRequestController::class, 'updateStatus']);

    Route::post('/service-requests/{serviceRequest}/review', [ReviewController::class, 'store']);
});
