<?php
    include "./dbconnect.php";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    //Check for the word
    $sql = "UPDATE `wordbank` SET `is_answered` = '0'";
    $query = $conn->prepare($sql);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);
    echo "Answer reset successfull";

?>