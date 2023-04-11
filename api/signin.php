<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $user = json_decode( file_get_contents('php://input') );
    $sql = "SELECT * FROM users WHERE email = :em AND is_active = 0";
    $query = $conn->prepare($sql);
    $query->bindParam(':em', $user->email);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);

    if ($response) {
        $sql = "SELECT * FROM users WHERE email = :em AND password = :ps";
        $query = $conn->prepare($sql);
        $query->bindParam(':em', $user->email);
        $query->bindParam(':ps', $user->password);
        $query->execute();
        $response = $query->fetch(PDO::FETCH_ASSOC);

        $sql = "UPDATE users SET is_active = 1 WHERE email = :em";
        $query = $conn->prepare($sql);
        $query->bindParam(':em', $user->email);
        $query->execute();

        if($response) {
            $response = ['status' => 1, 'message' => 'Signin Successful.', 'email' => $user->email];
        } else {
            $response = ['status' => 0, 'message' => 'Email and Password does not match.'];
        }
    } else {
        $response = ['status' => 1, 'message' => "Already logged in"];
    }
    echo json_encode($response);
?>