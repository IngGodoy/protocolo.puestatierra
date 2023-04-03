const arrayPuestaTierra=[]; // array con la lista puesta a tierra
let btnAgregar=document.getElementById("buttonAdd"); // leer el botón de agregar puesta a tierra del DOM
let valorMedio=document.getElementById("buttonValorMedio"); // leer el botón de agregar PAT
let borrar=document.getElementById("buttonBorrar"); // leer el botón borrar array PAT
let ordenar=document.getElementById("buttonOrdenar"); // leer el botón para ordenar la lista PAT
let imprimirLista=document.getElementById("buttonImprimir"); // leer el botón para ordenar la lista PAT
// funcion para capturar los datos de los objetos puesta a tierra
function crearObjeto(){
    let finalizar=1;
    let nombrePuestaTierra; //Nombre de la puesta a tierra
    let valorPuestaTierra; // valor de la resistencia de puesta a tierra
    let conexionTablero; // indicacion por parte del usuario si la PAT esta conectada al tablero general
   //ciclo para agregar puestas a tierra
    do{
        nombrePuestaTierra=prompt("Indique el nombre de la puesta a tierra");
        valorPuestaTierra=Number(prompt("Indique el valor de la resistencia a tierra en Ohm"));
        conexionTablero=prompt("si la puesta a tierra está conectado al tablero general coloque la SI en caso contrario coloque NO");
        arrayPuestaTierra.push(new PuestaTierra(nombrePuestaTierra,valorPuestaTierra,conexionTablero));
        finalizar=prompt("Si desea finalizar presione la tecla 1 en caso contrario presione cualquier otra tecla");
    } while(finalizar!=1);
    alert("Se cargaron los valores de puesta a tierra de forma exitosa...");
};
function imprimir(){
    console.log(arrayPuestaTierra);
}
//evento click de agregar puesta a tierra
buttonAdd.addEventListener("click",()=>{
    crearObjeto();
    imprimir();   
 });
 // evento valor medio
 valorMedio.addEventListener("click",()=>{
    let acumulador=0;
    arrayPuestaTierra.forEach((element)=>{
        acumulador=element.valorPuestaTierra+acumulador;
    })
    let valorMedio=acumulador/arrayPuestaTierra.length;
    alert(" el valor medio de las resistencias de puesta a tierra es: "+valorMedio+" Ohm");
 });
 // evento borrar
 borrar.addEventListener("click",()=>{
    let i=0;
    let finIteracion=arrayPuestaTierra.length;
    console.log(finIteracion);
    for(i=0;i<finIteracion;i++){
        arrayPuestaTierra.pop();
       
    };
    console.log(arrayPuestaTierra);
    alert("lista de puesta a tierra borrada con exito");
 });
 // evento ordenar
 ordenar.addEventListener("click",()=>{
    arrayPuestaTierra.sort((a,b)=>{
    if (a.valorPuestaTierra>b.valorPuestaTierra){
       return 1;
    } else if (a.valorPuestaTierra<b.valorPuestaTierra){
        return -1;
     } else{
        return 0;
     }
    });  
    console.log(arrayPuestaTierra);
 });
 // evento imprimir
 imprimirLista.addEventListener("click",()=>{
    const puestaTierraOk= arrayPuestaTierra.filter((element)=>element.valorPuestaTierra<40);
    console.log(puestaTierraOk);
    const puestaTierraBad= arrayPuestaTierra.filter((element)=>element.valorPuestaTierra>=40);
    console.log(puestaTierraBad);
    let imprimirOk="";
    let imprimirBad="";
    // imprimir PAT OK
    puestaTierraOk.forEach((element)=>{
        imprimirOk= imprimirOk+" " +element.nombrePuestaTierra;
    })
    alert("Puestas a tierra con valor menor a 40 Ohm (si cumplen): "+imprimirOk);
    // imprimir PAT BAD
    puestaTierraBad.forEach((element)=>{
        imprimirBad= imprimirBad+" " +element.nombrePuestaTierra;
    })
    alert("Puestas a tierra con valor mayor a 40 Ohm (no cumplen): "+imprimirBad);
 });