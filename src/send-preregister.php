<?php 
if(isset($_POST['submit'])){
    $to = "";
    $from = $_POST['email']; 
    $name = $_POST['nombre'];
    $city = $_POST['ciudad'];
    $comment = $_POST['comentario'];

    $session = $_POST['session'];
    $date =  $_POST['date'];
    $time = $_POST['time'];

    $privacy = $_POST['privacidad'];

    $subject = "Contacto";

    $html = '';

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From:" . $from . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion()."\r\n";

    if (mail($to, $subject, $html, $headers)){
        if($subject == "Contacto"){
            header('location: .html');
        }else{
            header('location: .html');
        }
    }else{
        if($subject == "Contacto"){
            header('location: .html');
        }else{
            header('location: .html');
        }
    }
}
?>