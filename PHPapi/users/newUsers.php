
<?php
include "../database/configlogin.inc.php";
// header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
// 解决前端的问题
$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
 $roleid=$c['idPer'];
$part=$c['part'];
$role=$c['role'];
$userName=$c['username'];
$userPass=$c['userpass'];
$email=$c['email'];
function f3($roleid)
{
       $result = array();
       preg_match_all("/(?:\()(.*)(?:\))/i",$roleid, $result);
       return $result[1][0];
};
$userId=f3($roleid);
if ($mysqli -> connect_error) {
       die("连接错误：".$mysqli -> connect_error);
}
if($role=='员工'){
       $rolepermit='2';
}else{
       $rolepermit='1';
};
$sql ="INSERT INTO `userlists`(`idPer`, `username`, `userpass`,`part`,`role`,`roleid`,`rolePermission`,`number`) VALUES('{$userId}','{$userName}','{$userPass}','{$part}','{$role}','{$roleid}','{$rolepermit}','{$email}')";
// 转换字符集
$mysqli -> set_charset(DB_CHARSET);
// 连接数据库并执行
$result=$mysqli ->query($sql);
// var_dump($result);
// var_dump($sql);
$mysqli->close();