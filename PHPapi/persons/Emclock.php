
<?php
include "../database/config.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
ini_set('display_errors','off');
$clockTime=$_GET["thisMonth"];
$username=$_GET['id'];
$sql ="select `leaveEarly`,`comattendance` from clockin where `clockTime` LIKE '{$clockTime}%' AND `idPer`={$username} order by id desc limit 1";
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
      $sql1="select * from clockin WHERE  `clockTime` LIKE '{$clockTime}%' AND `idPer`={$username} AND `clockState`='迟到' order by id desc limit 1";
    //  echo $sql1;
      $mysqli -> set_charset(DB_CHARSET);
      $result1=$mysqli ->query($sql1);
      while ($row = $result1 -> fetch_assoc()) {
        $rowsLateNumber[] = $row;   //$rows中保存personnel表中所有记录
          };
      // echo "1";
    //  var_dump($rowsLateNumber);
$rows['lateNumber']=$rowsLateNumber[0]['lateNumber'];
echo json_encode($rows);


// return json_encode($rows);
$mysqli->close();
?>