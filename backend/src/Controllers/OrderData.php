<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

class OrderData
{
    private $request;
    private $response;
    private $data;

    public function __construct(Request $request, Response $response)
    {
        $this->request = $request;
        $this->response = $response;
        $this->data = file_get_contents(
            "http://localhost" . getenv("PREFIX_PATH") . "data/ordini.json"
        );
    }

    public function get()
    {
        if (getenv("ENVIRONMENT") === "development") {
            $data = json_decode($this->data);
            header("Content-Type: application/json; charset=utf-8");
            $this->response->setContent(json_encode($data));
        } else {
            // $data = doSomething();
            // header('Content-Type: application/json; charset=utf-8');
            // $this->response->setContent(json_encode($data));
        }
    }
}
