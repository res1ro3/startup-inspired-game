<?php
    include "./dbconnect.php";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $submitted = json_decode( file_get_contents('php://input') );
    $sql = "UPDATE `wordbank` SET `is_answered` = '1' WHERE word = :wd AND category = :cat";
    $query = $conn->prepare($sql);
    $query->bindParam(':cat', $submitted->category);
    $query->bindParam(':wd', $submitted->word);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);

    echo $response;

    // if($response) {
    //     $response = ['status' => 1, 'message' => 'Updated successfully'];
    // } else {
    //     $response = ['status' => 0, 'message' => 'Failed to update'];
    // }
    // echo json_encode($response);
    // $submitted = json_decode( file_get_contents('php://input') );

    // $sql = "SELECT * FROM wordbank WHERE word = :wd";
    // $query = $conn->prepare($sql);
    // $query->execute();
    // $response = $query->fetch(PDO::FETCH_ASSOC);
    // echo json_encode($response);

?>