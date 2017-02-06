<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/29
 * Time: 12:07
 */
$index=array("name","age","number","gender");
$value=array("Matthew",27,10056,"Male");
$arr=array_combine($index,$value);
print_r($arr);
echo $index[array_rand($index,1)];
