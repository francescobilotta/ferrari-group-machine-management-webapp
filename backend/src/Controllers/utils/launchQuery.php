<?php
function launchQuery($queryDataload, $connection)
{
    if ($queryDataload["dialect"] == "mysql") {
        $queryExecution = $connection->query($queryDataload["query"]);

        if ($queryDataload["method"] == "GET") {
            if ($queryExecution) {
                $queryDataload["success"] = true;
                $i = 0;
                while ($row = $queryExecution->fetch_assoc()) {
                    foreach ($row as $r => $key) {
                        $queryDataload["dataload"][$i][$r] = $key;
                    }
                    $i++;
                }
            } else {
                $queryDataload["dbError"] =
                    "Error description: " . $connection->error;
            }
        }
        if (
            $queryDataload["method"] == "INSERT" ||
            $queryDataload["method"] == "UPDATE" ||
            $queryDataload["method"] == "DELETE"
        ) {
            if ($queryExecution) {
                $queryDataload["success"] = true;
            } else {
                $queryDataload["dbError"] =
                    "Error description: " . $connection->error;
            }
        }

        return $queryDataload;
    }

    if ($queryDataload["dialect"] == "oracle") {
        $stid = oci_parse($connection, $queryDataload["query"]);

        if (!$stid) {
            $e = oci_error($connection);
            $queryDataload["dbError"] = $e;
            return $queryDataload;
        }

        $r = oci_execute($stid);
        if (!$r) {
            $e = oci_error($stid); // For oci_execute errors pass the statement handle
            $queryDataload["dbError"] = $e;
            return $queryDataload;
        }

        $queryDataload["success"] = true;

        if ($queryDataload["method"] == "GET") {
            while (
                $row = oci_fetch_array($stid, OCI_ASSOC + OCI_RETURN_NULLS)
            ) {
                $queryDataload["dataload"] = $row;
            }
        }

        return $queryDataload;
    }
}
