<?php
    session_start();
    include "./dbconnect.php";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    if (isset($_SESSION['token']) === true) {
        session_destroy();
        echo "Signed Out";
    } else {
        echo "Failed";
    }
?>