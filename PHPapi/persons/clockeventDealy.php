
<?php
include "../database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$v=(file_get_contents("php://input"));
$c=json_decode($v,true);
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
ini_set('display_errors','off');
$monthsTime=$c['monthsTime'];
$userid=$c['id'];
$username=$c['name'];
$currentTime=$c['currentTime'];
$clockStateDelay=$c['clockStateDelay'];
$clockType=$c['clockType'];

// $username=$_GET['id'];
// $clockType="上班打卡";
// $clockState="迟到";
$sql ="select  `comattendance`,`lateNumber`,`leaveEarly`,`clockState` from clockin where `clockTime` LIKE '{$monthsTime}%' AND `idPer`={$userid} AND `clockState`='{$clockStateDelay}' order by id desc limit 1";
var_dump($sql);
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
     var_dump($rows);
     if($rows[0]['lateNumber']==null){
         $insertDelay="INSERT INTO `clockIn`(`idPer`,`namePer`,`clockTime`,`clockState`,`clockType`,`lateNumber`) values ('{$userid}','{$username}','{$currentTime}','{$clockStateDelay}','{$clockType}',1)";
           $mysqli -> set_charset(DB_CHARSET);
                // 连接数据库并执行
                $result=$mysqli ->query($insertDelay);
        }else{
            $late=$rows[0]['lateNumber'];
            $insertDelay="INSERT INTO `clockIn`(`idPer`,`namePer`,`clockTime`,`clockState`,`clockType`,`lateNumber`) values ('{$userid}','{$username}','{$currentTime}','{$clockStateDelay}','{$clockType}',{$late}+1)";
            $mysqli -> set_charset(DB_CHARSET);
            // 连接数据库并执行
            $result=$mysqli ->query($insertDelay);
            echo $insertDelay;
        }

$mysqli->close();
?>