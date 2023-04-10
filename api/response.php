<?php
    include "./dbconnect.php";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $submitted = json_decode( file_get_contents('php://input') );

    function addIncorrect($conn, $submitted) {
        $sql = "INSERT INTO `responses` (`user_id`, `category`, `word`, `is_correct`, `game_id`) VALUES ('1', :cat, :wd, '0', '1')";
        $query = $conn->prepare($sql);
        $query->bindParam(':cat', $submitted->category);
        $query->bindParam(':wd', $submitted->word);
        $query->execute();
    }

    function addCorrect($conn, $submitted) {
        $sql = "INSERT INTO `responses` (`user_id`, `category`, `word`, `is_correct`, `game_id`) VALUES ('1', :cat, :wd, '1', '1')";
        $query = $conn->prepare($sql);
        $query->bindParam(':cat', $submitted->category);
        $query->bindParam(':wd', $submitted->word);
        $query->execute();
    }


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
            
            addCorrect($conn, $submitted);
            $response = ['status' => 1, 'message' => 'Correct Answer.'];
            
            echo json_encode($response);
        } else {
            addIncorrect($conn, $submitted);
            $response = ['status' => 0, 'message' => 'Word is already answered.'];
            echo json_encode($response);
        }
    } else {
        addIncorrect($conn, $submitted);
        $response = ['status' => 0, 'message' => 'Word is not included in word bank.'];
        echo json_encode($response);
    }

    

?>