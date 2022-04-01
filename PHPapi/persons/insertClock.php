
<?php
include "../database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$v=(file_get_contents("php://input"));
$c=json_decode($v,true);
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
// ini_set('display_errors','off');

$clockType="下班打卡";
$username=$c['name'];
$monthsTime=$c['monthsTime'];
$clockState="正常";
$userid=$c['id'];
$currentTime=$c['currentTime'];
$sql ="select  `comattendance`,`lateNumber`,`leaveEarly`,`clockState` from clockin where `clockTime` LIKE '{$monthsTime}%' AND `idPer`={$userid} AND comattendance!='' order by id desc limit 1";
// var_dump($sql);
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
};
var_dump($rows);
if($rows[0]['comattendance']==null){
    $comattendance="1";
}else{
   $comattendance=$rows[0]['comattendance'];
   $comattendance=$comattendance+1;
};
if($rows[0]['lateNumber']==null){
    $lateNumber="null";
}else{
$lateNumber=$rows[0]['lateNumber'];
$lateNumber=$lateNumber+1;
};
if($rows[0]['leaveEarly']==null){
    $leaveEarly="null";
}else{
$leaveEarly=$rows['0']['leaveEarly'];
$leaveEarly=$leaveEarly+1;
};
      $insert="INSERT INTO `clockIn`(`idPer`,`namePer`,`clockTime`,`clockState`,`clockType`,`lateNumber`,`leaveEarly`,`comattendance`) values ('{$userid}','{$username}','{$currentTime}','{$clockState}','{$clockType}',{$lateNumber},{$leaveEarly},{$comattendance})";
           $mysqli -> set_charset(DB_CHARSET);
       // 连接数据库并执行
         $result=$mysqli ->query($insert);
         var_dump($insert);
$mysqli->close();
?>