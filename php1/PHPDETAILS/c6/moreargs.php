<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/26
 * Time: 19:28
 */
function moreArgs(){
    $args=func_get_args();
    for ($i=0;$i<func_num_args();$i++){
        echo "$args[$i]<br/>";
    }
}

moreArgs(3,5,"Matthew","Zoe");