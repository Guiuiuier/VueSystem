<?php
// $str="你好dd<我>(爱)[北京]{天安门}";
// // $str="(12312312312321)你好123123123<我>(爱)[北京]{天安门}";
// echo f1($str); //返回你好
// // echo f2($str); //返回我
// echo f33($str);
// // echo f3($str); //返回爱
// // echo f4($str); //返回北京
// // echo f5($str); //返回天安门
// function f33($str){
//     $result=array();
//     preg_match_all("/^(.*)(?:)/i",$str, $result);
//    return $result[1][0];
// }
// function f1($str)
// {
// $result = array();
// preg_match_all("/^(.*)(?:<)/i",$str, $result);
// return $result[1][0];
// }
 
// function f2($str)
// {
// $result = array();
// preg_match_all("/(?:<)(.*)(?:>)/i",$str, $result);
// return $result[1][0];
// }
// function f3($str)
// {
// $result = array();
// preg_match_all("/(?:\()(.*)(?:\))/i",$str, $result);
// return $result[1][0];
// }
// function f4($str)
// {
// $result = array();
// preg_match_all("/(?:\[)(.*)(?:\])/i",$str, $result);
// return $result[1][0];
// }
// function f5($str)
// {
// $result = array();
// preg_match_all("/(?:\{)(.*)(?:\})/i",$str, $result);
// return $result[1][0];
// }
// 引入PHPMailer的核心文件
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';

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

    $mail->setFrom('1500081564@qq.com ', 'Mailer');  //发件人
    $mail->addAddress('825126416@qq.com', 'Joe');  // 收件人
    //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
    $mail->addReplyTo('1500081564@qq.com', 'info'); //回复的时候回复给哪个邮箱 建议和发件人一致
    //$mail->addCC('cc@example.com');                    //抄送
    //$mail->addBCC('bcc@example.com');                    //密送

    //发送附件
    // $mail->addAttachment('../xy.zip');         // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名

    //Content
    $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
    $mail->Subject = '重要这是您的账号验证码！' . time();
    $mail->Body    = '<h1>您好，您的验证码是：123123 不要告诉任何人！</h1>' . date('Y-m-d H:i:s');
    $mail->AltBody = '如果邮件客户端不支持HTML则显示此内容';

    $mail->send();
    echo '邮件发送成功';
} catch (Exception $e) {
    echo '邮件发送失败: ', $mail->ErrorInfo;
}
?>