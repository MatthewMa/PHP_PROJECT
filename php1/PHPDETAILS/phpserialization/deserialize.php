<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/29
 * Time: 15:20
 */
require "Person.class.php";
$p=unserialize(file_get_contents("person.txt"));
$p->say();