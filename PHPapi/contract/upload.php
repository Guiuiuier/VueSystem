<?php
include "../database/configupload.inc.php";

    date_default_timezone_set("PRC");
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST');
  
    //二进制文件
    $uploadTime=$_POST['currentTime'];
    // var_dump($uploadTime);
    $file=$_FILES['File'];
    // var_dump($_FILES);
    //部门
    $part=$_POST['part'];
    //文件用途名
    $fileContent=$_POST['fileContent'];
    // var_dump($part);
    // 文件信息
    $file_name=$_FILES['File']['name'];
    // var_dump($file_name);
    $file_type=$_FILES['File']['type'];
    // var_dump($file_type);
    $file_location="../File/";
    //这里不做保存分类了。直接放一起。
    // if($_FILES['File']['error']==0){
    move_uploaded_file($_FILES['File']['tmp_name'],$file_location.$_FILES["File"]["name"]);

    //上传的存储地址
    $src=$file_location.$file_name;
  // var_dump($src);

    $mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
    $mysqli -> set_charset(DB_CHARSET);
       if ($mysqli -> connect_error) {
    
            die("连接错误：".$mysqli -> connect_error);
    
       }

       $uploadSql="INSERT INTO `uploadfile`(`user`, `partment`, `fileName`, `uploadTime`, `tip`, `src`) VALUES ('admin','{$part}','{$file_name}','{$uploadTime}','{$fileContent}','{$src}')";
       $result = $mysqli -> query($uploadSql);
        var_dump($result);
      // }else{
      //   echo "上传失败!";
      // };

  ?>