<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/13
 * Time: 11:40
 */
$path="img/android.png";
$filename=substr($path,strrpos($path,"/")+1);
header("Content-Type:image/png");
header("Content-Disposition:attachment;filename=".$filename);
header("Content-Length:".filesize($path));
readfile($path);
