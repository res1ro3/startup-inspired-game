<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $user = json_decode( file_get_contents('php://input') );
    $sql = "SELECT * FROM users WHERE email = :em AND is_active = 1";
    $query = $conn->prepare($sql);
    $query->bindParam(':em', $user->email);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);

    if ($response) {
        $sql = "UPDATE users SET is_active = 0 WHERE email = :em";
        $query = $conn->prepare($sql);
        $query->bindParam(':em', $user->email);
        $query->execute();
        $response = $query->fetch(PDO::FETCH_ASSOC);
        echo "Signed Out.";
    } else {
        echo "Failed";
    }
?>