
<?php
include "database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);

// 解决前端的问题
$v=(file_get_contents("php://input"));
var_dump(json_decode($v,true));
$c=json_decode($v,true);
 $perId=$c['perId'];
$perName=$c['perName'];
$gender=$c['gender'];
$age=$c['age'];
$part=$c['part'];
$address=$c['address'];
$contact=$c['contact'];
$perState=$c['perState'];
$sql ="INSERT INTO `personnel`(`员工编号`, `姓名`, `性别`, `年龄`, `部门`, `地址`, `联系方式`, `在职状态`) VALUES('{$perId}','{$perName}','{$gender}','{$age}','{$part}','{$address}','{$contact}','{$perState}')";

if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);

echo $age,$address,$contact,$perId,$perName,$perState,$part,$gender;
 //创建一个数组去接收
// while ($row = $result -> fetch_assoc()) {
//     $rows[] = $row;   //$rows中保存personnel表中所有记录
//       }
// encode 对象
// json_encode()
//该函数主要用来将数组和对象，转换为json格式。
// json_decode()
// 该函数用于将json文本转换为相应的PHP数据结构。
// 输出接口
// echo json_encode($rows);
return "1";
 return $perId;
// return json_encode($rows);
