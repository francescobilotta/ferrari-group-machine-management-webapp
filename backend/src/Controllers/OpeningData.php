<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

include __DIR__ . "/../env.php";

class OpeningData
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
            $website .
            $prefixPath .
                "data/apertureimpianti.json"
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

    public function post()
    {
        global $environment;
        if ($environment === "development") {
            $data = json_decode($this->data, true);
            $sentData = [
                "macchina" => $this->request->getParameter("macchina"),
                "data" => $this->request->getParameter("data"),
                "iniziopianificato" => $this->request->getParameter(
                    "iniziopianificato"
                ),
                "inizioeffettivo" => $this->request->getParameter(
                    "inizioeffettivo"
                ),
                "finepianificata" => $this->request->getParameter(
                    "finepianificata"
                ),
                "fineeffettiva" => $this->request->getParameter(
                    "fineeffettiva"
                ),
                "datacreazione" => $this->request->getParameter(
                    "datacreazione"
                ),
                "modificato" => (int) $this->request->getParameter(
                    "modificato"
                ),
                "disabilitato" => (int) $this->request->getParameter(
                    "disabilitato"
                ),
            ];

            if (count($data) > 0) {
                $highestId = array_reduce(
                    $data,
                    function ($prev, $curr) {
                        return $prev["id"] > $curr["id"] ? $prev : $curr;
                    },
                    $data[0]
                );
            } else {
                $highestId = 0;
            }
            $sentData["id"] = (int) $highestId["id"] + 1;

            array_push($data, $sentData);
            $newJsonData = json_encode($data);
            file_put_contents(
                "/var/www/html/ferrari-group-machine-management-webapp/backend/public/data/apertureimpianti.json",
                $newJsonData
            );
        } else {
            // $data = doSomething();
        }
        header("Content-Type: application/json; charset=utf-8");
        $this->response->setContent(json_encode($sentData));
    }

    public function put()
    {
        global $environment;
        if ($environment === "development") {
            $data = json_decode($this->data, true);
            $sentData = [
                "id" => (int) $this->request->getParameter("id"),
                "macchina" => $this->request->getParameter("macchina"),
                "data" => $this->request->getParameter("data"),
                "iniziopianificato" => $this->request->getParameter(
                    "iniziopianificato"
                ),
                "inizioeffettivo" => $this->request->getParameter(
                    "inizioeffettivo"
                ),
                "finepianificata" => $this->request->getParameter(
                    "finepianificata"
                ),
                "fineeffettiva" => $this->request->getParameter(
                    "fineeffettiva"
                ),
                "datacreazione" => $this->request->getParameter(
                    "datacreazione"
                ),
                "modificato" => (int) $this->request->getParameter(
                    "modificato"
                ),
                "disabilitato" => (int) $this->request->getParameter(
                    "disabilitato"
                ),
            ];
            for ($i = 0; $i < count($data); $i++) {
                if ($data[$i]["id"] === $sentData["id"]) {
                    $data[$i]["id"] = $sentData["id"];
                    $data[$i]["macchina"] = $sentData["macchina"];
                    $data[$i]["data"] = $sentData["data"];
                    $data[$i]["iniziopianificato"] =
                        $sentData["iniziopianificato"];
                    $data[$i]["inizioeffettivo"] = $sentData["inizioeffettivo"];
                    $data[$i]["finepianificata"] = $sentData["finepianificata"];
                    $data[$i]["fineeffettiva"] = $sentData["fineeffettiva"];
                    $data[$i]["datacreazione"] = $sentData["datacreazione"];
                    $data[$i]["modificato"] = $sentData["modificato"];
                    $data[$i]["disabilitato"] = $sentData["disabilitato"];
                }
            }
            $newJsonData = json_encode($data);

            file_put_contents(
                "/var/www/html/ferrari-group-machine-management-webapp/backend/public/data/apertureimpianti.json",
                $newJsonData
            );
        } else {
            // $data = doSomething();
        }

        header("Content-Type: application/json; charset=utf-8");
        $this->response->setContent(json_encode($sentData));
    }

    public function delete()
    {
        global $environment;
        if ($environment === "development") {
            $data = json_decode($this->data, true);
            $sentData = (int) $this->request->getParameter("id");
            $resultData = [];
            foreach ($data as &$element) {
                if ($element["id"] !== $sentData) {
                    array_push($resultData, $element);
                }
            }
            $newJsonData = json_encode($resultData);
            file_put_contents(
                "/var/www/html/ferrari-group-machine-management-webapp/backend/public/data/apertureimpianti.json",
                $newJsonData
            );
        } else {
            // $data = doSomething();
        }

        header("Content-Type: application/json; charset=utf-8");
        $this->response->setContent(json_encode($sentData));
    }
}
