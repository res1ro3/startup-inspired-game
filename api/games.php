<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $sql = "SELECT * FROM games";
    $query = $conn -> prepare($sql);
    $query -> execute();
    $rows = $query -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
    
?>