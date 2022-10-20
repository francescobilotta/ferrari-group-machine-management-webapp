<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

require_once "utils/createDbConnection.php";
require_once "utils/closeDbConnection.php";
require_once "utils/launchQuery.php";
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
            $website . $prefixPath . "data/ordiniavanzamenti.json"
        );
    }

    public function get()
    {
        global $environment,
            $mysqlDbHost,
            $mysqlDbPort,
            $mysqlDbUsername,
            $mysqlDbPassword,
            $mysqlDb;
        if ($environment === "development") {
            $data = json_decode($this->data);
            header("Content-Type: application/json; charset=utf-8");
            $this->response->setContent(json_encode($data));
        } else {
            $connection = createDbConnection(
                $mysqlDbHost,
                $mysqlDbPort,
                $mysqlDbUsername,
                $mysqlDbPassword,
                $mysqlDb,
                "mysql"
            );
            if (!$connection->connect_errno) {
                $query = "SELECT * FROM `$mysqlDb`.`ordiniavanzamenti`;";
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
                if ($queryResult["success"]) {
                    $this->response->setContent(
                        json_encode($queryResult["dataload"])
                    );
                } else {
                    $this->response->setStatusCode(500);
                    $this->response->setContent(json_encode($queryResult));
                }
            } else {
                header("Content-Type: application/json; charset=utf-8");
                $this->response->setStatusCode(500);
                $queryDataload = [
                    "success" => false,
                    "dbError" =>
                        "Failed to connect to MySQL: " .
                        $connection->connect_error,
                ];
                $this->response->setContent(json_encode($queryDataload));
            }
        }
    }

    public function post()
    {
        global $environment,
            $absolutePrePath,
            $prefixPath,
            $mysqlDbHost,
            $mysqlDbPort,
            $mysqlDbUsername,
            $mysqlDbPassword,
            $mysqlDb;
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
            header("Content-Type: application/json; charset=utf-8");
            $this->response->setContent(json_encode($sentData));
        } else {
            $connection = createDbConnection(
                $mysqlDbHost,
                $mysqlDbPort,
                $mysqlDbUsername,
                $mysqlDbPassword,
                $mysqlDb,
                "mysql"
            );
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
            if (!$connection->connect_errno) {
                $opsid = $sentData["opsid"];
                $date = $sentData["data"];
                $progressStart = $sentData["inizioavanzamento"];
                $progressEnd = $sentData["fineavanzamento"];
                $creationDate = $sentData["datacreazione"];
                $disabled = $sentData["disabilitato"];
                $query = "INSERT INTO `$mysqlDb`.`ordiniavanzamenti` (`opsid`, `data`, `inizioavanzamento`, `fineavanzamento`, `datacreazione`, `disabilitato`)
                VALUES ('$opsid', '$date', '$progressStart', '$progressEnd', '$creationDate', '$disabled');";
                $queryDataload = [
                    "method" => "INSERT",
                    "query" => $query,
                    "dialect" => "mysql",
                    "dataload" => [],
                    "success" => false,
                    "dbError" => "",
                ];
                $queryDataload["dataload"] = $sentData;
                $queryResult = launchQuery($queryDataload, $connection);
                closeDbConnection($connection, "mysql");
                header("Content-Type: application/json; charset=utf-8");
                if ($queryResult["success"]) {
                    $this->response->setContent(
                        json_encode($queryResult["dataload"])
                    );
                } else {
                    $this->response->setStatusCode(500);
                    $this->response->setContent(json_encode($queryResult));
                }
            } else {
                header("Content-Type: application/json; charset=utf-8");
                $this->response->setStatusCode(500);
                $queryDataload = [
                    "success" => false,
                    "dbError" =>
                        "Failed to connect to MySQL: " .
                        $connection->connect_error,
                ];
                $this->response->setContent(json_encode($queryDataload));
            }
        }
    }

    public function put()
    {
        global $environment,
            $absolutePrePath,
            $prefixPath,
            $mysqlDbHost,
            $mysqlDbPort,
            $mysqlDbUsername,
            $mysqlDbPassword,
            $mysqlDb;
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
            header("Content-Type: application/json; charset=utf-8");
            $this->response->setContent(json_encode($sentData));
        } else {
            $connection = createDbConnection(
                $mysqlDbHost,
                $mysqlDbPort,
                $mysqlDbUsername,
                $mysqlDbPassword,
                $mysqlDb,
                "mysql"
            );
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
            if (!$connection->connect_errno) {
                $id = $sentData["id"];
                $opsid = $sentData["opsid"];
                $date = $sentData["data"];
                $progressStart = $sentData["inizioavanzamento"];
                $progressEnd = $sentData["fineavanzamento"];
                $creationDate = $sentData["datacreazione"];
                $disabled = $sentData["disabilitato"];
                $query = "UPDATE ordiniavanzamenti a SET a.opsid = '$opsid', a.data = '$date', a.inizioavanzamento = '$progressStart', a.fineavanzamento = '$progressEnd', a.datacreazione = '$creationDate', a.disabilitato = '$disabled' WHERE a.id = '$id'";
                $queryDataload = [
                    "method" => "PUT",
                    "query" => $query,
                    "dialect" => "mysql",
                    "dataload" => [],
                    "success" => false,
                    "dbError" => "",
                ];
                $queryDataload["dataload"] = $sentData;
                $queryResult = launchQuery($queryDataload, $connection);
                closeDbConnection($connection, "mysql");
                header("Content-Type: application/json; charset=utf-8");
                if ($queryResult["success"]) {
                    $this->response->setContent(
                        json_encode($queryResult["dataload"])
                    );
                } else {
                    $this->response->setStatusCode(500);
                    $this->response->setContent(json_encode($queryResult));
                }
            } else {
                header("Content-Type: application/json; charset=utf-8");
                $this->response->setStatusCode(500);
                $queryDataload = [
                    "success" => false,
                    "dbError" =>
                        "Failed to connect to MySQL: " .
                        $connection->connect_error,
                ];
                $this->response->setContent(json_encode($queryDataload));
            }
        }
    }

    public function delete()
    {
        global $environment,
            $absolutePrePath,
            $prefixPath,
            $mysqlDbHost,
            $mysqlDbPort,
            $mysqlDbUsername,
            $mysqlDbPassword,
            $mysqlDb;
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
            header("Content-Type: application/json; charset=utf-8");
            $this->response->setContent(json_encode($sentData));
        } else {
            $connection = createDbConnection(
                $mysqlDbHost,
                $mysqlDbPort,
                $mysqlDbUsername,
                $mysqlDbPassword,
                $mysqlDb,
                "mysql"
            );
            $sentData = (int) $this->request->getParameter("id");
            if (!$connection->connect_errno) {
                $id = $sentData["id"];
                $query = "DELETE FROM `$mysqlDb`.`ordiniavanzamenti` WHERE id = '$id'";
                $queryDataload = [
                    "method" => "DELETE",
                    "query" => $query,
                    "dialect" => "mysql",
                    "dataload" => [],
                    "success" => false,
                    "dbError" => "",
                ];
                $queryDataload["dataload"] = $sentData;
                $queryResult = launchQuery($queryDataload, $connection);
                closeDbConnection($connection, "mysql");
                header("Content-Type: application/json; charset=utf-8");
                if ($queryResult["success"]) {
                    $this->response->setContent(
                        json_encode($queryResult["dataload"])
                    );
                } else {
                    $this->response->setStatusCode(500);
                    $this->response->setContent(json_encode($queryResult));
                }
            } else {
                header("Content-Type: application/json; charset=utf-8");
                $this->response->setStatusCode(500);
                $queryDataload = [
                    "success" => false,
                    "dbError" =>
                        "Failed to connect to MySQL: " .
                        $connection->connect_error,
                ];
                $this->response->setContent(json_encode($queryDataload));
            }
        }
    }
}
