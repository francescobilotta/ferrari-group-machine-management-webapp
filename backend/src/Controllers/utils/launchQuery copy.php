<?php
function launchQuery($method, $query, $dialect)
{
    $dataload = [];
    $queryStatus = [
        "method" => $method,
        "success" => false,
        "isLog" => $isLog,
        "customMessage" => "",
        "dbError" => null,
    ];

    if ($dialect == "mysql") {
        $queryStatus["success"] = true;
        $queryStatus[
            "customMessage"
        ] = "Successful execution of mysql $method query.";
        $queryStatus["dbError"] = "";
        $queryExecution = mysql_query($query);

        if ($method == "GET") {
            if ($queryExecution) {
                $i = 0;
                while ($row = mysql_fetch_assoc($queryExecution)) {
                    foreach ($row as $r => $key) {
                        $dataload[$i][$r] = $key;
                    }
                    $i++;
                }
            } else {
                $dataload[] = $query;
                $queryStatus["success"] = false;
                $queryStatus[
                    "customMessage"
                ] = "MySQL EXECUTION didn't work. ||| The query was: $query";
                $queryStatus["dbError"] = mysql_error();
            }
        }
        if ($method == "INSERT" || $method == "UPDATE" || $method == "DELETE") {
            if ($queryExecution) {
                $dataload = $queryExecution;
            } else {
                $dataload[] = $query;
                $queryStatus["success"] = false;
                $queryStatus[
                    "customMessage"
                ] = "MySQL EXECUTION didn't work. ||| The query was: $query";
                $queryStatus["dbError"] = mysql_error();
            }
        }

        $queryResult = (object) [
            "dataload" => $dataload,
            "query" => $query,
            "queryStatus" => $queryStatus,
        ];
        return $queryResult;
    }

    if ($dialect == "oracle") {
        $queryStatus["success"] = true;
        $queryStatus[
            "customMessage"
        ] = "Successful execution of oracle $method query.";
        $queryStatus["dbError"] = "";

        $stid = oci_parse($connection, $query);

        if (!$stid) {
            $e = oci_error($connection);

            $dataload[] = $query;
            $queryStatus["success"] = false;
            $queryStatus[
                "customMessage"
            ] = "Oracle PARSING didn't work. ||| The query was: $query";
            $queryStatus["dbError"] = $e;

            $queryResult = (object) [
                "dataload" => $dataload,
                "queryStatus" => $queryStatus,
            ];
            return $queryResult;
        }

        $r = oci_execute($stid);
        if (!$r) {
            $e = oci_error($stid); // For oci_execute errors pass the statement handle

            $dataload[] = $query;
            $queryStatus["success"] = false;
            $queryStatus[
                "customMessage"
            ] = "Oracle EXECUTION didn't work. ||| The query was: $query";
            $queryStatus["dbError"] = $e;

            $queryResult = (object) [
                "dataload" => $dataload,
                "queryStatus" => $queryStatus,
            ];
            return $queryResult;
        }

        if ($method == "GET") {
            while (
                $row = oci_fetch_array($stid, OCI_ASSOC + OCI_RETURN_NULLS)
            ) {
                $dataload[] = $row;
            }
        }

        $queryResult = (object) [
            "dataload" => $dataload,
            "queryStatus" => $queryStatus,
        ];
        return $queryResult;
    }
}
