<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/checkout', 'StripeController::index');
$routes->post('/stripe/create-charge', 'StripeController::createCharge');
