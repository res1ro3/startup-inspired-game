<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
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
            $sql = "SELECT email FROM users WHERE email = :em";
            $query = $conn->prepare($sql);
            $query->bindParam(':em', $user->email);
            $query->execute();

            if ($query->rowCount() > 0) {
                $response = ['status' => 0, 'message' => 'Email already exists.'];
            } else {
                $sql = "INSERT INTO users(user_id, email, password, account_type) VALUES(null, :em, :ps, :at)";
                $query = $conn->prepare($sql);
                $query->bindParam(':em', $user->email);
                $query->bindParam(':ps', $user->password);
                $query->bindParam(':at', $user->accountType);

                if($query->execute()) {
                    $response = ['status' => 1, 'message' => 'User created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create user.'];
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