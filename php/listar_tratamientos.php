<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

	$nombres = array();

	
	$consulta = "SELECT * from Tratamientos";  

	$result = mysqli_query($conexion ,$consulta);

	while($fila = $result -> fetch_row()) {
		array_push($nombres, $fila[0]);
		array_push($nombres, $fila[1]);
		array_push($nombres, $fila[2]);
		array_push($nombres, $fila[3]);
	}

	echo json_encode($nombres);


?>