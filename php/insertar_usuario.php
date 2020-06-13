<?php 

header("Access-Control-Allow-Origin: *");

include 'conexion.php';


//verificar si una variable se ha definido
if(isset($_GET['Nombre']) || isset($_GET['Apellido1']) || isset($_GET['Apellido2']) || isset($_GET['DNI']) || isset($_GET['Correo'])|| isset($_GET['Telefono'])|| isset($_GET['Genero'])|| isset($_GET['Usuario'])|| isset($_GET['Passw'])|| isset($_GET['Calle'])|| isset($_GET['Numero'])|| isset($_GET['Letra'])|| isset($_GET['CodPostal'])|| isset($_GET['Ciudad'])|| isset($_GET['Provincia'])|| isset($_GET['Pais'])){

	$Nombre = $_GET['Nombre'];
	$Apellido1 = $_GET['Apellido1'];
	$Apellido2 = $_GET['Apellido2'];
	$DNI = $_GET['DNI'];
	$Correo = $_GET['Correo'];
	$Telefono = $_GET['Telefono'];
	$Genero = $_GET['Genero'];
	$Usuario = $_GET['Usuario'];
	$Passw = $_GET['Passw'];

	$Calle = $_GET['Calle'];
	$Numero = $_GET['Numero'];
	$Letra = $_GET['Letra'];
	$CodPostal = $_GET['CodPostal'];
	$Ciudad = $_GET['Ciudad'];
	$Provincia = $_GET['Provincia'];
	$Pais = $_GET['Pais'];

	$consulta="INSERT into Clientes(Nombre, Apellido1, Apellido2, DNI, Correo, Telefono, Genero, Usuario, Passw) values ('$Nombre','$Apellido1','$Apellido2','$DNI','$Correo','$Telefono','$Genero','$Usuario', AES_ENCRYPT('$Passw', 'PeluCas'))";

	if(mysqli_query($conexion, $consulta)){

		$last_id = mysqli_insert_id($conexion);


		$consulta2="INSERT into DireccionCliente(Id_Cliente, Calle, Numero, Letra, CodPostal, Ciudad, Provincia, Pais) values ('$last_id','$Calle','$Numero','$Letra','$CodPostal','$Ciudad','$Provincia','$Pais')";


		if(mysqli_query($conexion, $consulta2)){

			$resultado = "1";

			echo $resultado;

		}else {

			$resultado = "2";

			echo $resultado;
		}

	}
	else
		echo "fallo";
}

 ?>