<?php
    include "./dbconnect.php";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    //Check for the word
    $sql = "SELECT * FROM responses WHERE user_id = 1 AND game_id = 1 AND is_correct = 1";
    $query = $conn->prepare($sql);
    $query->execute();
    $count = $query->rowCount();

    echo $count;
?>