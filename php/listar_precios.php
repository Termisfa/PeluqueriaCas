<?php

header("Access-Control-Allow-Origin: *");
include 'conexion.php';

$consulta = "SELECT Nombre, Precio from Tratamientos";  

$resultado = $conexion -> query($consulta);


echo "<table class='tablaPrecios'>
<tr>
<th>Tratamiento</th>
<th>Precio</th>
</tr>";

while($row = mysqli_fetch_array($resultado)) 
{
	echo "<tr>";
	echo "<td>" . $row['Nombre'] . "</td>";
	echo "<td>" . $row['Precio'] . "€</td>";
	echo "</tr>";	
}
echo "</table>";



$resultado -> close();

?>