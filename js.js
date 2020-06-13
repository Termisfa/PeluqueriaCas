var datosUsuario;
var arrayNombresBBDD;
var ipActual =  "peluqueria2.azurewebsites.net";
var tablaTratamientos;

function cargaInicial(){  
  cargarCredenciales();
  conectar();   
  precios();
  window.addEventListener("resize", checkDropLogin);
  window.addEventListener("scroll", checkDropLogin);
}

function conectar(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","/php/conexion.php");
    xmlhttp.send();
}

function cargarArrayNombresBBDD(){
  var xmlhttp = new XMLHttpRequest();
  arrayNombresBBDD = [];

    xmlhttp.open("GET","/php/nombres_columna_clientes.php");
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        arrayNombresBBDD = JSON.parse(this.response);
        arrayNombresBBDD.splice(10,1); //Eliminamos el segundo ID  
      }
    };     
}

function precios(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","/php/listar_precios.php");
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("precios").innerHTML = this.responseText;
      }
    };     
}

function showDropLogin(){
  var boton = document.getElementById("loginNavBar");
  var alturaBoton = boton.offsetHeight;
  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  var formulario = document.getElementById("loginDrop");
  formulario.style.left = getOffset(boton).left + 'px';
  formulario.style.top = getOffset(boton).top + alturaBoton + scrollTop + 'px';
  document.getElementById("loginError").innerHTML = "";
  formulario.style.backgroundColor = "#007acc";
  formulario.style.display = "block";
}

function checkLogin(){
  var xmlhttp = new XMLHttpRequest();
  var array = document.getElementById("formLogin");
    
  xmlhttp.open("GET","/php/validar_clientes.php?Usuario=" + array.elements[0].value + "&Passw=" + array.elements[1].value);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(!this.responseText) //Usuario o pass incorrectas
      {
        document.getElementById("loginDrop").style.backgroundColor = "red";        
        document.getElementById("loginError").style.display = "table-row";
        document.getElementById("loginError").innerHTML = "<td colspan='2' id='errorTd' class='insideForm'>Usuario/Contrase&ntildea err&oacute;neos</td>";
        document.getElementById("errorTd").style.backgroundColor = "red";
        document.getElementById("errorTd").style.color = "white";
        //alert("Usuario/Contraseña erróneos");
      }
      else //Usuario y pass correcto
      {                  
        document.getElementById("loginDrop").style.display = "";
        datosUsuario = JSON.parse(this.response);    
        datosUsuario[9] = "****"; //Para no guardar la pass, por seguridad 
        datosUsuario.splice(10,1); //Eliminamos el segundo ID    
        window.sessionStorage.setItem("UsuarioPeluqueria", datosUsuario);
        usuarioLogueado();
        window.location.href = "index.html";
      }
    }
  }     
}

function checkDropLogin(){
  var elemento = document.getElementById("loginDrop");
  if(elemento.style.display == "block")
    showDropLogin();
}

function usuarioLogueado()
{  
  document.getElementById("loginNavBar").innerText = datosUsuario[1];
  document.getElementById("navBarCitas").innerHTML = "<a href='citas.html'>Citas</a>";
  document.getElementById("navBarLogout").innerHTML = "<a onClick='logout();'>Cerrar sesi&oacute;n</a>";
}

function logout(){
  datosUsuario = null;
  sessionStorage.removeItem("UsuarioPeluqueria");
  document.getElementById("navBarCitas").innerHTML = "";
  document.getElementById("navBarLogout").innerHTML = "";
  document.getElementById("loginNavBar").innerText = "Iniciar sesi&oacute;n";
  window.location.href = "index.html";
}


function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

function cargarCredenciales(){  
  var inicial = sessionStorage.getItem("UsuarioPeluqueria");
  if(inicial != null)
  {
    datosUsuario = [];
    var auxString = ""; 
    for(var i = 0; i < inicial.length; i++)   
    {
      if(inicial[i] == ",")
      {
        datosUsuario.push(auxString);
        auxString = "";
      }
      else
        auxString += inicial[i];
    }
    datosUsuario.push(auxString);
    usuarioLogueado();
  }
}

