<?php

return [
    ["GET", "/", ["App\Controllers\SampleData", "show"]],

    ["GET", "/stop/get", ["App\Controllers\StopData", "get"]],
    ["GET", "/stop/post", ["App\Controllers\StopData", "post"]],
    ["GET", "/stop/put", ["App\Controllers\StopData", "put"]],
    ["GET", "/stop/delete", ["App\Controllers\StopData", "delete"]],

    ["GET", "/opening/get", ["App\Controllers\OpeningData", "get"]],
    ["GET", "/opening/post", ["App\Controllers\OpeningData", "post"]],
    ["GET", "/opening/put", ["App\Controllers\OpeningData", "put"]],
    ["GET", "/opening/delete", ["App\Controllers\OpeningData", "delete"]],

    ["GET", "/progress/get", ["App\Controllers\ProgressData", "get"]],
    ["GET", "/progress/post", ["App\Controllers\ProgressData", "post"]],
    ["GET", "/progress/put", ["App\Controllers\ProgressData", "put"]],
    ["GET", "/progress/delete", ["App\Controllers\ProgressData", "delete"]],

    ["GET", "/qtyprogressed/get", ["App\Controllers\QtyProgressedData", "get"]],
    [
        "GET",
        "/qtyprogressed/post",
        ["App\Controllers\QtyProgressedData", "post"],
    ],
    ["GET", "/qtyprogressed/put", ["App\Controllers\QtyProgressedData", "put"]],
    [
        "GET",
        "/qtyprogressed/delete",
        ["App\Controllers\QtyProgressedData", "delete"],
    ],

    ["GET", "/qtydiscarded/get", ["App\Controllers\QtyDiscardedData", "get"]],
    ["GET", "/qtydiscarded/post", ["App\Controllers\QtyDiscardedData", "post"]],
    ["GET", "/qtydiscarded/put", ["App\Controllers\QtyDiscardedData", "put"]],
    [
        "GET",
        "/qtydiscarded/delete",
        ["App\Controllers\QtyDiscardedData", "delete"],
    ],

    ["GET", "/reason/get", ["App\Controllers\ReasonData", "get"]],

    ["GET", "/order/get", ["App\Controllers\OrderData", "get"]],

    ["GET", "/machine/get", ["App\Controllers\MachineData", "get"]],
    ["GET", "/machine/put", ["App\Controllers\MachineData", "put"]],
];
