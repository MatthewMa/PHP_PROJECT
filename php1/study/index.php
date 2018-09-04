<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
    <script src="js/jquery-3.2.0.min.js"></script>
    <script src="js/bootstrap.js"></script>
</head>
<body>
    <?php
        //ini_set("error_reporting","E_ALL");
        mysqli_connect("localhost","root","root","lessonsbasket","3306","") or die("Could not connect with database");
        $str="Hello,world";
        if(preg_match('/is/',$str)){
            echo 'Match found!';
        }else{
            echo 'No match found!';
        }

    ?>
</body>
</html>