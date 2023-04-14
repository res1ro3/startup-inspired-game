<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $submitted = json_decode( file_get_contents('php://input') );
    
    switch ($submitted->type) {
        case 'start-stop': {
            $sql = "SELECT is_started FROM games WHERE game_id = :gid";
            $query = $conn->prepare($sql);
            $query->bindParam(':gid', $submitted->game_id);
            $query->execute();
            $response = $query->fetch(PDO::FETCH_ASSOC);
            $is_started = !$response['is_started'];

            $sql = "UPDATE `games` SET `is_started` = :ist WHERE `games`.`game_id` = :gid";
            $query = $conn->prepare($sql);
            $query->bindParam(':gid', $submitted->game_id);
            $query->bindParam(':ist', $is_started);

            if($query->execute()) {
                $msg = $is_started == 1 ? "Game Started" : "Game Stopped";
                $response = ['status' => 1, 'message' => $msg];
            } else {
                $response = ['status' => 0, 'message' => 'An error occured.'];
            }
            echo json_encode($response);
            break;
        }

        default : {
            $response = ['status' => 1, 'message' => 'An error occured.'];
            echo json_encode($response);
        }
    }
    
?>