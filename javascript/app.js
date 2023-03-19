let btnAgregar=document.getElementById("buttonAdd"); // leer el botón de agregar puesta a tierra del DOM
//evento click de agregar puesta a tierra
buttonAdd.addEventListener("click",()=>{
    let finishi=1;
    let nameGround; //Nombre de la puesta a tierra
    let valueGround; // valor de la resistencia de puesta a tierra
    let groundOk=""; // acumulador de nombre de las puestas a tierra OK
    let groundBad=""; // acumulador de nombre de las puestas a tierra malas
    let averageGround=0; //acumulador de valores PAT
    let counterGroubd=0; // contador de cantidad de puesta a tierra
    //ciclo para agregar puestas a tierra
    do{
        nameGround=prompt("Indique el nombre de la puesta a tierra");
        valueGround=Number(prompt("Indique el valor de la resistencia a tierra en Ohm"));
        if (valueGround<=40){
            alert("la puesta a tierra si cumple");
            groundOk= groundOk+" "+nameGround;

        } else{
            alert("la puesta a tierra no cumple");
            groundBad= groundBad+" "+nameGround;
        }
        finishi=prompt("Si desea finalizar presione la tecla 1 en caso contrario presione cualquier otra tecla");
        averageGround= valueGround+averageGround;
        counterGroubd++;
    } while(finishi!=1);
   alert("Se cargaron los valores de puesta a tierra de forma exitosa...");
   alert("Puesta a tierras con lecturas dentro de la Norma: "+groundOk);
   alert("Puesta a tierras con lecturas fuera de Norma: "+groundBad);
   alert("el valor medio de todas las resistencia a tierra es: "+calculateAverage(averageGround,counterGroubd)+"ohm");
   
});
// funcion para calcular el valor medio de las resistencias a tierra
function calculateAverage(averageGround,counterGroubd){
    let printGround=averageGround/counterGroubd;
    return printGround;
};