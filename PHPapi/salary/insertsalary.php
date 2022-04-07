<?php
include "../database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
ini_set('display_errors','off');
$roleid=$_GET['roleid'];
$position=$_GET['position'];
$basicsalary=$_GET['basicsalary'];
$allowance=$_GET['allowance'];
$chidao=$_GET['chidao'];
$zaotui=$_GET['zaotui'];
$geshui=$_GET['geshui'];
$chuqinday=$_GET['chuqinday'];
$salaryMonth=$_GET['salaryMonth'];
$salaryTime=$_GET['salaryTime'];
$totalMoney=$_GET['totalMoney'];
$part=$_GET['part'];
$sql ="insert into `salaryinfo`(`roleid`,`position`,`basicsalary`,`allowance`,`chidao`,`zaotui`,`geshui`,`chuqinday`,`salaryMonth`,`salaryTime`,`totalMoney`,`part`) VALUES('{$roleid}','{$position}','{$basicsalary}','{$allowance}','{$chidao}','{$zaotui}','{$geshui}','{$chuqinday}','{$salaryMonth}','{$salaryTime}','{$totalMoney}','{$part}')";
echo $sql;
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);

  
 $mysqli->close();  
?>