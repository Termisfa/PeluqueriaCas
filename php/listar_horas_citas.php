<?php

header("Access-Control-Allow-Origin: *");
include 'conexion.php';

$IdTratamiento = $_GET['idTratamiento'];
$IdEmpleado = $_GET['idEmpleado'];
$Fecha = $_GET['fecha'];

$horas = array();



$consulta = "SELECT Hora FROM Citas WHERE empleado = '$IdEmpleado' AND fecha = '$Fecha' order by Hora;";  

$result = mysqli_query($conexion ,$consulta);

while($row = mysqli_fetch_array($result)) 
{
	array_push($horas, $row[0]);
}

$consulta2 = "SELECT Tiempo FROM Tratamientos WHERE Id_Tratamiento = '$IdTratamiento';";  
$result2 = mysqli_query($conexion ,$consulta2);

while($row2 = mysqli_fetch_array($result2)) 
{
	array_push($horas, $row2[0]);
}

echo json_encode($horas);

?>