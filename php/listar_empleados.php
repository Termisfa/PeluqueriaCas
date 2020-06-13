<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';


	
	$consulta = "SELECT * from Empleados where Rol != 'No Activo'";  

	$result = mysqli_query($conexion ,$consulta);

	while($row = mysqli_fetch_array($result)) 
	{
		echo "<option value = ".$row['Id_Empleado'].">".$row['Nombre']."</option>";
	}


?>