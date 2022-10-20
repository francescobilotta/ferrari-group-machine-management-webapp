<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

require_once "utils/createDbConnection.php";
require_once "utils/closeDbConnection.php";
require_once "utils/launchQuery.php";
include __DIR__ . "/../env.php";

class QtyProgressedData
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
            $website . $prefixPath . "data/ordiniqtaavanzata.json"
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
            $sentData = json_decode($this->data);

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
            if (!$connection->connect_errno) {
                $query = "SELECT * FROM `$mysqlDb`.`ordiniqtaavanzata`;";
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
                "qtaavanzata" => (int) $this->request->getParameter(
                    "qtaavanzata"
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
                $absolutePrePath . $prefixPath . "data/ordiniqtaavanzata.json",
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
                "qtaavanzata" => (int) $this->request->getParameter(
                    "qtaavanzata"
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
                $qtyProgressed = $sentData["qtaavanzata"];
                $creationDate = $sentData["datacreazione"];
                $disabled = $sentData["disabilitato"];
                $query = "INSERT INTO `$mysqlDb`.`ordiniqtaavanzata` (`opsid`, `data`, `qtaavanzata`, `datacreazione`, `disabilitato`)
                VALUES ('$opsid', '$date', '$qtyProgressed', '$creationDate', '$disabled');";
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
                "qtaavanzata" => (int) $this->request->getParameter(
                    "qtaavanzata"
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
                    $data[$i]["qtaavanzata"] = $sentData["qtaavanzata"];
                    $data[$i]["datacreazione"] = $sentData["datacreazione"];
                    $data[$i]["disabilitato"] = $sentData["disabilitato"];
                }
            }
            $newJsonData = json_encode($data);
            file_put_contents(
                $absolutePrePath . $prefixPath . "data/ordiniqtaavanzata.json",
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
                "qtaavanzata" => (int) $this->request->getParameter(
                    "qtaavanzata"
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
                $qtyProgressed = $sentData["qtaavanzata"];
                $creationDate = $sentData["datacreazione"];
                $disabled = $sentData["disabilitato"];
                $query = "UPDATE ordiniqtaavanzata q SET q.opsid = '$opsid', q.data = '$date', q.qtaavanzata = '$qtyProgressed', q.datacreazione = '$creationDate', q.disabilitato = '$disabled' WHERE q.id = '$id'";
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
                $absolutePrePath . $prefixPath . "data/ordiniqtaavanzata.json",
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
                $query = "DELETE FROM `$mysqlDb`.`ordiniqtaavanzata` WHERE id = '$id'";
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
