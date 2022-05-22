$(document).ready(function() {
    $("#error2").hide();
    $('#pass2').keyup( function(){
        var pass1 = $('#pass1').val();
        var pass2 = $('#pass2').val();

        if (pass1 == pass2) {
            $('#error2').text("Contraseñas coinciden").css("color", "green").classlist("alert alert-danger");
            $("#error2").show();
        }
        else{
            $('#error2').text("Contraseñas no coinciden").css("color", "red");
            $("#error2").show();
        }
        if (pass2 ==""){
            $('#error2').text("No puede estar en blanco").css("color", "red");
            $("#error2").show();
        }
    });
    $('#errorfono').hide();
    $('#telefono').keyup(function(){
        var fono = $('#telefono').val();
        if (fono.length == 12 ){
            $('#errorfono').hide();
        }
        else{
            $('#errorfono').text("Numero de telefono incorrecto").css("color", "red");
            $('#errorfono').show();
        
        }
    });
});

// oír los cambios en la caja de texto e ir dando formato al RUT
document.addEventListener('input', (e) => {
    const rut = document.getElementById('rut');
  
    if (e.target === rut) {
      let rutFormateado = darFormatoRUT(rut.value);
      rut.value = rutFormateado;
    }
  });
  
  // dar formato XX.XXX.XXX-X
  function darFormatoRUT(rut) {
    // dejar solo números y letras 'k'
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  
    // asilar el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
  
    if (rutLimpio.length < 2) return rutLimpio;
  
    // colocar los separadores de miles al cuerpo
    let cuerpoFormatoMiles = cuerpo
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1.');
  
    cuerpoFormatoMiles = cuerpoFormatoMiles
      .split('')
      .reverse()
      .join('')
      .replace(/^[\.]/, '');
  
    return `${cuerpoFormatoMiles}-${dv}`;
  }
  
  // si presiona ENTER ejecutar la validación
  document.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) ejecutarValidacion();
  });
  
  // oír el clic y si presiona el botón 'Validar RUT' ejecutar la validación
  document.addEventListener('click', (e) => {
    const botonValidarRUT = document.getElementById('btn-valida-rut');
  
    if (e.target === botonValidarRUT) {
      ejecutarValidacion();
    }
  });
  
  function ejecutarValidacion() {
    const rut = document.getElementById('rut').value;
    const resultado = validarRUT(rut);
    const salida = document.querySelector('.salida');
  
    if (!rut) {
      salida.innerHTML = `<p style="color: red;">Debes ingresar un RUT</p>`;
    } else if (resultado === true) {
      salida.innerHTML = `<p style="color: darkgreen;">El RUT ${rut} es válido</p>`;
    } else {
      salida.innerHTML = `<p style="color: red;">El RUT ${rut} no es válido</p>`;
    }
  
    document.getElementById('rut').value = '';
  }
  
  function validarRUT(rut) {
    // dejar solo números y letras 'k'
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  
    // verificar que ingrese al menos 2 caracteres válidos
    if (rutLimpio.length < 2) return false;
  
    // asilar el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
  
    // validar que el cuerpo sea numérico
    if (!cuerpo.replace(/[^0-9]/g, '')) return false;
  
    // calcular el DV asociado al cuerpo del RUT
    const dvCalculado = calcularDV(cuerpo);
  
    // comparar el DV del RUT recibido con el DV calculado
    return dvCalculado == dv;
  }
  
  function calcularDV(cuerpoRUT) {
    let suma = 1;
    let multiplo = 0;
  
    for (; cuerpoRUT; cuerpoRUT = Math.floor(cuerpoRUT / 10))
      suma = (suma + (cuerpoRUT % 10) * (9 - (multiplo++ % 6))) % 11;
  
    return suma ? suma - 1 : 'K';
  }
  

  $("#Enviar").submit(function(event){
    loadAjax();
    event.preventDefault()
 })

 function checkRut(rut) {
  // Despejar Puntos
  var valor = rut.value.replace('.','');
  // Despejar Guión
  valor = valor.replace('-','');
  
  // Aislar Cuerpo y Dígito Verificador
  cuerpo = valor.slice(0,-1);
  dv = valor.slice(-1).toUpperCase();
  
  // Formatear RUN
  rut.value = cuerpo + '-'+ dv
  
  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
  
  // Calcular Dígito Verificador
  suma = 0;
  multiplo = 2;
  
  // Para cada dígito del Cuerpo
  for(i=1;i<=cuerpo.length;i++) {
  
      // Obtener su Producto con el Múltiplo Correspondiente
      index = multiplo * valor.charAt(cuerpo.length - i);
      
      // Sumar al Contador General
      suma = suma + index;
      
      // Consolidar Múltiplo dentro del rango [2,7]
      if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

  }
  
  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);
  
  // Casos Especiales (0 y K)
  dv = (dv == 'K')?10:dv;
  dv = (dv == 0)?11:dv;
  
  // Validar que el Cuerpo coincide con su Dígito Verificador
  if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
  
  // Si todo sale bien, eliminar errores (decretar que es válido)
  rut.setCustomValidity('');
}