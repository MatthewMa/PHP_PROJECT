<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/26
 * Time: 21:53
 */
$company=array(
    "name"=>3,
    "investment"=>32290,
    "boss"=>6
);
function filter($val){
    if($val%2==0){
        return true;
    }
}
print_r(array_filter($company,"filter"));

$arr=array(
    "Name"=>"Matthew",
    "Age"=>27,
    "Gender"=>"Male",
    "Married"=>false,
    "Vegitarian"=>false
);
$result=array_unique($arr);
echo "<pre>";
print_r($result);
echo "</pre>";

