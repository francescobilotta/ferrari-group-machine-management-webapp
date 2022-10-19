<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

include __DIR__ . "/../env.php";

class ReasonData
{
    private $request;
    private $response;
    private $data;

    public function __construct(Request $request, Response $response)
    {
        global $prefixPath;
        $this->request = $request;
        $this->response = $response;
        $this->data = file_get_contents(
            "http://localhost" . $prefixPath . "data/causali.json"
        );
    }

    public function get()
    {
        global $environment;
        if ($environment === "development") {
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
