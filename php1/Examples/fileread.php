<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/7
 * Time: 17:39
 */
$path="E:".DIRECTORY_SEPARATOR."My Document".DIRECTORY_SEPARATOR . "PHP42.txt";
$filehandler=fopen($path,"rw") or die("Cannot open the file!");
$contents="";
while(!feof($filehandler)){
    $contents.=fread($filehandler,1024);
}
fclose($filehandler);
echo $contents;
