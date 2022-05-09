let lon
let lat
window.addEventListener('load',()=> {
    if(navigator.geolocation9){
        navigator.geolocation.getCurrentPosition(posicion =>{
            console.log(posicion.coords.latitude)
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e5c4b7a7ae70a6c41ca05733f3807ab7`

            console.log(url)

            fetch(url)
                .then (response => { return response.json()})
                .then (data =>{
                    console.log(data.main.temp)
                }
                    
                    )
        })
    }
}


)