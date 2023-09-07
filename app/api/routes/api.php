<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EnvioController;
use App\Http\Controllers\Api\EnvioChangeController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(EnvioController::class)->group(function(){
    Route::get('/envios','index');
    Route::post('/envio','store');
    Route::get('/envio/{id}','show');
    Route::put('/envio/{id}','update');
    Route::delete('/envio/{id}','destroy');
    Route::put('/envio/{id}','action');

});

Route::controller(EnvioChangeController::class)->group(function (){
    Route::get('/enviochanges','index');
});
