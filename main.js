
const form = document.getElementById("form-clima");
const input = document.getElementById("busqueda");
const tarjetaClima = document.getElementById("seccion-clima");

form.addEventListener("submit", (event) => {

    event.preventDefault();             // Evitamos que se envíe el form

    const ciudad = input.value.trim();  // Quitamos espacios en blanco
    
    if (ciudad) { fetchClima(ciudad); } else { alert("Ingrese un nombre de ciudad"); }
});


function fetchClima(ciudad) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=1c2068f68dd955543784abc4d3496e9c`)
        
    .then((response) => response.json())
        
    .then((data) => funTarjetaClima(data))

}

function funTarjetaClima(data) {

    // Creo el div del cuadro con contenido
    const cuadro_clima = document.createElement("div");
    cuadro_clima.className = "cuadro-clima";

    // Selecciono y engancho el div a la seccion de clima, previa limpieza
    tarjetaClima.innerHTML = "";
    tarjetaClima.className = "seccion-clima";   // Le agrego la clase para el style
    tarjetaClima.appendChild(cuadro_clima);


    // Seccion icono del clima - es un asco la lógica pero tengo errores al obtenerlo de la API
    let imgWeather; 

    if (data.weather[0].description === "clear sky") {

        imgWeather = "img/soleado.png";

    } else if 
    (data.weather[0].description === "few clouds" || data.weather[0].description === "scattered clouds") 
    {
        imgWeather = "img/dispersas.png";

    } else if (data.weather[0].description === "broken clouds" || data.weather[0].description === "shower rain" || data.weather[0].description === "shower rain")
    {
        imgWeather = "img/nublado.png";

    } else if (data.weather[0].description === "rain")
    {
        imgWeather = "img/lluvia.png";

    } else if (data.weather[0].description === "thunderstorm") {

        imgWeather = "img/tormenta.png";
    }
/* 
snow
mist 
*/

    // Inserto datos del clima obtenidos por la API
    cuadro_clima.innerHTML = 
    `
        <div class="ciudad-clima">
            <p class="nombre-clima">${data.name}</p>
            <img class="icono-clima" src="${imgWeather}" alt="icono del clima">
        </div>
        <div class="datos-clima">
            <p class="tipo-clima">Tiempo: ${data.weather[0].description}</p>
            <p class="temp-clima">Temperatura: ${(data.main.temp - 273.15).toFixed(1)} °C</p>
            <p class="hum-clima">Humedad: ${data.main.humidity}%</p>
        </div>
    `;

    
}


