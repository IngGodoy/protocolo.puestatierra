let divClima=document.getElementById("resultadoClima");
function callApi(){
    const apiId="7f475578f6fc5c6b19b558d779b6e597";
    const cuidad="Buenos Aires"
    const pais="AR"
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${cuidad},${pais}&appid=${apiId}`; 
    fetch(url)
        .then(datosApi=>{
           
            return datosApi.json(); //Convertir la respuesta a un objeto JSON  
        })
        .then(datosApiJson=>{
            datosClimaDesectructurar(datosApiJson); // extraer los datos del clima del objeto que nos dio la API
        })
        .catch(error => {
            const contenedor=document.createElement("div");
            contenedor.innerHTML = "error no se pudo cargar el clima";
            divClima.appendChild(contenedor);
        });

        
};
function datosClimaDesectructurar(datosClima){
    const {name,main:{temp},weather:[array]}=datosClima; //pais, temperatura, array para el incono
    temperaturaCelsius=parseInt(temp-273.15);
    const contenedor=document.createElement("div");
    contenedor.innerHTML = `
        <h3>Clima en ${name}</h3>
        <img src="https://openweathermap.org/img/wn/${array.icon}@2x.png" alt="icono del clima">
        <h2>${temperaturaCelsius}°C</h2>
    `;
    divClima.appendChild(contenedor);
   };
callApi();

