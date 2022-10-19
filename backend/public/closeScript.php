<?php
// header('Content-Type: application/json; charset=utf-8');

$prefixPath = "/ferrari-group-machine-management-webapp/backend/public/";
putenv("PREFIX_PATH=$prefixPath");

function createUrl($strParameters)
{
    $url =
        "http://localhost" .
        getenv("PREFIX_PATH") .
        "index.php" .
        $strParameters;
    $url = preg_replace("/\s+/", "%20", $url);
    return $url;
}

$openingsData = file_get_contents(
    "http://localhost/ferrari-group-machine-management-webapp/backend/public/index.php/opening/get"
);
$stopsData = file_get_contents(
    "http://localhost/ferrari-group-machine-management-webapp/backend/public/index.php/stop/get"
);
$progressesData = file_get_contents(
    "http://localhost/ferrari-group-machine-management-webapp/backend/public/index.php/progress/get"
);
$machinesData = file_get_contents(
    "http://localhost/ferrari-group-machine-management-webapp/backend/public/index.php/machine/get"
);

$openings = json_decode($openingsData, true);
$stops = json_decode($stopsData, true);
$progresses = json_decode($progressesData, true);
$machines = json_decode($machinesData, true);

// Close Openings
for ($i = 0; $i < count($openings); $i++) {
    if (
        $openings[$i]["inizioeffettivo"] !== "0000-00-00 00:00:00" &&
        $openings[$i]["fineeffettiva"] === "0000-00-00 00:00:00"
    ) {
        $id = $openings[$i]["id"];
        $macchina = $openings[$i]["macchina"];
        $data = $openings[$i]["data"];
        $iniziopianificato = $openings[$i]["iniziopianificato"];
        $inizioeffettivo = $openings[$i]["inizioeffettivo"];
        $finepianificata = $openings[$i]["finepianificata"];
        $fineeffettiva = $openings[$i]["finepianificata"];
        $datacreazione = $openings[$i]["datacreazione"];
        $modificato = $openings[$i]["modificato"];
        $disabilitato = $openings[$i]["disabilitato"];

        $parameters = "/opening/put?id=$id&macchina=$macchina&data=$data&iniziopianificato=$iniziopianificato&inizioeffettivo=$inizioeffettivo&finepianificata=$finepianificata&fineeffettiva=$fineeffettiva&datacreazione=$datacreazione&modificato=$modificato&disabilitato=$disabilitato";

        echo "<pre>" . var_export(createUrl($parameters), true) . "</pre>";
        file_get_contents(createUrl($parameters));

        // Close stops of that opening
        for ($s = 0; $s < count($stops); $s++) {
            if (
                $stops[$s]["data"] === $openings[$i]["data"] &&
                $stops[$s]["finefermo"] === "0000-00-00 00:00:00"
            ) {
                $id = $stops[$s]["id"];
                $macchina = $stops[$s]["macchina"];
                $data = $stops[$s]["data"];
                $iniziofermo = $stops[$s]["iniziofermo"];
                $finefermo = $openings[$i]["finepianificata"];
                $causale = $stops[$s]["causale"];
                $datacreazione = $stops[$s]["datacreazione"];
                $disabilitato = $stops[$s]["disabilitato"];

                $parameters = "/stop/put?id=$id&macchina=$macchina&data=$data&iniziofermo=$iniziofermo&finefermo=$finefermo&causale=$causale&datacreazione=$datacreazione&disabilitato=$disabilitato";

                echo "<pre>" .
                    var_export(createUrl($parameters), true) .
                    "</pre>";
                file_get_contents(createUrl($parameters));
            }
        }

        // Close progresses of that opening
        for ($p = 0; $p < count($progresses); $p++) {
            if (
                $progresses[$p]["data"] === $openings[$i]["data"] &&
                $progresses[$p]["fineavanzamento"] === "0000-00-00 00:00:00"
            ) {
                $id = $progresses[$p]["id"];
                $opsid = $progresses[$p]["opsid"];
                $data = $progresses[$p]["data"];
                $inizioavanzamento = $progresses[$p]["inizioavanzamento"];
                $fineavanzamento = $openings[$i]["finepianificata"];
                $datacreazione = $progresses[$p]["datacreazione"];
                $disabilitato = $progresses[$p]["disabilitato"];

                $parameters = "/progress/put?id=$id&opsid=$opsid&data=$data&inizioavanzamento=$inizioavanzamento&fineavanzamento=$fineavanzamento&datacreazione=$datacreazione&disabilitato=$disabilitato";

                echo "<pre>" .
                    var_export(createUrl($parameters), true) .
                    "</pre>";
                file_get_contents(createUrl($parameters));
            }
        }
    }
}

// Turn off machines
for ($m = 0; $m < count($machines); $m++) {
    if ($machines[$m]["PRIORITA"] !== 1) {
        $COD_MACCHINA = $machines[$m]["COD_MACCHINA"];
        $DESCRIZIONE = $machines[$m]["DESCRIZIONE"];
        $PRIORITA = 1;
        $CORRIDOIO = $machines[$m]["CORRIDOIO"];
        $PI_NOTE = $machines[$m]["PI_NOTE"];

        $parameters = "/machine/put?COD_MACCHINA=$COD_MACCHINA&DESCRIZIONE=$DESCRIZIONE&PRIORITA=$PRIORITA&CORRIDOIO=$CORRIDOIO&PI_NOTE=$PI_NOTE";

        echo "<pre>" . var_export(createUrl($parameters), true) . "</pre>";
        file_get_contents(createUrl($parameters));
    }
}
