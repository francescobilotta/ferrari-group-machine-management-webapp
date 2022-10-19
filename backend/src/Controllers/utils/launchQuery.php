<?php
function launchQuery($method, $query, $dialect)
{
    $queryResult = [];
    $connection = "";
    $dataload = [];

    if ($dialect == "MySQL") {
        $hostname = "localhost:3306";
        $username = "root";
        $password = "password";
        $database = null;

        $connection = mysql_connect($hostname, $username, $password);
        mysql_select_db($database, $connection);

        if (mysql_errno()) {
            return false;
        }
        $queryExecution = mysql_query($query);

        if ($queryExecution) {
            $i = 0;
            while ($row = mysql_fetch_assoc($queryExecution)) {
                foreach ($row as $r => $key) {
                    $dataload[$i][$r] = $key;
                }
                $i++;
            }
        }

        var_dump("dataload");
        var_dump($dataload);

        // if ($connection -> connect_errno)
        //     {
        //        $queryResult['queryStatus'] = false;
        //        $queryResult['dataload'] = "Failed to connect to MySQL: " . $connection -> connect_error;
        //        return $queryResult;
        //     }
        //if($method == "GET") {
        //    $result = ($connection->query($query));
        //    $row = [];
        //
        //    if ($result->num_rows > 0)
        //    {
        //        // fetch all data from db into array
        //        $row = $result->fetch_all(MYSQLI_ASSOC);
        //    }
        //
        //    $queryResult['queryStatus'] = true;
        //    $queryResult['dataload'] = $row;
        //    return $queryResult;
        //}
    }
}
