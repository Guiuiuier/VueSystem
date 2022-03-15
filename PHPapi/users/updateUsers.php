<?php
include "../database/configlogin.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
$v=(file_get_contents("php://input"));
var_dump(json_decode($v,true));
$c=json_decode($v,true);
$name=$c['perName'];
$part=$c['part'];
$role=$c['role'];
$id=$c['perId'];
// var_dump($token,$username,$password);
$sql ="UPDATE `userlists` SET `idPer`='{$id}',`name`='{$name}',`part`='{$part}',`role`='{$role}' WHERE `idPer`='{$id}'";
var_dump($sql);
if ($mysqli -> connect_error) {
    die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);
var_dump($result);
 $mysqli->close();  
?>