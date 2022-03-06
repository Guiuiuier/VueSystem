<?php
include "../database/configLoginLog.inc.php";

    date_default_timezone_set("PRC");
    $v=(file_get_contents("php://input"));
    // var_dump(json_decode($v,true));
    var_dump($v);
    // $c=json_decode($v,true);
    //作者
    var_dump($_FILES);

  // $content=$_POST['name'];
  // 上传文件名字
  // $zp_sp_name=$_FILES['uploadfile']['name'];
  // // 上传保存的路径
  // // var_dump($zp_sp_name);
  // $zp_sp_type=$_FILES['uploadfile']['type'];
       
  ?>