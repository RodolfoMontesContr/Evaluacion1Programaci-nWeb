window.addEventListener('load',()=> {
let lon
let lat
let temperaturaValor = document.getElementById('temperatura')
let temperaturadescrip = document.getElementById('temperatura-descripcion')
let ciudad = document.getElementById('ciudadactual')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e5c4b7a7ae70a6c41ca05733f3807ab7`


            console.log(url)
            console.log("hola")

        })
    }
}


)

/*window.addEventListener('load',()=>{
    if (navigator)
}

)

var getIP = 'http://ip-api.com/json/';
var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
$.getJSON(getIP).done(function(location) {
    $.getJSON(openWeatherMap, {
        lat: location.lat,
        lon: location.lon,
        units: 'metric',
        appid: 'e5c4b7a7ae70a6c41ca05733f3807ab7'
    }).done(function(weather) {
        console.log(weather)
        console.log(location)
    })
})
window.addEventListener('load',()=>{
var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
if (window.navigator && window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(function(position) {
        console.log(positon)
        })
    }
})*/
