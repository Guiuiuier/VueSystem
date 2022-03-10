<?php
include "../database/configlogin.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
$username=$c['username'];
$password=$c['password'];
$sql ="select * from userlists where username='{$username}' AND userpass='{$password}'";
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);
 //创建一个数组去接收数据库里的信息和token
 while ($row = $result -> fetch_assoc()) {
    $rows[] = $row;
      }

echo json_encode($rows);

//如果token是空的则写入token
$isToken=$rows[0]['token'];
// var_dump($isToken);
// 如果存在这个token 就是没过期 则不创建token 否则创建token
if($isToken==''){
     $v = 1;
$key = mt_rand();
$hash = md5($key . $v . mt_rand() . time());
$token = str_replace('=', '', base64_encode($hash));
// echo $token;
$insertToken="UPDATE `userlists` SET `token`='{$token}' where `username`='admin' AND `userpass`='admin'";
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($insertToken);
// var_dump($mysqli);
}
  
 $mysqli->close();  
?>