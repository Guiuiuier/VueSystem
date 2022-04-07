
<?php
include "../database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
ini_set('display_errors','off');
$assessor=$_GET['assessor'];
// $assessor="(123456784)前端最帅管理员";

$sql ="select * from vacation WHERE `assessor`='{$assessor}' order by id desc ";

if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
};
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);


 //创建一个数组去接收
while ($row = $result -> fetch_assoc()) {

    $rows[] = $row;   //$rows中保存personnel表中所有记录
      }
// encode 对象
// json_encode()
//该函数主要用来将数组和对象，转换为json格式。
// json_decode()
// 该函数用于将json文本转换为相应的PHP数据结构。
// 输出接口
// echo json_decode($rows);
// var_dump($rows);
echo json_encode($rows);
// return json_encode($rows);
$mysqli->close();
?>