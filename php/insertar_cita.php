<?php 

header("Access-Control-Allow-Origin: *");

include 'conexion.php';



$Empleado = $_GET['Empleado'];
$Cliente = $_GET['Cliente'];
$Tratamiento = $_GET['Tratamiento'];
$Fecha = $_GET['Fecha'];
$Hora = $_GET['Hora'];

$consulta="INSERT into Citas(Empleado, Cliente, Tratamiento, Fecha, Hora) values ('$Empleado','$Cliente','$Tratamiento','$Fecha','$Hora')";

if(mysqli_query($conexion, $consulta))
	echo 'funciona';
else
	echo 'no funciona';


 ?>