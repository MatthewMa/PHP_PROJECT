<?php
/**
 * Created by PhpStorm.
 * Traver dir
 * User: Sihua
 * Date: 2016/11/4
 * Time: 22:17
 */

$num=0;
$path="G:".DIRECTORY_SEPARATOR."PHP".DIRECTORY_SEPARATOR."PHPSOFT".DIRECTORY_SEPARATOR."php7.0";
$file_handler=opendir($path);
echo "<table width='600px' border='0' cellspacing='0' cellpadding='0' align='center'>";
echo "<caption><h1>File Info</h1></caption>";
echo "<tr bgcolor='aqua'><th>File Name</th><th>File Size</th><th>File Type</th><th>Modifyied Time</th></tr>";
while($file=readdir($file_handler)){
    $dir_file=$path.DIRECTORY_SEPARATOR .$file;
    $bgcolor=$num++%2==0?"#FFFFFF":"#00FFFF";
    echo "<tr bgcolor=$bgcolor><td>".$file."</td>";
    echo "<td>".filesize($dir_file)."</td>";
    echo "<td>".filetype($dir_file)."</td>";
    echo "<td>".date("Y/n/t",filemtime($dir_file))."</td>";
    echo "</tr>";
}
echo "</table>";
closedir($file_handler);
echo "<strong>".$path."</strong> Directory has ". $num."Files!";


