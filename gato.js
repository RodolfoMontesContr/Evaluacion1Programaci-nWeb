mostrargato.addEventListener('click', function () { 

  
    fetch(`https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1`)
      .then(respuesta => respuesta.json())
      .then(datos =>{

        console.log(datos)
       
        var out = "===========Curiosidad========== "
        out = out + JSON.stringify(datos.text)
        document.getElementById("curiosidadgato").innerText = out;
      })
  }
)