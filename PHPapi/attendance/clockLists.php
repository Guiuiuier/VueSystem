<?php

include "../database/config.inc.php";
date_default_timezone_set("PRC");
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');


$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
$idPer=$c['idPer'];
$clockState=$c['clockState'];
$sql="SELECT  * FROM `clockin` WHERE `idPer`='{$idPer}' AND `clockState`='{$clockState}'";
// var_dump($sql);
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
// var_dump($mysqli);
$result=$mysqli ->query($sql);
// var_dump($result);
 //创建一个数组去接收
 while ($row = $result -> fetch_assoc()) {
  if($row!=null){
       $rows[] = $row;   //$rows中保存personnel表中所有记录
  }
};
//   var_dump($rows);
 if($rows==null){
return false; 
}else{
         echo json_encode($rows);
 }

$mysqli->close();    


?>