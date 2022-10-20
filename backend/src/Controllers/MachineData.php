<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

require_once "utils/createDbConnection.php";
require_once "utils/closeDbConnection.php";
require_once "utils/launchQuery.php";
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
                $query = "SELECT * FROM `$mysqlDb`.`oraclemacchine`;";
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
                $absolutePrePath . $prefixPath . "data/oraclemacchine.json",
                json_encode($data)
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
                "COD_MACCHINA" => $this->request->getParameter("COD_MACCHINA"),
                "DESCRIZIONE" => $this->request->getParameter("DESCRIZIONE"),
                "PRIORITA" => (int) $this->request->getParameter("PRIORITA"),
                "CORRIDOIO" => $this->request->getParameter("CORRIDOIO"),
                "PI_NOTE" => $this->request->getParameter("PI_NOTE"),
            ];
            if (!$connection->connect_errno) {
                $machineState = $sentData["PRIORITA"];
                $machine = $sentData["COD_MACCHINA"];
                // $query = "UPDATE macch253 m SET m.priorita = '$machineState' WHERE m.reparto ='STAMP1' AND m.COD_AZIENDA = 'FG' AND m.disabilitato = 0 AND m.cod_macchina = '$machine' AND m.pi_note IS NOT NULL";
                $query = "UPDATE oraclemacchine m SET m.priorita = '$machineState' WHERE m.cod_macchina = '$machine'";
                $queryDataload = [
                    "method" => "UPDATE",
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
