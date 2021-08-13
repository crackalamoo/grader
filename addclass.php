<?php
$to = "harysdalvi@gmail.com";
$subject = "AHS grade calculator class request";

$_POST = $_REQUEST;
print_r($_POST);
echo " submit ";

if ($_POST['form_submitted'] == "Submitted") {
    echo $_POST['class'].' ';
    $class = $_POST['class'];
    $categories = $_POST['cats'];
    $weights = $_POST['weights'];
    $notes = $_POST['notes'];

    $message = '<html><body>';
    $message .= "Hello, future me! You have a new class request:<br>";
    $message .= "<strong>Class name:</strong> " . $class . "<br>";
    $message .= "<strong>Categories:</strong> ".$categories."<br>";
    $message .= "<strong>Weights:</strong> ".$weights."<br>";
    $message .= "<strong>Notes (optional):</strong> ".$notes."<br>";
    $message .= "Thank you for your time! You're the best!";
    $message .= '</body></html>';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Dalvi <dalvi@harysdalvi.com>" . "\r\n";

    if(mail($to,$subject,$message,$headers)){
        echo "success";
    } else {
        echo "fail";
    }
}
?>