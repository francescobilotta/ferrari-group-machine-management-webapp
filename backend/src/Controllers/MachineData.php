<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

include "utils/launchQuery.php";
include __DIR__ . "/../env.php";

class MachineData
{
    private $request;
    private $response;
    private $data;

    public function __construct(Request $request, Response $response)
    {
        global $prefixPath;
        global $website;
        $this->request = $request;
        $this->response = $response;
        $this->data = file_get_contents(
            $website . $prefixPath . "data/oraclemacchine.json"
        );
    }

    public function get()
    {
        global $environment;
        if ($environment === "development") {
            $data = json_decode($this->data, true);
        } else {
            $query = "SELECT * FROM `ferrari-group`.oraclemacchine;";
            $data = launchQuery("GET", $query, "MySQL");
            // $data = doSomething();
        }
        header("Content-Type: application/json; charset=utf-8");
        $this->response->setContent(json_encode($data));
        //header("Content-Type: text/html; charset=utf-8");
        //$this->response->setContent("404 - Page not found");
        //$this->response->setStatusCode(500);
    }

    public function put()
    {
        global $environment;
        if ($environment === "development") {
            $data = json_decode($this->data, true);
            $sentData = [
                "COD_MACCHINA" => $this->request->getParameter("COD_MACCHINA"),
                "DESCRIZIONE" => $this->request->getParameter("DESCRIZIONE"),
                "PRIORITA" => (int) $this->request->getParameter("PRIORITA"),
                "CORRIDOIO" => $this->request->getParameter("CORRIDOIO"),
                "PI_NOTE" => $this->request->getParameter("PI_NOTE"),
            ];
            for ($i = 0; $i < count($data); $i++) {
                if ($data[$i]["COD_MACCHINA"] === $sentData["COD_MACCHINA"]) {
                    $data[$i]["COD_MACCHINA"] = $sentData["COD_MACCHINA"];
                    $data[$i]["DESCRIZIONE"] = $sentData["DESCRIZIONE"];
                    $data[$i]["PRIORITA"] = $sentData["PRIORITA"];
                    $data[$i]["CORRIDOIO"] = $sentData["CORRIDOIO"];
                    $data[$i]["PI_NOTE"] = $sentData["PI_NOTE"];
                }
            }
            file_put_contents(
                "/var/www/html/ferrari-group-machine-management-webapp/backend/public/data/oraclemacchine.json",
                json_encode($data)
            );
        } else {
            // $data = doSomething();
        }

        header("Content-Type: application/json; charset=utf-8");
        $this->response->setContent(json_encode($sentData));
    }
}
