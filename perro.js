
mostrar.addEventListener('click', function () { 

  
    fetch(`https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=1`)
      .then(respuesta => respuesta.json())
      .then(datos =>{

        console.log(datos)
       
        var out = "===========Curiosidad========== "
        out = out + JSON.stringify(datos.facts[0])
        document.getElementById("curiosidad").innerText = out;
      })
  }
)