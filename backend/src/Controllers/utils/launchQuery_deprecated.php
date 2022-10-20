<?php
function launchQuery($method, $query, $connection, $dialect)
{
    $queryDataload = (object) [
        "method" => $method,
        "query" => $query,
        "dialect" => $dialect,
        "dataload" => [],
        "success" => false,
        "dbError" => "",
    ];

    if ($dialect == "mysql") {
        $queryExecution = mysql_query($query);

        if ($method == "GET") {
            if ($queryExecution) {
                $queryDataload["success"] = true;
                $i = 0;
                while ($row = mysql_fetch_assoc($queryExecution)) {
                    foreach ($row as $r => $key) {
                        $queryDataload["dataload"][$i][$r] = $key;
                    }
                    $i++;
                }
            } else {
                $queryDataload["dbError"] = mysql_error();
            }
        }
        if ($method == "INSERT" || $method == "UPDATE" || $method == "DELETE") {
            if (!$queryExecution) {
                $queryDataload["dbError"] = mysql_error();
            }
        }

        return $queryDataload;
    }

    if ($dialect == "oracle") {
        $stid = oci_parse($connection, $query);

        if (!$stid) {
            $e = oci_error($connection);

            $queryDataload["success"] = false;
            $queryDataload["dbError"] = $e;

            return $queryDataload;
        }

        $r = oci_execute($stid);
        if (!$r) {
            $e = oci_error($stid); // For oci_execute errors pass the statement handle

            $dataload[] = $query;
            $queryDataload["success"] = false;
            $queryDataload["dbError"] = $e;

            return $queryDataload;
        }

        $queryDataload["success"] = true;

        if ($method == "GET") {
            while (
                $row = oci_fetch_array($stid, OCI_ASSOC + OCI_RETURN_NULLS)
            ) {
                $queryDataload["dataload"] = $row;
            }
        }

        return $queryDataload;
    }
}
