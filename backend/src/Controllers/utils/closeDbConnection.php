<?php

function closeDbConnection($connection, $dialect)
{
    if ($dialect == "mysql") {
        $connection->close();
    }

    if ($dialect == "oracle") {
        oci_close($connection);
    }
}
