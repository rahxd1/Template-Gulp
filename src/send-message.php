<?php 
if(isset($_POST['submit'])){
    $to = "ignacio.meza@gov.ab.ca";
    $from = $_POST['email']; 
    $name = $_POST['nombre'];
    $city = $_POST['ciudad'];
    $comment = $_POST['comentario'];

    $session = $_POST['session'];
    $date =  $_POST['date'];
    $time = $_POST['time'];

    $privacy = $_POST['privacidad'];

    $subject = "Contacto";

    $html = '<table width="600px" border="0" style="font-size:15px;text-align:center;border-collapse:collapse"> <thead> <tr> <td style="background-color:#00afdb" height="60px"></td> <td></td> </tr> <tr> <td style="font-size:25px;color:#fff;background-color:#00afdb">Alberta</td> <td rowspan="2" style="text-align:center;font-size:20px;color:#fff;background-color:#00afdb"> '.$subject.' </td> </tr> <tr> <td style="font-size:25px;color:#fff;background-color:#00afdb"></td> </tr> <tr> <td style="background-color:#00afdb" height="30px"></td> <td></td> </tr> </thead><tbody style="text-align:left"> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Nombre:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$name.'</td> </tr> <tr> <td colspan="2" height="50px"></td> </tr> <tr> <td style="padding-left:60px">Email:</td> <td style="padding-left:50px">Ciudad:</td> </tr> <tr style="font-size:16px;font-weight:bold"> <td style="padding-left:60px">'.$from.'</td> <td style="padding-left:50px">'.$city.'</td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center"><h2>¿Qué te interesa estudiar en Alberta?</h2></td> </tr> <tr> <td colspan="2" style="text-align:left">'.$comment.'</td> </tr>';

    if($session!= ""){
        $subject = "Confirmación de asistencia";
        $html.= '<tr> <td colspan="2" style="text-align:center"><h2>Confirmación de asistencia</h2></td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Sesión informativa:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$session.'</td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Fecha:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$date.'</td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Hora:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$time.'</td> </tr>';
    };

    if($privacy){
        $html.= '<tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center"><h2>Quiero recibir noticias y eventos para estudiar en Alberta</h2></td> </tr>';
    }

    $html.= '</tbody></table>';

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From:" . $from . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion()."\r\n";

    if (mail($to, $subject, $html, $headers)){
        if($subject == "Contacto"){
            header('location: contacto-exitoso.html');
        }else{
            header('location: confirmacion-exitosa.html');
        }
    }else{
        if($subject == "Contacto"){
            header('location: contacto-fallido.html');
        }else{
            header('location: confirmacion-fallida.html');
        }
    }
}
?>