<?php

/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/5
 * Time: 18:47
 */
class Person{
    private static $name;
    private $age;
    const PROP=0;
    static function say()
    {
        self::$name="Kayla";
        echo Person::$name . " says hello!";
    }
    function __construct($a)
    {
        $this->age=$a;
    }
    function __set($name, $value)
    {
        // TODO: Implement __set() method.
        if($name=="age"){
            if($value>150||$value<0){
                return;
            }
        }
        $this->$name=$value;
    }
    function getPROP(){
        echo self::PROP;
    }
}