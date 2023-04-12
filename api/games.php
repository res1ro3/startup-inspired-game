<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {

        case "GET": {
            $sql = "SELECT * FROM games";
            $query = $conn -> prepare($sql);
            $query -> execute();
            $rows = $query -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
            break;
        }

        case "POST": {
            $game = json_decode( file_get_contents('php://input') );
            $sql = "SELECT category FROM games WHERE category = :cat";
            $query = $conn->prepare($sql);
            $query->bindParam(':cat', $game->category);
            $query->execute();

            if ($query->rowCount() > 0) {
                $response = ['status' => 0, 'message' => 'Category already exists.'];
            } else {
                $sql = "INSERT INTO games(game_id, category, is_started) VALUES(null, :cat, 0)";
                $query = $conn->prepare($sql);
                $query->bindParam(':cat', $game->category);

                if($query->execute()) {
                    $response = ['status' => 1, 'message' => 'Game created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create game.'];
                }
            }
            echo json_encode($response);
            break;
        }

        default: {
            echo "default";
        }

    }
    
?>