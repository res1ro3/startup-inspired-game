<?php
    include "./dbconnect.php";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    //Check for the word
    $submitted = json_decode( file_get_contents('php://input') );
    $sql = "SELECT * FROM `wordbank` WHERE word = :wd AND category = :cat";
    $query = $conn->prepare($sql);
    $query->bindParam(':cat', $submitted->category);
    $query->bindParam(':wd', $submitted->word);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);
    
    if ($response != false) {
        $sql = "SELECT * FROM `wordbank` WHERE word = :wd AND category = :cat AND is_answered = 0";
        $query = $conn->prepare($sql);
        $query->bindParam(':cat', $submitted->category);
        $query->bindParam(':wd', $submitted->word);
        $query->execute();
        $response = $query->fetch(PDO::FETCH_ASSOC);

        if ($response != false) {
            $sql = "UPDATE `wordbank` SET `is_answered` = '1' WHERE word = :wd AND category = :cat";
            $query = $conn->prepare($sql);
            $query->bindParam(':cat', $submitted->category);
            $query->bindParam(':wd', $submitted->word);
            $query->execute();
            
            $response = ['status' => 1, 'message' => 'Correct Answer.'];
            
            echo json_encode($response);
        } else {
            $response = ['status' => 0, 'message' => 'Word is already answered.'];
            echo json_encode($response);
        }
    } else {
        $response = ['status' => 0, 'message' => 'Word is not included in word bank.'];
        echo json_encode($response);
    }

    

?>