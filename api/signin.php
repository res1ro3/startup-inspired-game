<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $user = json_decode( file_get_contents('php://input') );
    $token = $_POST['token'];
    $response = ['status' => 1, 'message' => $token];
    echo json_encode($response);
    

    // if ($user->token != "") {
    //     $sql = "SELECT * FROM users WHERE email = :em AND password = :ps";
    //     $query = $conn->prepare($sql);
    //     $query->bindParam(':em', $user->email);
    //     $query->bindParam(':ps', $user->password);
    //     $query->execute();
    //     $response = $query->fetch(PDO::FETCH_ASSOC);

    //     if($response) {
    //         $token = bin2hex(random_bytes(64));
    //         $response = ['status' => 1, 'message' => 'Signin Successful.', 'token' => $token];
    //     } else {
    //         $response = ['status' => 0, 'message' => 'Email and Password does not match.'];
    //     }
    // } else {
    //     $response = ['status' => 1, 'message' => "Already logged in"];
    // }
    // echo json_encode($response);
?>