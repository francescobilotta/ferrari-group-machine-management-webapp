<?php

namespace App\Controllers;

use Http\Request;
use Http\Response;

require_once "utils/createDbConnection.php";
require_once "utils/closeDbConnection.php";
require_once "utils/launchQuery.php";
include __DIR__ . "/../env.php";

class OrderData
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
            $website . $prefixPath . "data/ordini.json"
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
                $query = "SELECT * FROM `$mysqlDb`.`ordini`;";
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
}
