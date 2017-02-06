<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/29
 * Time: 15:18
 */
require "Person.class.php";
$p=new Person("Matthew",27,"M");
$str=serialize($p);
file_put_contents("person.txt",$str);