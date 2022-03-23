
<?php
include "../database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
// ini_set('display_errors','off');
$Id=$_GET['id'];
$sql ="DELETE FROM `vacation` WHERE id in ({$Id})";
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
};
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);

$mysqli->close();
?>