function refrescarSaveNavegador(){
  sessionStorage.removeItem("UsuarioPeluqueria");
  window.sessionStorage.setItem("UsuarioPeluqueria", datosUsuario);
}

function newUser(){
  window.location.href = "nuevoUsuario.html";
}

window.onclick = function(e) {  
  if(this.datosUsuario == null)
  {
    var elemento = document.getElementById("loginDrop");
    if(e.target.id == "loginNavBar" && elemento.style.display == "")
      showDropLogin();
    else if(e.target.className != "loginDrop" && (e.target.className != "insideForm" && e.target.className != "botonInicio"))
      elemento.style.display = "";
  }
  else if(e.target.id == "loginNavBar")
    window.location.href = "configuracion.html";
}

//CARGA INICIAL DE CITAS Y CONFIGURACION

function cargaInicialCitasConfig(){
  cargarCredenciales();
  if(datosUsuario == null)
    window.location.href = "index.html";
  else
    usuarioLogueado();
}


//CONFIGURACIÓN

function cargaInicialConfig(){
  cargaInicialCitasConfig();
  cargarArrayNombresBBDD(); 
  for(var i = 1; i < datosUsuario.length; i++)
    document.getElementById("lblConf"+i).innerHTML = datosUsuario[i];
}

function modificarDato(posicion, datoNuevo){
  refrescarSaveNavegador();
  cargaInicialConfig();
}

function cancelModificar(posicion){
  document.getElementById("lblConf"+posicion).innerHTML = datosUsuario[posicion];
  document.getElementById("botonConf"+posicion).innerHTML = "<a onclick='cargarTxtbModificar("+posicion+");'><button class='botonConf'>Modificar</button></a>"; 
}

function cargarTxtbModificar(posicion){  
  document.getElementById("botonConf"+posicion).innerHTML = "<a onclick='confModConfirm("+posicion+");'><button class='botonConf'>Confirmar</button></a>&nbsp;&nbsp;";
  document.getElementById("botonConf"+posicion).innerHTML += "<a onclick='cancelModificar("+posicion+");'><button class='botonConf'>Cancelar</button></a>";
  //Contraseña
  if(posicion == 9)
  {
    document.getElementById("lblConf"+posicion).innerHTML = "Contrase&ntildea actual <input type='password' id='txtbNewPassw1'><br>"; 
    document.getElementById("lblConf"+posicion).innerHTML += "Nueva contrase&ntildea <input type='password' id='txtbNewPassw2'><br>"; 
    document.getElementById("lblConf"+posicion).innerHTML += "Nueva contrase&ntildea <input type='password' id='txtbNewPassw3'>"; 
  }
  else
    document.getElementById("lblConf"+posicion).innerHTML = "<input type='text' id='txtbNew"+posicion+"' value="+datosUsuario[posicion]+">"
}


