<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

	$nombres = array();

	
	$consulta1 = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Clientes' ORDER BY ORDINAL_POSITION";

	$result = mysqli_query($conexion ,$consulta1);

	while($fila = $result -> fetch_row()) {
		array_push($nombres, $fila[0]);
	}

	$consulta2 = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='DireccionCliente' ORDER BY ORDINAL_POSITION";

	$result = mysqli_query($conexion ,$consulta2);

	while($fila = $result -> fetch_row()) {
		array_push($nombres, $fila[0]);
	}

	echo json_encode($nombres);


?>


