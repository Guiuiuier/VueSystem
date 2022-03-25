<?php

include "../database/configupload.inc.php";
date_default_timezone_set("PRC");
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
$Id=$c['id'];
$topic=$c['topic'];
$endName=$c['endName'];
$toPerson=$c['toPerson'];
$content=$c['content'];
$sql="UPDATE `pubcontent` SET  `topic`='{$topic}',`content`='{$content}',`endName`='{$endName}',`toPerson`='{$toPerson}' WHERE `id`='{$Id}'";
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);
 //创建一个数组去接收
// var_dump($sql,$result);

$mysqli->close();    


?>