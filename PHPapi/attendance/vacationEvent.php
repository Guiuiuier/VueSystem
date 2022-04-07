<?php

include "../database/config.inc.php";
date_default_timezone_set("PRC");
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
 //关闭错误提示
ini_set('display_errors','off');
$approval=$_GET['approval'];
$reply=$_GET['reply'];
$replyTime=$_GET['replyTime'];
$id=$_GET['id'];
$state="已完成";
$sql="update `vacation` SET `state`='{$state}',`isapproval`='{$approval}',`reply`='{$reply}',`replyTime`='{$replyTime}'  where id={$id}";

// var_dump($sql);
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
// var_dump($mysqli);
$result=$mysqli ->query($sql);

$mysqli->close();    


?>