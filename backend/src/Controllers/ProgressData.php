<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

include __DIR__ . "/../env.php";

class ProgressData
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
                "data/ordiniavanzamenti.json"
        );
    }

    public function get()
    {
        global $environment;
        global $absolutePrePath;
        global $prefixPath;
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
        global $absolutePrePath;
        global $prefixPath;
        if ($environment === "development") {
            $data = json_decode($this->data, true);
            $sentData = [
                "opsid" => (int) $this->request->getParameter("opsid"),
                "data" => $this->request->getParameter("data"),
                "inizioavanzamento" => $this->request->getParameter(
                    "inizioavanzamento"
                ),
                "fineavanzamento" => $this->request->getParameter(
                    "fineavanzamento"
                ),
                "datacreazione" => $this->request->getParameter(
                    "datacreazione"
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

            $sentData["id"] = $highestId["id"] + 1;

            array_push($data, $sentData);
            $newJsonData = json_encode($data);
            file_put_contents(
                $absolutePrePath . $prefixPath . "data/ordiniavanzamenti.json",
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
        global $absolutePrePath;
        global $prefixPath;
        if ($environment === "development") {
            $data = json_decode($this->data, true);
            $sentData = [
                "id" => (int) $this->request->getParameter("id"),
                "opsid" => (int) $this->request->getParameter("opsid"),
                "data" => $this->request->getParameter("data"),
                "inizioavanzamento" => $this->request->getParameter(
                    "inizioavanzamento"
                ),
                "fineavanzamento" => $this->request->getParameter(
                    "fineavanzamento"
                ),
                "datacreazione" => $this->request->getParameter(
                    "datacreazione"
                ),
                "disabilitato" => (int) $this->request->getParameter(
                    "disabilitato"
                ),
            ];
            for ($i = 0; $i < count($data); $i++) {
                if ($data[$i]["id"] === $sentData["id"]) {
                    $data[$i]["id"] = $sentData["id"];
                    $data[$i]["opsid"] = $sentData["opsid"];
                    $data[$i]["data"] = $sentData["data"];
                    $data[$i]["inizioavanzamento"] =
                        $sentData["inizioavanzamento"];
                    $data[$i]["fineavanzamento"] = $sentData["fineavanzamento"];
                    $data[$i]["datacreazione"] = $sentData["datacreazione"];
                    $data[$i]["disabilitato"] = $sentData["disabilitato"];
                }
            }
            $newJsonData = json_encode($data);
            file_put_contents(
                $absolutePrePath . $prefixPath . "data/ordiniavanzamenti.json",
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
        global $absolutePrePath;
        global $prefixPath;
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
                $absolutePrePath . $prefixPath . "data/ordiniavanzamenti.json",
                $newJsonData
            );
        } else {
            // $data = doSomething();
        }

        header("Content-Type: application/json; charset=utf-8");
        $this->response->setContent(json_encode($sentData));
    }
}
