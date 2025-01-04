const form = document.getElementById("form-clima");
const input = document.getElementById("busqueda");
const tarjetaClima = document.getElementById("seccion-clima");

form.addEventListener("submit", (event) => {

    event.preventDefault();             // Evitamos que se envíe el form

    const ciudad = input.value.trim();  // Quitamos espacios en blanco
    
    // Si ciudad es un input válido, chequeamos si existe en la API
    if (ciudad) { fetchClima(ciudad); } else { alert("INGRESE UN NOMBRE DE CIUDAD"); }

});


function fetchClima(ciudad) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=1c2068f68dd955543784abc4d3496e9c`)
            
    .then((response) => {

        // .ok es un bool que devuelve true si el código de estado HTTP de la respuesta está en el rango 200-299. False caso contrario
        if (!response.ok) { throw new Error("Ciudad no encontrada"); }
                
        return response.json(); })

    .then((data) => renderTarjetaClima(data))
            
    .catch((error) => { alert("COULDN'T FIND THE CITY. TRY AGAIN"); });
}
    

function renderTarjetaClima(data) {

    // Creo el div del cuadro con contenido
    const cuadro_clima = document.createElement("div");
    cuadro_clima.className = "cuadro-clima";

    // Selecciono y engancho el div a la seccion de clima, previa limpieza
    tarjetaClima.innerHTML = "";
    tarjetaClima.className = "seccion-clima";   // Le agrego la clase para el style
    tarjetaClima.appendChild(cuadro_clima);

    // Sección icono del clima - llamamos a la función que devuelve el icono
    let imgWeather = iconoClima(data.weather[0].description);


    // Insertamos datos del clima obtenidos por la API
    cuadro_clima.innerHTML = 
    `
        <div class="ciudad-clima">
            <p class="nombre-clima">${data.name}, ${data.sys.country}</p>
            <img class="icono-clima" src="${imgWeather}" alt="Icono de ${data.weather[0].description}">
        </div>
        <div class="datos-clima">
            <p class="tipo-clima">Climate: ${data.weather[0].description}</p>
            <p class="temp-clima">Temperature: ${(data.main.temp - 273.15).toFixed(1)} °C</p>
            <p class="hum-clima">Humidity: ${data.main.humidity}%</p>
        </div>
    `;
}


function iconoClima(descripcion) {

    // Mapa de iconos del clima - nombres obtenidos de la API
    const mapaIconosClima = {

    "clear sky": "img/soleado.png",
    "few clouds": "img/dispersas.png",
    "scattered clouds": "img/dispersas.png",
    "broken clouds": "img/nublado.png",
    "overcast clouds": "img/nublado.png",
    "light rain": "img/lluvia.png",
    "moderate rain": "img/lluvia.png",
    "shower rain": "img/nublado.png",
    "rain": "img/lluvia.png",
    "thunderstorm": "img/tormenta.png",
    "snow": "img/nieve.png",
    "mist": "img/niebla.png"
    };

    return mapaIconosClima[descripcion] || "img/default.png";

}
