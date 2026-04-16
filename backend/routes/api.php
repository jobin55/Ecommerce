<?php

use Illuminate\Support\Facades\Route;

Route::get('/users', function () {
    return [
        ['id' => 1, 'name' => 'Jobin'],
        ['id' => 2, 'name' => 'Test User']
    ];
});