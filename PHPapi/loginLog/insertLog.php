
<?php
//  登陆的时候查询数据库有没有这个用户名上一次登录的信息的
include "../database/configLoginLog.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);

$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
// 取最近的一条 这个id信息
// var_dump($c);
$user=$c['user'];
$lastIp=$c['lastIp'];
$lastTime=$c['lastTime'];
$thisIp=$c['thisIp'];
$thisTime=$c['thisTime'];

$sql ="INSERT INTO `users`( `user`, `lastIp`, `lastTime`, `thisIp`, `thisTime`) VALUES ('{$user}','{$lastIp}','{$lastTime}','{$thisIp}','{$thisTime}')";
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);

// var_dump($result);
 //创建一个数组去接收
while ($row = $result -> fetch_assoc()) {
    $rows[] = $row;   //$rows中保存personnel表中所有记录
      }

echo json_encode($rows);

$mysqli->close();    
?>