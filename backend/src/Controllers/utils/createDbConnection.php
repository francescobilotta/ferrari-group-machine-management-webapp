<?php
function createDbConnection($hostname, $port, $username, $password, $database, $dialect)
{
    if ($dialect == "mysql") {
        $connection = new mysqli("$hostname","$username","$password","$database");
        return $connection;
    }

    if ($dialect == "oracle") {
        $db = "(DESCRIPTION =
                (ADDRESS = (PROTOCOL = TCP)(HOST = $hostname)(PORT = $port))
                (CONNECT_DATA = (SERVER = DEDICATED)
                (SERVICE_NAME = ferrari.ferrari.locale)))";
        $connection = oci_pconnect($username, $password, $db);
        if (!$connection) {
            $e = oci_error();
            trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
            return false;
        }
        return $connection;
    }
}
