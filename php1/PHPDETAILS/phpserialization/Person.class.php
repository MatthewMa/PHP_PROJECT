<?php

/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/29
 * Time: 15:17
 */
class Person
{
    var $name;
    var $age;
    var $gender;

    /**
     * Person constructor.
     * @param $name
     * @param $age
     * @param $gender
     */
    public function __construct($name, $age, $gender)
    {
        $this->name = $name;
        $this->age = $age;
        $this->gender = $gender;
    }

    function say(){
        echo "Hi,my name is $this->name<br/>I am $this->age years old and I am $this->gender";
    }


}