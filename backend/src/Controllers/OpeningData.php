<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

require_once "utils/createDbConnection.php";
require_once "utils/closeDbConnection.php";
require_once "utils/launchQuery.php";
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
        global $environment, $mysqlDbHost, $mysqlDbPort, $mysqlDbUsername, $mysqlDbPassword, $mysqlDb;
        if ($environment === "development") {
            $queryDataload = [
                "method" => "GET",
                "query" => "JSON",
                "dialect" => "mysql",
                "dataload" => [],
                "success" => true,
                "dbError" => "",
            ];
            $queryDataload["dataload"] = json_decode($this->data);
            
            header("Content-Type: application/json; charset=utf-8");
            $this->response->setContent(json_encode($queryDataload));
        } else {
            $connection = createDbConnection($mysqlDbHost, $mysqlDbPort, $mysqlDbUsername, $mysqlDbPassword, $mysqlDb, "mysql");
            if(!$connection -> connect_errno){
                $query = "SELECT macchina, data, iniziopianificato, inizioeffettivo, finepianificata, fineeffettiva, datacreazione, modificato, disabilitato FROM `$mysqlDb`.`apertureimpianti`;";
                $queryDataload = [
                    "method" => "GET",
                    "query" => $query,
                    "dialect" => "mysql",
                    "dataload" => [],
                    "success" => false,
                    "dbError" => "",
                ];
                $queryResult = launchQuery($queryDataload, $connection);
                closeDbConnection($connection, "mysql");
                header("Content-Type: application/json; charset=utf-8");
                $this->response->setContent(json_encode($queryResult));
            } else {
                header("Content-Type: application/json; charset=utf-8");
                $this->response->setStatusCode(500);
                $queryDataload = [
                    "success" => false,
                    "dbError" => "Failed to connect to MySQL: " . $connection -> connect_error,
                ];
                $this->response->setContent(json_encode($queryDataload));
            }
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
                $absolutePrePath . $prefixPath . "data/apertureimpianti.json",
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
                $absolutePrePath . $prefixPath . "data/apertureimpianti.json",
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
                $absolutePrePath . $prefixPath . "data/apertureimpianti.json",
                $newJsonData
            );
        } else {
            // $data = doSomething();
        }

        header("Content-Type: application/json; charset=utf-8");
        $this->response->setContent(json_encode($sentData));
    }
}
