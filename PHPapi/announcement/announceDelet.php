<?php

include "../database/configupload.inc.php";
date_default_timezone_set("PRC");
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
$Id=$_GET['id'];
$sql="DELETE  FROM `pubcontent` where `id`={$Id}";
// var_dump($sql);
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);
 //创建一个数组去接收
$mysqli->close();
?>