function comprobarMascaras(datoNuevo, posicion){
    //Si el dato no puede ser null
    if(datoNuevo == "" && !(posicion == 3 || posicion == 7 || posicion == 11 || posicion == 12))
    {
      alert("El "+arrayNombresBBDD[posicion]+" no puede estar vac&iacute;o");
      return false;
    }
    //Máscara DNI
    if(posicion == 4) 
    {
      const mascaraDNI = /^\d{5,8}-?[a-zA-Z]$/;
      const mascaraNIE= /^[a-zA-Z]-?\d{5,8}-?[a-zA-Z]$/;
      if(!mascaraDNI.test(datoNuevo) && !mascaraNIE.test(datoNuevo))
      {
        alert("Formato de DNI/NIE incorrecto");
        return false;
      }
    }
    //Máscara Email
    if(posicion == 5)
    {
      const mascara = /\S+@\S+\.\S+/;
      if(!mascara.test(datoNuevo))
      {
        alert("Formato de email incorrecto");
        return false;
      }
    }
    //Máscara Teléfono
    if(posicion == 6)
    {
      const mascara = /^\d{9}$/;;
      if(!mascara.test(datoNuevo))
      {
        alert("Formato de tel&eacute;fono incorrecto");
        return false;
      }
    }
    //Máscara Género
    if(posicion == 7 && datoNuevo != "")
    {
      datoNuevo = datoNuevo.toUpperCase();
      if(datoNuevo != "M" && datoNuevo != "F")
      {
        alert("Formato de g&eacute;nero incorrecto");
        return false;
      }
    } 
    //Máscara integer numero dirección
    if(posicion == 11 && datoNuevo != "")
    {
      const mascara = /^\d+$/;
      if(!mascara.test(datoNuevo))
      {
        alert("Formato de n&uacute;mero en la direcci&oacute;n incorrecto");
        return false;
      }
    }
    //Máscara integer codPostal
    if(posicion == 13)
    {
      const mascara = /^\d+$/;
      if(!mascara.test(datoNuevo))
      {
        alert("Formato de C&oacute;digo Postal incorrecto");
        return false;
      }
    }



    //Si todo es correcto
    return true;
}

function confModConfirm(posicion){  
  //Contraseña
  if(posicion == 9)
  {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET","/php/validar_clientes.php?Usuario=" + datosUsuario[8] + "&Passw=" + document.getElementById("txtbNewPassw1").value);
    xmlhttp.send();
  
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(!this.responseText) //Usuario o pass incorrectas
        {
          alert("Contrase&ntildea incorrecta");
        }
        else //Usuario y pass correcto
        {                  
          var passw = document.getElementById("txtbNewPassw2").value;
          if(passw != document.getElementById("txtbNewPassw3").value)
            alert ("Las contrase&ntildeas no coinciden");
          else
            modificarPassw(passw, posicion);
        }
      }
    }
  } 
  else 
  {
    var datoNuevo = document.getElementById("txtbNew"+posicion).value;
    if(comprobarMascaras(datoNuevo, posicion)) 
    {       
      //Comprobar que el usuario no existe
      if(posicion == 8 && datoNuevo != datosUsuario[8])
        checkExistingUser(datoNuevo, posicion)
      else
        modificarDato(posicion, datoNuevo);
    }
  }
}

function modificarPassw(passw, posicion){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/editar_passw.php?Id_Cliente="+datosUsuario[0]+"&Dato="+passw);
  xmlhttp.send();
  alert("Contrase&ntildea cambiada con &eacute;xito");
  document.getElementById("botonConf"+posicion).innerHTML = "<a onclick='cargarTxtbModificar("+posicion+");'><button class='botonConf'>Modificar</button></a>"; 
  refrescarSaveNavegador();
  window.location.href = "configuracion.html";
}

function checkExistingUser(datoNuevo, posicion){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/comprobar_usuario.php?Usuario="+datoNuevo);
  xmlhttp.send();
  
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
      if(this.responseText == 0)      
        alert("El nombre de usuario ya existe");
      else
        modificarDato(posicion, datoNuevo);              
    }
  };  
}

function modificarDato(posicion, datoNuevo){
  if(posicion == 4)
    datoNuevo = corregirDNI(datoNuevo);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/editar_cliente.php?Id_Cliente="+datosUsuario[0]+"&NombreColumna="+arrayNombresBBDD[posicion]+"&Dato="+datoNuevo);
  xmlhttp.send();
  datosUsuario[posicion] = datoNuevo;
  document.getElementById("botonConf"+posicion).innerHTML = "<a onclick='cargarTxtbModificar("+posicion+");'><button class='botonConf'>Modificar</button></a>"; 
  refrescarSaveNavegador();
  window.location.href = "configuracion.html";
}


//NUEVO USUARIO
function cargaInicialNewUser(){
  cargarCredenciales();
  if(datosUsuario == null)
    cargarArrayNombresBBDD(); 
  else
    window.location.href = "index.html";
}


