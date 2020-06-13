<?php 
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

//verificar si una variable se ha definido
if(isset($_GET['Id_Cliente']) || isset($_GET['Dato'])){

	$Id_Cliente = $_GET['Id_Cliente'];
	$Dato = $_GET['Dato'];

	

	$consulta = "UPDATE Clientes INNER JOIN DireccionCliente ON Clientes.Id_Cliente = '$Id_Cliente' AND DireccionCliente.Id_Cliente = '$Id_Cliente' SET passw = AES_ENCRYPT('$Dato', 'PeluCas')";

	//$consulta = "UPDATE Clientes INNER JOIN DireccionCliente ON Clientes.Id_Cliente = '71' AND DireccionCliente.Id_Cliente = '71' SET Letra = 'funciona'";
	mysqli_query($conexion, $consulta) or die (mysqli_error());
}

 ?>