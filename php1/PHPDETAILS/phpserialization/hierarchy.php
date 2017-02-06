<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/29
 * Time: 15:35
 */
abstract class Person{
    protected $name;
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

    abstract function sayHi();
    function run(){
        echo "$this->name is running!";
    }
}

class Student extends Person{


    function sayHi()
    {
        // TODO: Implement sayHi() method.
        echo "My name is:$this->name<br>I am $this->age years old and I am $this->gender";
    }
}

$p=new Student("Matthew",27,"M");
$p->sayHi();