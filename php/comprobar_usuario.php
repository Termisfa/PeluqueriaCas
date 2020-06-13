<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

//verificar si una variable se ha definido
if(isset($_GET['Usuario'])){

	//Uso de GET para los parametros Usuario
	$Usuario = $_GET['Usuario'];


	$consulta1 = "SELECT * FROM Clientes WHERE Usuario='$Usuario'";

	$result1 = mysqli_query($conexion ,$consulta1);

	$count1 = mysqli_num_rows($result1);

	if ($count1 > 0){ //si encuentra
		echo 0;

	}
	else {
		$consulta2 = "SELECT * FROM Empleados WHERE Usuario='$Usuario'";

		$result2 = mysqli_query($conexion ,$consulta2);
	
		$count2 = mysqli_num_rows($result2);
	
		if ($count2 > 0){ //si encuentra
			echo 0;
	
		}
		else
			echo 1;
	}	
}

?>