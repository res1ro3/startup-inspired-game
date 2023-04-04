<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {

        case "GET": {
            $sql = "SELECT * FROM users";
            $query = $conn -> prepare($sql);
            $query -> execute();
            $rows = $query -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
            break;
        }

        case "POST": {
            $user = json_decode( file_get_contents('php://input') );
            $sql = "INSERT INTO users(user_id, email, password, account_type) VALUES(null, :em, :ps, :at)";
            $query = $conn->prepare($sql);
            $query->bindParam(':em', $user->email);
            $query->bindParam(':ps', $user->password);
            $query->bindParam(':at', $user->account_type);

            if($query->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            echo json_encode($response);
            break;
        }

        case "DELETE": {
            $sql = "DELETE FROM users WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
    
            $query = $conn->prepare($sql);
            $query->bindParam(':id', $path[3]);
    
            if($query->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
        }

        default: {
            echo "default";
        }
    }
    
?>