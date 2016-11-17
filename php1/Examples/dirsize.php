<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/6
 * Time: 16:08
 */
function dirSize($dir){
    $file_handler=opendir($dir);
    $filesize=0;
    while($file=@readdir($file_handler)){
        if($file!="."&&$file!="..") {
            $file_dir = $dir . DIRECTORY_SEPARATOR . $file;
            if (is_file($file_dir)) {
                $filesize += filesize($file_dir);
            } else if (is_dir($file_dir)) {
                dirSize($file_dir);
            }
        }
    }
    return $filesize;
}
$path="G:".DIRECTORY_SEPARATOR."PHP".DIRECTORY_SEPARATOR."PHPSOFT".DIRECTORY_SEPARATOR."php7.0";
echo "$path has size of ".round(dirSize($path)/pow(1024,1),2)."KB";