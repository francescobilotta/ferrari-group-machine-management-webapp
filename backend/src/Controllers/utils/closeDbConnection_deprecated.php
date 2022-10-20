<?php

function closeDbConnection($connection, $dialect)
{
    if ($dialect == "mysql") {
        mysql_close();
    }

    if ($dialect == "oracle") {
        oci_close($connection);
    }
}
