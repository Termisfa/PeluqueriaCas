<?php 

header("Access-Control-Allow-Origin: *");


$hostname = 'trabajofctazure.mysql.database.azure.com';
$database = 'Peluqueria';
$username = 'sergio@trabajofctazure';
$password = 'Passwo123';

//establecer la conexion con la BBDD
$conexion = new mysqli($hostname, $username, $password, $database);



if($conexion -> connect_errno){//si no puede establecer la conexion

	echo ($conexion->connect_error);
}

?>
