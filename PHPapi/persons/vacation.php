<?php

include "../database/config.inc.php";
date_default_timezone_set("PRC");
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');

//查询当前时间

$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
$idPer=$c['idPer'];
$name=$c['name'];
$vacationType=$c['vacationType'];
$day=$c['day'];
$part=$c['part'];
$contact=$c['contact'];
$startTime=$c['startTime'];
$endTime=$c['endTime'];
$content=$c['content'];
$assessor=$c['assessor'];
$clockTime=$c['currentTime'];
$sql="INSERT  INTO `vacation`(`idPer`,`name`,`vacationType`,`day`,`part`,`contact`,`startTime`,`endTime`,`content`,`assessor`,`clockTime`,`state`) values('{$idPer}','{$name}','{$vacationType}','{$day}','{$part}','{$contact}','{$startTime}','{$endTime}','{$content}','{$assessor}','{$clockTime}','进行中')";
// var_dump($sql);
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行

$result=$mysqli ->query($sql);
// var_dump($result);

$mysqli->close();    


?>