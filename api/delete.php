<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $submitted = json_decode( file_get_contents('php://input') );
            
    switch ($submitted->type) {
        case 'users': {
            $sql = "DELETE FROM users WHERE users.user_id = :id";
            $query = $conn->prepare($sql);
            $query->bindParam(':id', $submitted->user_id);

            if($query->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
        }

        case 'games': {
            $sql = "DELETE FROM games WHERE games.game_id = :id";
            $query = $conn->prepare($sql);
            $query->bindParam(':id', $submitted->game_id);

            if($query->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
        }

        case 'words': {
            $sql = "DELETE FROM wordbank WHERE wordbank.wordbank_id = :id";
            $query = $conn->prepare($sql);
            $query->bindParam(':id', $submitted->wordbank_id);

            if($query->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
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