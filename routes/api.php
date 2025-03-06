<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);
    Route::post('tasks/{task}/complete', [TaskController::class, 'complete'])->name('api.tasks.complete');
});
