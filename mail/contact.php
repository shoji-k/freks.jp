<?php
$r['result'] = false;

// validate
if(empty($_POST['name'])  ||
    empty($_POST['email']) ||
    empty($_POST['message']))
    // || !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
{
    $r['message'] = "フォームに未入力の項目があります";
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($r);
    return false;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$to = 'contact+webpagecontact@freks.jp';
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";
$headers = "From: contact@freks.jp\n";
$headers .= "Reply-To: $email_address";
if (mail($to,$email_subject,$email_body,$headers)) {
    $r['result'] = true;
    $r['message'] = "ご連絡ありがとうございました";
} else {
    $r['message'] = "エラーが発生しました<br>contact@freks.jpまでご連絡ください";
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($r);
return true;