function confirmNewUser(){

  //Comprobar que ambas passw sean iguales
  if(document.getElementById("txtbNew9").value.localeCompare(document.getElementById("txtbNew17").value) != 0)
  {
    alert("Las contrase&ntildeas no coinciden");
    return;
  }
  
  var arrayDatos = [""];
  for(var i = 1; i < arrayNombresBBDD.length; i++)
  {
    var nuevoDato = document.getElementById("txtbNew"+i).value;
    arrayDatos.push(nuevoDato);
    if(!comprobarMascaras(nuevoDato,i))
      return;
  }  
  
  
  arrayDatos[4] = corregirDNI(arrayDatos[4]);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/comprobar_usuario.php?Usuario="+arrayDatos[8]);
  xmlhttp.send();
  
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
      if(this.responseText == 0)      
        alert("El nombre de usuario ya existe");
      else
        insertarNuevoUsuario(arrayDatos);      
    }
  }; 
}

function insertarNuevoUsuario(arrayDatos){
  var aux = "";
  for(var i = 1; i < arrayNombresBBDD.length; i++)
  {
    aux += arrayNombresBBDD[i];
    aux += "=";
    aux += arrayDatos[i];
    if(i + 1 < arrayNombresBBDD.length)
      aux += "&";
  }


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/insertar_usuario.php?"+aux);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
      alert("Usuario creado con &eacute;xito");
      window.location.href = "index.html";
    }
  };  
}

function resetNewUser(){
  for(var i = 1; i <= arrayNombresBBDD.length; i++)
    document.getElementById("txtbNew"+i).value = "";
}

function corregirDNI(viejoDNI){
  var nuevoDNI = "";
  const mascaraNIE= /^[a-zA-Z]-?\d{5,8}-?[a-zA-Z]$/;

  if(viejoDNI[viejoDNI.length-2] != "-")
  {
    //Agrego el guión atrás
    for(var i = 0; i < viejoDNI.length - 1; i++)    
      nuevoDNI += viejoDNI[i];    
    nuevoDNI += "-" + viejoDNI[viejoDNI.length-1];

    //Si es DNI, no hay que hacer nada más
    if(!mascaraNIE.test(viejoDNI))
      return nuevoDNI;
    else
    {
      viejoDNI = nuevoDNI;
      nuevoDNI = "";
    }
  }

  if(mascaraNIE.test(viejoDNI) && viejoDNI[1] != "-")
  {
    nuevoDNI += viejoDNI[0] + "-";
    for(var i = 1; i < viejoDNI.length; i++)    
      nuevoDNI += viejoDNI[i];
    return nuevoDNI;
  }

  return viejoDNI;
}


//Citas

function cargaInicialCitas(){    
  cargaInicialCitasConfig();
  cargarCitasActuales();
  cargarTablaTratamientos();
  cargarCredenciales();
}

function cargarFormularioNuevaCita(){
  cargarListadoTratamientos();
  cargarListadoEmpleados();
  document.getElementById("divHoras1").style.display = "none";
  document.getElementById("divHoras2").style.display = "none";
  document.getElementById("calendario").setAttribute("min", getToday());
}

function cargarTablaTratamientos(){  
  var xmlhttp = new XMLHttpRequest();
  tablaTratamientos = [];

  xmlhttp.open("GET","/php/listar_tratamientos.php");
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {    
    if (this.readyState == 4 && this.status == 200) {
      var tablaSinFormato = JSON.parse(this.response);
      for(var i = 0; i < tablaSinFormato.length; i++)
      {
        var aux = [];
        for(var j = 0; j < 4; j++)
        {
          aux.push(tablaSinFormato[i]);
          i++;
        }
        i--;
        tablaTratamientos.push(aux);
      }    
      cargarFormularioNuevaCita(); 
    }
  };   
}

