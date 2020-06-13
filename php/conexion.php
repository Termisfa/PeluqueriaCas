<?php 

header("Access-Control-Allow-Origin: *");


$hostname = 'remotemysql.com';
$database = 'F0tanJ0GQ1';
$username = 'F0tanJ0GQ1';
$password = 'k5WXMMvYD6';

//establecer la conexion con la BBDD
$conexion = new mysqli($hostname, $username, $password, $database);



if($conexion -> connect_errno){//si no puede establecer la conexion

	echo ($conexion->connect_error);
}

?>
