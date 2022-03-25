<?php
include "../database/configupload.inc.php";

    date_default_timezone_set("PRC");
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST');


    $v=(file_get_contents("php://input"));
    // var_dump(json_decode($v,true));
    $c=json_decode($v,true);
    $id=$c['id'];
    // var_dump($file_name,$id);
    $mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
    $sql ="DELETE FROM `uploadfile` WHERE id in ({$id})";
    
    if ($mysqli -> connect_error) {
           die("连接错误：".$mysqli -> connect_error);
    }
    // 转换字符集
    $mysqli -> set_charset(DB_CHARSET);
    // 连接数据库并执行
    $result=$mysqli ->query($sql);
     
    //删除掉数据库的文件后再删除本地存的文件
    //保存的文件都在这里
    $download_path = "../File/";
    //文件名
    $file_name=$c['fileName'];
    // var_dump($file_name);
    //路径
    $file=$download_path.$file_name;  //双引号可以不用.
    // var_dump($file);
    if (!unlink($file)){
           echo ("删除失败请检查文件是否存在？ $file");
       }else
       {
              echo ("删除成功 $file");
       }
       $mysqli->close();    
  ?>