function cargarListadoTratamientos(){
  var aux = "";
  for(var i = 0; i < tablaTratamientos.length; i++)
    aux += "<option value = "+tablaTratamientos[i][0]+">"+tablaTratamientos[i][1]+"</option>";
  document.getElementById("listadoTratamientos").innerHTML = aux;
}

function cargarListadoEmpleados(){
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET","/php/listar_empleados.php");
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {    
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("listadoEmpleados").innerHTML = this.responseText;
    }
  };
}

function cargarCitasActuales(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/listar_citas.php?Usuario="+datosUsuario[0]);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("citasActuales").innerHTML = this.responseText;
    }
  };   
}


function citaBorrar(idCita){
  document.getElementById("botonCitaBorrar"+idCita).innerHTML = "<a onclick='citaBorrarConfirmado("+idCita+");'><button class = 'botonConf'>Confirmar</button></a>&nbsp;&nbsp;<a onclick='citaBorrarCancelar();'><button class = 'botonConf'>Cancelar</button></a>";
}

function citaBorrarConfirmado(idCita){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/borrar_cita.php?idCita="+idCita);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) {
      alert("Cita eliminada");
      cargaInicialCitas();
    }
  };   
}

function citaBorrarCancelar(){
  window.location.href = "citas.html";
}

function comprobarHorasCita(){
  var calendario = document.getElementById("calendario");
  if(calendario.value != "" && calendario.value != null)
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","/php/listar_horas_citas.php?idTratamiento="+document.getElementById("listadoTratamientos").value+"&idEmpleado="+document.getElementById("listadoEmpleados").value+"&fecha="+calendario.value);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() 
    {
      if (this.readyState == 4 && this.status == 200) {
        manejadorHorasCitas(this.responseText);
      }
    };
  }
  else
    alert("Por favor, seleccione una fecha");
}

function manejadorHorasCitas(arrayJson){
  var arrayBruto = JSON.parse(arrayJson);
  var tiempoTratamiento = arrayBruto.pop();;
  var horasDisponibles = [];
  var arrayHorasInicio = [];
  var arrayHorasFinal = [];
  for(var i = 0; i<(arrayBruto.length * 2);i++)
  {
    var aux = arrayBruto[Math.floor(i/2)];
    if(i % 2 == 0)
      arrayHorasInicio.push(parseInt((aux[0]+aux[1]+aux[3]+aux[4]),10));
    else
      arrayHorasFinal.push(parseInt((aux[8]+aux[9]+aux[11]+aux[12]),10));    
  }


  var booleano = false;
  for(var i = 0; i < arrayHorasInicio.length; i++)
  {
    if(arrayHorasInicio[i] > 1400)
    {
      arrayHorasInicio.splice(i, 0, 1400);
      arrayHorasFinal.splice(i, 0, 1600);
      booleano = true;
      break;
    }
  }

  if(arrayHorasInicio.length == 0 || !booleano)
  {
    arrayHorasInicio.push(1400);
    arrayHorasFinal.push(1600);
  }
  

  arrayHorasInicio.push(2000);

  for(var i = 1000; i < 1960; i += 15)
  {
  if(i != 1000 && i % 4 == 0)
    i += 40;
  
  if(i == 1400)
    i = 1600;

    var aux = arrayHorasInicio[0] - i
    if(aux > 45)
    {
      var auxInicio;
      if(arrayHorasInicio[0] != 2000)
      {
        var auxInicio1 = Math.floor(arrayHorasInicio[0] / 100);
        auxInicio1 = auxInicio1 % 10;
        auxInicio1 = auxInicio1 * 60;
        var auxInicio2 = arrayHorasInicio[0] % 100;
        auxInicio = auxInicio1 + auxInicio2
      }
      else
        auxInicio = Math.floor(2000 / 1.666666) / 2;
    
      var auxi1 = Math.floor(i / 100);
      auxi1 = auxi1 % 10;
      auxi1 = auxi1 * 60;
      var auxi2 = i % 100;
      aux = auxInicio - (auxi1 + auxi2);
    }
    if(aux - tiempoTratamiento < 0)
    {
      arrayHorasInicio.shift();
      if(arrayHorasInicio.length == 0)
        break;
      
      i = arrayHorasFinal.shift();

      if(i % 100 != 0 && i % 100 != 15 && i % 100 != 30 && i % 100 != 45 && i % 100 != 60)
        i += 15 - i % 100;

      if(i % 4 == 0)
        i -= 55;
      else
        i -= 15;
    }
    else 
      horasDisponibles.push(i);        
  }



  if(horasDisponibles.length == 0)
    alert("El empleado tiene el d&iacute;a completo. Por favor, cambie el d&iacute;a o el empleado");
  else
  {
    //Al tiempo, por cada 60 hay que sumarle 40
    var tiempoTratamiento1 = Math.floor(tiempoTratamiento / 60) * 100;
    var tiempoTratamiento2 = tiempoTratamiento % 60;

    for(var i = 0; i < horasDisponibles.length; i++)
    {
      var horasDisponibles1 = Math.floor(horasDisponibles[i] / 100) * 100;
      var horasDisponibles2 = horasDisponibles[i] % 100;

      var parte1 = tiempoTratamiento1 + horasDisponibles1;
      var parte2 = tiempoTratamiento2 + horasDisponibles2;

      if(parte2 >= 60)
      {
        parte1 += 100;
        parte2 -= 60;
      }
      var horaFinal = parte1 + parte2;

      var aux = horasDisponibles[i].toString(10) + horaFinal.toString(10);    
      arrayNuevo = aux.split(''); 
      arrayNuevo.splice(2,0,":");
      arrayNuevo.splice(5,0," - ");
      arrayNuevo.splice(8,0,":");
      horasDisponibles[i] = arrayNuevo.join("");
    }
    
    
    var aux = "";
    for(var i = 0; i < horasDisponibles.length; i++)
      aux += "<option value = '"+horasDisponibles[i]+"'>"+horasDisponibles[i]+"</option>";
    document.getElementById("listadoHorasCitas").innerHTML = aux;
    
    buscarCitaCorrecto();
  }
  
}

