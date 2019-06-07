function limpiar(){
  document.getElementById("cantidad").value="";
  document.formulario.resultado.value ="";
}

function calcular (){
  var tipo = document.getElementById("opciones").value;
  var cantidad = document.getElementById("cantidad").value;
  var resultado;
  
  if( (cantidad - 0) != cantidad && (''+cantidad).replace(/^\s+|\s+$/g, "").length > 0)
    {
      alert("Introduzca una cifra");
      return false;
    }
  else
    {
      if(tipo === "dol_lib")
        {
        resultado = cantidad * 0.75;
        }
      else if (tipo === "lib_dol")
        {
        resultado = cantidad / 0.75;
        }
      else if (tipo === "eu_lib")
        {
        resultado = cantidad * 0.85;
        }
      else if (tipo === "lib_eu")
        {
        resultado = cantidad / 0.85;
        }
      else if (tipo === "eu_dol")
        {
        resultado = cantidad * 1.13;
        }
      else if (tipo === "dol_eu")
        {
        resultado = cantidad / 1.13;
        }
      return document.formulario.resultado.value = Number(Math.round(resultado+'e2')+'e-2');
    }
}