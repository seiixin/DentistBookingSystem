<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Maintenance mode check
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Composer autoload
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel app
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

// Handle the request (no return value!)
$app->handleRequest(Request::capture());

// Terminate app (no arguments required)
$app->terminate();
