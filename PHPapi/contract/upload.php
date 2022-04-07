<?php
include "../database/configupload.inc.php";

    date_default_timezone_set("PRC");
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST');
  
    //二进制文件
    $uploadTime=$_POST['currentTime'];
    $file=$_FILES['File'];
    var_dump($_FILES);
    $part=$_POST['part'];
    $username=$_POST['username'];
    $fileContent=$_POST['fileContent'];
    // 文件信息
    $file_name=$_FILES['File']['name'];
    $file_type=$_FILES['File']['type'];
    $file_location="../File/";
    //这里不做保存分类了。直接放一起。
     //文件路径
    $file_path="$file_location$file_name";
     //如果有这个文件改名 并上传
    if(file_exists($file_path)){
           $file_name="(".rand(0,1000).")".$file_name;
          $file_path="$file_location$file_name";
    }
    move_uploaded_file($_FILES['File']['tmp_name'],$file_path);
    //上传的存储地址
    $src=$file_location.$file_name;

    $mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
    $mysqli -> set_charset(DB_CHARSET);
       if ($mysqli -> connect_error) {
    
            die("连接错误：".$mysqli -> connect_error);
    
       }

       $uploadSql="INSERT INTO `uploadfile`(`user`, `partment`, `fileName`, `uploadTime`, `tip`, `src`) VALUES ('{$username}','{$part}','{$file_name}','{$uploadTime}','{$fileContent}','{$src}')";
       $result = $mysqli -> query($uploadSql);
        // var_dump($result);
      // }else{
      //   echo "上传失败!";
      // };
      $mysqli->close();    
  ?>