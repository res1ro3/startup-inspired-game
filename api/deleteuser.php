<?php
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $user = json_decode( file_get_contents('php://input') );
            
    $sql = "DELETE FROM users WHERE users.user_id = :id";
    $query = $conn->prepare($sql);
    $query->bindParam(':id', $user->user_id);

    if($query->execute()) {
        $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to delete record.'];
    }
    echo json_encode($response);
    
?>