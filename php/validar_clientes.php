<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

//verificar si una variable se ha definido
if(isset($_GET['Usuario']) && isset($_GET['Passw'])){

	//Uso de GET para los parametros Usuario y Passw
	$Usuario = $_GET['Usuario'];
	$Passw = $_GET['Passw'];

	


	//consulta para buscar el usuario y la password que coincidan con algun campo en la BBDD
	//Uso de BINARY para coincidencia exacta de MAYUS o MINUS
	$consulta1 = "SELECT c.Id_Cliente, c.Nombre, c.Apellido1, c.Apellido2, c.DNI, c.Correo, c.Telefono, c.Genero, c.Usuario, cast(aes_decrypt(c.passw, 'PeluCas') as char), d.Id_Cliente, d.calle, d.Numero, d.Letra, d.CodPostal, d.Ciudad, d.Provincia, d.Pais FROM Clientes c INNER JOIN DireccionCliente d WHERE Usuario='$Usuario'AND cast(aes_decrypt(c.passw, 'PeluCas') as char)='$Passw' AND d.Id_Cliente = c.Id_Cliente";

	$result = mysqli_query($conexion ,$consulta1);

	$count1 = mysqli_num_rows($result);

	if ($count1 > 0){ //si encuentra
		$row = $result -> fetch_row();
		echo json_encode($row);
	}
	else {
		echo false;
	}	
}

?>