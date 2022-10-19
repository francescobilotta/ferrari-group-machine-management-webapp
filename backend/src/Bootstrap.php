<?php

namespace App;

require __DIR__ . "/../vendor/autoload.php";
include "env.php";

error_reporting(E_ALL);

/**
 * Register the error handler
 */
$whoops = new \Whoops\Run();
if ($environment !== "production") {
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler());
} else {
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler());
    $whoops->pushHandler(function ($e) {
        echo "Todo: Friendly error page and send an email to the developer";
    });
}
$whoops->register();

$injector = include "Dependencies.php";
$request = $injector->make("Http\HttpRequest");
$response = $injector->make("Http\HttpResponse");

foreach ($response->getHeaders() as $header) {
    header($header, false);
}

$routeDefinitionCallback = function (\FastRoute\RouteCollector $r) {
    $routes = include "Routes.php";
    foreach ($routes as $route) {
        $r->addRoute($route[0], $route[1], $route[2]);
    }
};

$dispatcher = \FastRoute\simpleDispatcher($routeDefinitionCallback);

$httpMethod = $request->getMethod();
$uri = $request->getPath();
$uri = str_replace($prefixPath . "index.php", "", $uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case \FastRoute\Dispatcher::NOT_FOUND:
        $response->setContent("404 - Page not found");
        $response->setStatusCode(404);
        break;
    case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $response->setContent("405 - Method not allowed");
        $response->setStatusCode(405);
        break;
    case \FastRoute\Dispatcher::FOUND:
        $className = $routeInfo[1][0];
        $method = $routeInfo[1][1];
        $vars = $routeInfo[2];

        $class = $injector->make($className);
        $class->$method($vars);
        //echo "<pre>" . var_export($response->getStatusCode(), true) . "</pre>";
        break;
}

http_response_code($response->getStatusCode());
echo $response->getContent();
