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

    $html = '<tbody style="text-align:left"> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Nombre:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$subject.'</td> </tr> <tr> <td colspan="2" height="50px"></td> </tr> <tr> <td style="padding-left:60px">Email:</td> <td style="padding-left:50px">Ciudad:</td> </tr> <tr style="font-size:16px;font-weight:bold"> <td style="padding-left:60px">'.$from.'</td> <td style="padding-left:50px">'.$city.'</td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center"><h2>¿Qué te interesa estudiar en Alberta?</h2></td> </tr> <tr> <td colspan="2" style="text-align:left">'.$comment.'</td> </tr>';

    if($session!= ""){
        $subject = "Confirmación de asistencia";
        $html.= '<tr> <td colspan="2" style="text-align:center"><h2>Confirmación de asistencia</h2></td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Sesión informativa:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$session.'</td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Fecha:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$date.'</td> </tr> <tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center">Hora:</td> </tr> <tr style="font-size:16px;text-align:center;font-weight:bold"> <td colspan="2">'.$time.'</td> </tr>';
    };

    if($privacy){
        $html.= '<tr> <td colspan="2" height="30px"></td> </tr> <tr> <td colspan="2" style="text-align:center"><h2>Quiero recibir noticias y eventos para estudiar en Alberta</h2></td> </tr>';
    }

    $html.= '</tbody></table>';

    $headers = "From:" . $from;
    
    mail($to, $subject, $html, $headers);
}
?>