<?php

header("Access-Control-Allow-Origin: *");
include 'conexion.php';

$IdCita = $_GET['idCita'];

$consulta = "delete from Citas where Id_cita = $IdCita";  

if(mysqli_query($conexion ,$consulta))
	echo 'si';
else
	echo 'no';

?>