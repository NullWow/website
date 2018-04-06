<?php

foreach (glob("engine/*.php") as $filename) {
    include $filename;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$num = getNumUsersOnline();
$characters = getCharactersOnline();

$online = array('Online' => $num, 'Characters' => $characters);

echo json_encode($online);

?>
