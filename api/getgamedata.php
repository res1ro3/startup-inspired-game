<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $game = json_decode( file_get_contents('php://input') );

    $sql = "SELECT * FROM games WHERE game_id = :gid";
    $query = $conn -> prepare($sql);
    $query->bindParam(':gid', $game->game_id);
    $query -> execute();
    $rows = $query -> fetch(PDO::FETCH_ASSOC);
    echo json_encode($rows);

?>