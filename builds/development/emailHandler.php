<?php
$subject = $_POST['subject'];
$email = $_POST['email'];
$content = $_POST['content'];
$headers  = "From: $email\r\n";
$headers .= "Content-type: text/html\r\n";

$toEmail = "dannylum@dannylum.com";
if (mail($toEmail, $subject, $content, $headers))
{
    header('Location: /#/thankyou');
}
?>
