
<?php
include "../database/config.inc.php";
// header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
// 解决前端的问题
$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
$sqlid="select `idPer` from `personnel` ORDER BY `id` desc limit 1";

if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sqlid);
var_dump($result,$sqlid);
while ($row = $result -> fetch_assoc()) {
       $rows[] = $row;   //$rows中保存personnel表中所有记录
         }
 //  $perId=$c['perId'];
$userId=($rows[0]['idPer']+1);
$perName=$c['perName'];
$roleId="(".$userId.")".$perName;
$gender=$c['gender'];
$age=$c['age'];
$part=$c['part'];
$address=$c['address'];
$contact=$c['contact'];
$perState=$c['perState'];
$hireTime=$c['hireTime'];
$position=$c['position'];
$sql ="INSERT INTO `personnel`(`idPer`,`roleid`, `namePer`, `genderPer`, `agePer`, `partPer`, `addressPer`, `contactPer`, `statePer`,`position`,`hireTime`) VALUES('{$userId}','{$roleId}','{$perName}','{$gender}','{$age}','{$part}','{$address}','{$contact}','{$perState}','{$position}','{$hireTime}')";
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$results=$mysqli ->query($sql);
var_dump($results,$userId,$sql);
// echo $age,$address,$contact,$perId,$perName,$perState,$part,$gender;

$mysqli->close();