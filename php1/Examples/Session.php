<?php
/**
 * Output wage table
 */
$arr=array(
    "Market"=>array(
        array(1,"Joe","Manager",5000),
        array(2,"Mike","Associate Manager",4000),
        array(3,"Kayla","Staff",3500),
        array(4,"Obama","Stuff",3200)
    ),
    "Product"=>array(
        array(1,"Kong","Manager",5000),
        array(2,"Matthew","Associate Manager",4000),
        array(3,"Layla","Staff",3500),
        array(4,"Lily","Stuff",3200)
    ),
    "Finance"=>array(
        array(1,"Lala","Manager",5000),
        array(2,"Mary","Associate Manager",4000),
        array(3,"Tom","Staff",3500),
        array(4,"Tonny","Stuff",3200)
    ),
);
foreach ($arr as $key=>$value){
    echo "<table border='1' width='600' align='center'>";
    echo "<caption><h1>{$key} October Salary</h1></caption>";
    echo "<tr bgcolor='#696969'><th>Number</th><th>Name</th><th>Position</th><th>Salary</th></tr>";
    foreach ($value as $v){
        echo "<tr>";
        foreach ($v as $item){
            echo "<td>";
            echo "$item";
            echo "</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}





