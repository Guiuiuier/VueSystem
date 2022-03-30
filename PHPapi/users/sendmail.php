<?php
$v=(file_get_contents("php://input"));
// var_dump(json_decode($v,true));
ini_set('display_errors','off');
session_start();
$c=json_decode($v,true);
//发送的绑定的邮箱，
$contactmail=$c['contact'];
//用户登录后用来辨别的邮箱 因为两个功能放在一起了，其实上下是两个变量内容是一样的，只是为了防止参数导致登录的时候会发送邮件
//应该在点击发送验证码的时候才登录邮件。
$mail=$c['mail'];
$usercode=$c['code'];
// 引入PHPMailer的核心文件
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';
function destroy($str)
{
$result = array();
preg_match_all("/(?:\()(.*)(?:\))/i",$str, $result);
return $result[1][0];
};
if(($usercode)){
if($_SESSION[`$mail`]){
$allStr=$_SESSION[`$mail`];
$destroyTime=destroy($allStr);
if($destroyTime<time()){
    unset($_SESSION[`$mail`]);
    echo "验证码已经过期";
}else{
   $code = preg_replace( '/\((.*)\)/', '',$allStr);
    if($usercode===$code){
        echo "验证码正确";
    }
}
}else{
    echo "请重新获取验证码";
}
};


if(isset($contactmail)){
$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //服务器配置
    $mail->CharSet ="UTF-8";                     //设定邮件编码
    $mail->SMTPDebug = 0;                        // 调试模式输出
    $mail->isSMTP();                             // 使用SMTP
    $mail->Host = 'smtp.qq.com';                // SMTP服务器
    $mail->SMTPAuth = true;                      // 允许 SMTP 认证
    $mail->Username = '1500081564@qq.com';                // SMTP 用户名  即邮箱的用户名
    $mail->Password = 'zalcrdnwnhrchhdd';             // SMTP 密码  部分邮箱是授权码(例如163邮箱)
    $mail->SMTPSecure = 'ssl';                    // 允许 TLS 或者ssl协议
    $mail->Port = 465;                            // 服务器端口 25 或者465 具体要看邮箱服务器支持

    $mail->setFrom('1500081564@qq.com','人力资源管理系统' );  //发件人
    $mail->addAddress($contactmail, 'Joe');  // 收件人
    //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
    $mail->addReplyTo('1500081564@qq.com', 'info'); //回复的时候回复给哪个邮箱 建议和发件人一致
    //$mail->addCC('cc@example.com');                    //抄送
    //$mail->addBCC('bcc@example.com');                    //密送

    //发送附件
    // $mail->addAttachment('../xy.zip');         // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名

    //Content
    $code=rand(10000,99999);
    $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
    $mail->Subject = '重要!如果不是您的操作，请不要理会！';
    $mail->Body    = '<h1>您好，您的验证码是:</h1><br/>'.'<h1>'.$code.'</h1>'.'<h2>（1分钟内有效，请不要告诉任何人！）</h2> <br/>' . '<h3>发送时间</h3>'.date('Y-m-d H:i:s');
    $mail->AltBody = '如果邮件客户端不支持HTML则显示此内容';

    $mail->send();
    $time=time()+60;
    $_SESSION[`$contactmail`]='('.$time.')'.$code;
} catch (Exception $e) {
    // echo '邮件发送失败: ', $mail->ErrorInfo;
}
}
