<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>FormPhp</title>
</head>
<body>
    <form action="#" method="post">
        <input type="text" name="txt"/><br/>
        <input type="submit" name="submit" value="submit">
    </form>
    <?php
        if(isset($_POST["submit"])){
            $txt=$_POST["txt"];
            echo encode($txt);
        }
        function encode($str){
            return htmlentities(stripslashes($str));
        }
    ?>
</body>
</html>