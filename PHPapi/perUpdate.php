
<?php
include "database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);

// 解决前端的问题
$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
$Id=$c['id'];
$perId=$c['perId'];
$perName=$c['perName'];
$gender=$c['gender'];
$age=$c['age'];
$part=$c['part'];
$address=$c['address'];
$contact=$c['contact'];
$perState=$c['perState'];
$sql ="UPDATE `personnel` SET `idPer`='{$perId}',`namePer`='{$perName}',`genderPer`='{$gender}',`agePer`='{$age}',`partPer`='{$part}',`addressPer`='{$address}',`contactPer`='{$contact}',`statePer`='{$perState}' WHERE id={$Id}";
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);
// echo $Id;