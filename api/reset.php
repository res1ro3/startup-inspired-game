<?php
    include "./dbconnect.php";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');

    $submitted = json_decode(file_get_contents('php://input'));

    if (isset($submitted->type)) {
        $type = $submitted->type;

        switch ($type) {
            case 'answers':
                $sql = "UPDATE `wordbank` SET `is_answered` = '0'";
                $query = $conn->prepare($sql);
                $query->execute();
                echo "Answer reset successful";
                break;

            case 'responses':
                $sql = "DELETE FROM `responses`";
                $query = $conn->prepare($sql);
                $query->execute();

                // Reset auto-increment index to 1
                $sql = "ALTER TABLE `responses` AUTO_INCREMENT = 1";
                $query = $conn->prepare($sql);
                $query->execute();
                
                echo "Responses reset successful";
                break;

            default:
                echo "An Error Occurred";
                break;
        }
    } else {
        echo "Type not provided";
    }
?>