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