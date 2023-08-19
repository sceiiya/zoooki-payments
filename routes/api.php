<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Redirect;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/sanctum/csrf-cookie', function (Request $request) {
    $token = csrf_token();
    return response()->json(['token' => $token]);
});

Route::get('/', function () {
    sleep(2);
    return Redirect::to('https://zoooki-collab.wd49p.com/');
});
Route::get('/redirect-to-home', function () {
    return Redirect::to('https://zoooki-collab.wd49p.com/');
})->name('redirectToHome');

Route::get('/products', [ProductController::class, 'index'])->name('product.inv');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('product.details');

Route::post('/checkout', [ProductController::class, 'checkout'])->name('checkout');
Route::get('/success', [ProductController::class, 'success'])->name('checkout.success');
Route::get('/cancel', [ProductController::class, 'cancel'])->name('checkout.cancel');
Route::post('/stripe-webhook', [ProductController::class, 'webhook'])->name('checkout.webhook');
