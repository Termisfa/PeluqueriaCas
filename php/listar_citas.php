<?php

header("Access-Control-Allow-Origin: *");
include 'conexion.php';

$Usuario = $_GET['Usuario'];

$consulta = "select c.Id_Cita, e.Nombre as NombreEmpleado, t.Nombre as NombreTratamiento, c.Fecha, c.Hora
from Citas c, Empleados e, Tratamientos t
where c.Cliente = '$Usuario' and e.Id_Empleado = c.Empleado and t.Id_Tratamiento = c.Tratamiento and CURRENT_DATE <= c.Fecha
order by c.Fecha;";  

$resultado = mysqli_query($conexion ,$consulta);

if (!empty($resultado) AND mysqli_num_rows($resultado) > 0)
{
	echo "<table class = 'tableCitas'>
	<tr>
	<th>Empleado</th>
	<th>Tratamiento</th>
	<th>Fecha</th>
	<th>Hora</th>
	<th>Eliminar cita</th>
	</tr>";

	while($row = mysqli_fetch_array($resultado)) 
	{
		$IdCita = $row['Id_Cita'];
		echo "<tr>";		
		echo "<td>" . $row['NombreEmpleado'] . "</td>";
		echo "<td>" . $row['NombreTratamiento'] . "</td>";
		echo "<td>" . $row['Fecha'] . "</td>";
		echo "<td>" . $row['Hora'] . "</td>";				
		echo "<td id='botonCitaBorrar".$IdCita."'> <a onclick='citaBorrar(". $IdCita .");'><button class = 'botonConf'>Borrar</button></a> </td>";
		echo "</tr>";	
	}
	echo "</table>";
}
else
	echo "No tiene citas actualmente";	



?>