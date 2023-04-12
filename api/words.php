<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {

        case "GET": {
            $sql = "SELECT * FROM wordbank";
            $query = $conn -> prepare($sql);
            $query -> execute();
            $rows = $query -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
            break;
        }

        case "POST": {
            $worddata = json_decode( file_get_contents('php://input') );
            $sql = "SELECT word FROM wordbank WHERE word = :wd";
            $query = $conn->prepare($sql);
            $query->bindParam(':wd', $worddata->word);
            $query->execute();

            if ($query->rowCount() > 0) {
                $response = ['status' => 0, 'message' => 'Category already exists.'];
            } else {
                $sql = "INSERT INTO wordbank(wordbank_id, category, word, is_answered) VALUES(null, :cat, :wd, 0)";
                $query = $conn->prepare($sql);
                $query->bindParam(':cat', $worddata->category);
                $query->bindParam(':wd', $worddata->word);

                if($query->execute()) {
                    $response = ['status' => 1, 'message' => 'Word created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create word.'];
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