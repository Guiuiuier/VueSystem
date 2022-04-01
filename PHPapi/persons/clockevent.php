
<?php
include "../database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
ini_set('display_errors','off');
// $monthsTime=$_GET["monthsTime"];
$monthsTime="2022-4";
$username="123456784";
// $username=$_GET['id'];
$clockType="下班打卡";
$sql ="select  `comattendance`,`lateNumber`,`leaveEarly`,`clockState` from clockin where `clockTime` LIKE '{$monthsTime}%' AND `idPer`={$username} AND `clockType`='{$clockType}' order by id desc limit 2";
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
      }
    //  var_dump($rows);
            // var_dump($rows[0]['comattendance']);
      if($rows[1]['comattendance']==null){
          if($rows[0]['clockState']=="早退"){
              if($rows[1]['leaveEarly']==null){
                $updateAttendance="UPDATE `clockin` SET `comattendance`='1',`leaveEarly`='1' WHERE `idPer`={$username} AND `clockType`='{$clockType}' AND `clockTime` LIKE '{$monthsTime}%' order by id desc limit 1";
                $mysqli -> set_charset(DB_CHARSET);
                // 连接数据库并执行
                $result=$mysqli ->query($updateAttendance);
              }else{
                  $earylyTimes=$rows[1]['leaveEarly'];
                  $updateAttendance="UPDATE `clockin` SET `comattendance`='1',`leaveEarly`={$earylyTimes}+1 WHERE `idPer`={$username} AND `clockType`='{$clockType}' AND `clockTime` LIKE '{$monthsTime}%' order by id desc limit 1";
                  $result=$mysqli ->query($updateAttendance);
              }
          }else{
              $updateAttendance="UPDATE `clockin` SET `comattendance`='1' WHERE `idPer`={$username} AND `clockType`='{$clockType}' AND `clockTime` LIKE '{$monthsTime}%' order by id desc limit 1";
              $mysqli -> set_charset(DB_CHARSET);
              // 连接数据库并执行
              $result=$mysqli ->query($updateAttendance);
          }
        }else{
            $day=$rows[1]['comattendance'];
            if($rows[0]['clockState']=="早退"){
                if($rows[1]['leaveEarly']==null){
                  $updateAttendance="UPDATE `clockin` SET `comattendance`={$day}+1,`leaveEarly`='1' WHERE `idPer`={$username} AND `clockType`='{$clockType}' AND `clockTime` LIKE '{$monthsTime}%' order by id desc limit 1";
                  $mysqli -> set_charset(DB_CHARSET);
                  // 连接数据库并执行
                  $result=$mysqli ->query($updateAttendance);
                }else{
                    $earylyTimes=$rows[1]['leaveEarly'];
                    $updateAttendance="UPDATE `clockin` SET `comattendance`={$day}+1,`leaveEarly`={$earylyTimes}+1 WHERE `idPer`={$username} AND `clockType`='{$clockType}' AND `clockTime` LIKE '{$monthsTime}%' order by id desc limit 1";
                    $result=$mysqli ->query($updateAttendance);
                    echo $updateAttendance;
                }
            }else{
                $updateAttendance="UPDATE `clockin` SET `comattendance`={$day}+1 WHERE `idPer`={$username} AND `clockType`='{$clockType}' AND `clockTime` LIKE '{$monthsTime}%' order by id desc limit 1";
                $mysqli -> set_charset(DB_CHARSET);
                // 连接数据库并执行
                $result=$mysqli ->query($updateAttendance);
            }







            $day=$rows[1]['comattendance'];
               $updateAttendance="UPDATE `clockin` SET `comattendance`={$day}+1 WHERE `idPer`={$username} AND `clockType`='{$clockType}' AND `clockTime` LIKE '{$monthsTime}%' order by id desc limit 1";
               $mysqli -> set_charset(DB_CHARSET);
               // 连接数据库并执行
               $result=$mysqli ->query($updateAttendance);
        }
// encode 对象
// json_encode()
//该函数主要用来将数组和对象，转换为json格式。
// json_decode()
// 该函数用于将json文本转换为相应的PHP数据结构。
// 输出接口
// echo json_encode($rows);
// return json_encode($rows);
$mysqli->close();
?>