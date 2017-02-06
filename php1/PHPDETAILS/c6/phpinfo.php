<?php
/**
 * Created by PhpStorm.
 * User: Sihua
 * Date: 2016/11/26
 * Time: 15:06
 */
function makeTable(){
    $arr=array(
        array(2001,"Matthew",27,"Male"),
        array(2002,"Zoe",26,"Female"),
        array(2003,"Kayla",24,"Female"),
        array(2004,"Yu",25,"Male")
    );
    $table="<table border='1px solid blue' width='600px' align='center'style='text-align: center' id='stu_table'><thead><tr style='background-color: #0f97ed'><th>Stu_num</th><th>Name</th><th>Age</th><th>Gender</th></tr></thead>";
    for ($i=0;$i<count($arr);$i++){
        $table.="<tbody><tr>";
        for ($j=0;$j<count($arr[$i]);$j++){
            $table.="<td>{$arr[$i][$j]}</td>";
        }
        $table.="</tr>";
    }
    $table.="</tbody></table>";
    echo $table;
}
makeTable();
echo "<style type='text/css'>
    #stu_table tbody:nth-child(even){
        background-color: #0f97ed;
    }
    #stu_table tbody>tr:hover{
        background-color: #00CC66;
    }
    
</style>";


