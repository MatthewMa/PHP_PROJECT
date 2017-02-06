<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/26
 * Time: 19:57
 */
function change($funcname){
    for ($i=0;$i<5;$i++){
        echo $funcname($i)."<br/>";
    }
}

function one($i,$j=2){
    return $i+$j;
}

function two($i,$j=2){
    return pow($i,2)+pow($j,2);
}

change("one");
echo "<br/>";
change("two");