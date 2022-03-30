<?php

header("Content-type:text/html; charset=UTF-8");
session_start();


// ini_set('session.gc_maxlifetime', 3600); //设置时间 
// ini_get('session.gc_maxlifetime');//得到ini中设定值 
// $_SESSION['views']=12312312;
// $_SESSION['time'] = time() + 5;
//  unset($_SESSION['views']);
// $time=time();

$str=$_SESSION['825126416@qq.com'];
echo $str;
// // echo $qwe;
// echo f3($str); //返回你好
// function f3($str)
// {
// $result = array();
// // preg_match_all("/(?:\()(.*)(?:\))/i",$str, $result);
// preg_replace('/\(.*?\)/', '', $str);
// // return $result[1][0];
// return $str;
// }

// $str = '(123123123)123131';
// $str2 = preg_replace( '/\((.*)\)/', '',$str);
// echo $str2;

// $id=123;
//  if(isset($_SESSION[`$id`])){
//     //  $_SESSION['time'] = time() + 5;
//     //  if($_SESSION[])
//     //   echo "1";
//     if($_SESSION['time']<time()){
//          unset($_SESSION[`$id`]);
//     }
//  }else{
//          $_SESSION[`$id`]=1232;
//          $_SESSION['time'] = time() + 5;
            
//      }

?>

<?php
// $id=123;
// echo "Pageviews=". $_SESSION[`$id`];
// echo "time=".$_SESSION['time'].'</br>';
// echo time();