function buscarCitaCorrecto(){
  document.getElementById("divHoras1").style.display = "table-row";
  document.getElementById("divHoras2").style.display = "table-row";
  document.getElementById("listadoTratamientos").disabled = true;
  document.getElementById("listadoEmpleados").disabled = true;
  document.getElementById("calendario").disabled = true;
  document.getElementById("spanBotonBuscarCita").innerHTML = "<a id='botonCancelarBusquedaCita' onclick='cancelarBusquedaCita()'><button class='botonConf'>Nueva b&uacute;squeda</button></a>";    
  document.getElementById("spanBotonConfirmarCita").innerHTML = "<a id='botonConfirmarCita' onclick='confirmarCita()'><button class='botonConf'>Confirmar nueva cita</button></a>";    
}

function cancelarBusquedaCita(){
  document.getElementById("divHoras1").style.display = "none";
  document.getElementById("divHoras2").style.display = "none";
  var tratamiento = document.getElementById("listadoTratamientos").disabled = false;
  var empleado = document.getElementById("listadoEmpleados").disabled = false;
  var calendario = document.getElementById("calendario").disabled = false;
  document.getElementById("spanBotonBuscarCita").innerHTML = "<a id='spanBotonBuscarCita' onclick='comprobarHorasCita()'><button class='botonConf'>Buscar</button></a>";
}

function confirmarCita(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/php/insertar_cita.php?Empleado="+document.getElementById("listadoEmpleados").value+"&Cliente="+datosUsuario[0]+"&Tratamiento="+document.getElementById("listadoTratamientos").value+"&Fecha="+document.getElementById("calendario").value+"&Hora="+document.getElementById("listadoHorasCitas").value);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) {
      alert("Cita creada");
      window.location.href = "citas.html";
    }
  };
}

function getToday(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 

  today = yyyy+'-'+mm+'-'+dd;
  return today;
}



