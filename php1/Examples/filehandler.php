<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/12
 * Time: 0:11
 */
$allowtypes=array("jpg","gif","png");
$size=1000000;
$path="./uploads";
if($_FILES['file']['error']>0) {
    echo "Upload failed:error info<br>";
    switch ($_FILES['file']['error']) {
        case 1:
            die("Upload file exceeds the size of PHP confirguration");
        case 2:
            die("Upload file exceeds the size of form size");
        case 3:
            die("File partially uploaded");
        case 4:
            die("You have not uploaded any file");
        default:
            die("Unknown error!");
    }
}
$orgfilename=$_FILES["file"]['name'];
$ext=array_pop(explode('.',$orgfilename));
if(!in_array($ext,$allowtypes)){
    die("You cannot upload such extension files!");
}
$filesize=$_FILES['file']['size'];
if($filesize>$size){
    die("The size is larger,please upload file within "+$size/(1024*1024)+" MB");
}
$filename=date("YmdHis").rand(100,900).".".$ext;
if(is_uploaded_file($_FILES['file']['tmp_name'])){
    if(!move_uploaded_file($_FILES['file']['tmp_name'],$path.DIRECTORY_SEPARATOR.$filename)){
        die("Cannot move file to specified directory!");
    }else{
        $result="File has been uploaded successfully!";
        echo $result;
    }
}else{
    die("File uploaded failed!");
}




