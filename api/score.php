<?php
    include "./dbconnect.php";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $submitted = json_decode( file_get_contents('php://input') );
    $sql = "SELECT user_id FROM users WHERE email = :em";
    $query = $conn->prepare($sql);
    $query->bindParam(':em', $submitted->email);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);
    $user_id = $response['user_id'];

    if ($response) {
        $sql = "SELECT * FROM responses WHERE user_id = :uid AND game_id = :gid AND category = :cat AND is_correct = 1";
        $query = $conn->prepare($sql);
        $query -> bindParam(':uid', $user_id);
        $query -> bindParam(':gid', $submitted->game_id);
        $query -> bindParam(':cat', $submitted->category);
        $query->execute();
        $count = $query->rowCount();

        echo $count;
    }
?>