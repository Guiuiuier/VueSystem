
<?php
include "../database/configupload.inc.php";
header("Content-type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');

$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
$mysqli -> set_charset(DB_CHARSET);
   if ($mysqli -> connect_error) {

        die("连接错误：".$mysqli -> connect_error);

   }
$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
$c=json_decode($v,true);
   //如果他不是空的则运行这条sql
    if(!empty($_FILES)){
       $file=$_FILES['File'];
    //二进制文件
    $uploadTime=$_POST['currentTime'];
//     var_dump($_FILES);
    //部门
    $part=$_POST['part'];
    //文件用途名
    $id=$_POST['id'];
    $username=$_POST['username'];
    $fileContent=$_POST['fileContent'];
    // var_dump($part);
    // 文件信息
    $file_name=$_FILES['File']['name'];
    // var_dump($file_name);
    $file_type=$_FILES['File']['type'];
    // var_dump($file_type);
    $file_location="../File/";
    //这里不做保存分类了。直接放一起。
     //文件路径
    $file_path="$file_location$file_name";



     //如果有这个文件删除掉之前的 如果有重复改名 并上传
     //获取到地址删除掉
$sql="select `src` from `uploadfile` where id={$id}";
$result = $mysqli -> query($sql);
// var_dump($sql,$result);
while ($row = $result -> fetch_assoc()) {
       $rows[] = $row;
         };
         //保存的路径
         $download_path = "../File/";
       //   上一个文件的名字路径
         $lastFile_name=$rows[0]['src'];
         //完整路径
         $lastFile_path=$download_path.$lastFile_name;
       //   var_dump($lastFile_path);
         if (!unlink($lastFile_path)){
              }else
              {

              }


    if(file_exists($file_path)){
          $file_name="(".rand(0,1000).")".$file_name;
          $file_path="$file_location$file_name";
    };
    // if($_FILES['File']['error']==0){
    move_uploaded_file($_FILES['File']['tmp_name'],$file_path);

    //上传的存储地址
      $src=$file_location.$file_name;
  // var_dump($src);
       $uploadSql=" UPDATE `uploadfile` SET `user`='{$username}',`partment`='{$part}',`fileName`='{$file_name}',`uploadTime`='{$uploadTime}', `tip`='{$fileContent}',`src`='{$src}' WHERE id={$id} ";
       $result = $mysqli -> query($uploadSql);
       //  var_dump($result,$uploadSql);
    }else{
       $id=$c['id'];
       $part=$c['part'];
       $fileContent=$c['tips'];
       $username=$c['username'];
       $uploadTime=$c['currentTime'];
       $uploadSql=" UPDATE `uploadfile` SET `user`='{$username}',`partment`='{$part}',`uploadTime`='{$uploadTime}', `tip`='{$fileContent}' WHERE id={$id} ";
       $result = $mysqli -> query($uploadSql);
       // var_dump($uploadSql);
}

      $mysqli->close();    