
mostrar.addEventListener('click', function () { 

  
    fetch(`https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1`)
      .then(respuesta => respuesta.json())
      .then(datos =>{

        console.log(datos)
       
        var out = "===========Curiosidad========== "
        out = out + JSON.stringify(datos[0].fact)
        document.getElementById("curiosidad").innerText = out;
      })
  }
)