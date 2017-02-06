<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/26
 * Time: 20:05
 */
class Person{
    static function hello($str){
        echo $str;
    }
}

class Children extends Person{
    function sayHi($str){
        echo $str;
    }
}

call_user_func_array(array("Person","hello"),array("Android"));
echo "<br/>";
call_user_func_array(array(new Children(),"sayHi"),array("Android"));