<?php
    $hostName = 'us-cdbr-east-02.cleardb.com';
    $dbName = 'heroku_6f8c55e3d238645';
    $userName = 'b0d8b17f3e35b8';
    $pwd =  'ef8c441b';

    $conn = new mysqli($hostName,$userName,$pwd,$dbName);

    if ($conn->connect_error) {
        die('Connection Failed: '.$conn->connect_error);
    }

    if (isset($_POST['todo'])) {
        $todo = htmlspecialchars($_POST['todo']);
        if(empty($todo)){
            echo 'Please Fill Todo';
        }else{
            $sql = "INSERT into task(todo) VALUES(?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s',$todo);
            if ($stmt->execute()) {
                echo 'Todo Saved';
            }else{
                echo "Server Error";
            }
        }
    }
?>