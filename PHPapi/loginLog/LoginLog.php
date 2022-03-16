
<?php
//  登陆日志板块查询表信息的
include "../database/configLoginLog.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
$sql ="select *  from users order by id desc";

if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);


 //创建一个数组去接收
while ($row = $result -> fetch_assoc()) {
    $rows[] = $row;   //$rows中保存personnel表中所有记录
      }

echo json_encode($rows);

$mysqli->close();    
?>