let arrayPuestaTierra=[]; // array con la lista puesta a tierra
let btnAgregar=document.getElementById("buttonAdd"); // leer el botón de agregar puesta a tierra del DOM
let valorMedio=document.getElementById("buttonValorMedio"); // leer el botón de agregar PAT
let borrar=document.getElementById("buttonBorrar"); // leer el botón borrar array PAT
let ordenar=document.getElementById("buttonOrdenar"); // leer el botón para ordenar la lista PAT
let imprimirLista=document.getElementById("buttonImprimir"); // leer el botón para ordenar la lista PAT
let imprimirTexto=document.getElementById("imprimirDom"); //leer etiqueta del DOM para imprimir
// funcion para capturar los datos de los objetos puesta a tierra
function crearObjeto(){
   traerLocalStore();
    //leer datos del DOM
    let nombrePuestaTierra=document.getElementById("nombrePat").value; //Nombre de la puesta a tierra
    let valorPuestaTierra=Number(document.getElementById("valorPat").value); // valor de la resistencia de puesta a tierra
    let conexionPat=Number(document.getElementById("conexionPat").value); // indicacion por parte del usuario si la PAT esta conectada al tablero general
    arrayPuestaTierra.push(new PuestaTierra(nombrePuestaTierra,valorPuestaTierra,conexionPat));
    guardarLocalStore();
    alert("Se cargaron los valores de puesta a tierra con nombre: " +nombrePuestaTierra+"  valor:  "+valorPuestaTierra+"de forma exitosa...");
    console.log(conexionPat); 
};
function guardarLocalStore(){
   // guardar la array en el local store cada vez que alla un cambio
   localStorage.setItem("arrayPat",JSON.stringify(arrayPuestaTierra));
}
function traerLocalStore(){
   // acceder a los datos guadados en el localstore
   arrayPuestaTierra=JSON.parse(localStorage.getItem("arrayPat"));
   console.log(arrayPuestaTierra);
}
function imprimir(texto){ 
   let p=document.createElement("p"); //crear elemento
   p.innerHTML=texto; // agregar contenido en el elemento
   imprimirTexto.appendChild(p); // agregar el elemento al parrafó 
}
// funcion para darle reset al texto del DOM
function reset(){
   const hijos = imprimirTexto.children; //imprimirTexto es el padre
   if (hijos.length!=0){
      for (let i = 0; i < hijos.length+1; i++) {
         imprimirTexto.removeChild(hijos[0]);
       }  
   }
}
//evento click de agregar puesta a tierra
buttonAdd.addEventListener("click",()=>{
    crearObjeto();
    reset(); // reset al DOM ya que cambio la lista PAT
    console.log(arrayPuestaTierra);
 });
 // evento valor medio
 valorMedio.addEventListener("click",()=>{
    traerLocalStore();
    let acumulador=0;
    arrayPuestaTierra.forEach((element)=>{
        acumulador=element.valorPuestaTierra+acumulador;
    })
    let valorMedio=acumulador/arrayPuestaTierra.length;
    let texto= " el valor medio de las resistencias de puesta a tierra es: "+valorMedio.toFixed(1)+" Ohm";
    reset();
    imprimir(texto);
    
 });
 // evento borrar
 borrar.addEventListener("click",()=>{
   arrayPuestaTierra=[];
    guardarLocalStore();
    reset();
 });
 // evento ordenar
 ordenar.addEventListener("click",()=>{
    traerLocalStore();
    arrayPuestaTierra.sort((a,b)=>{
    if (a.valorPuestaTierra>b.valorPuestaTierra){
       return 1;
    }
    if (a.valorPuestaTierra<b.valorPuestaTierra){
        return -1;
     }
        return 0;
    });  
    guardarLocalStore();
    reset();
    let texto="";
    arrayPuestaTierra.forEach((element)=>{
      texto= texto+" " +element.nombrePuestaTierra+" ("+element.valorPuestaTierra+"Ohm)  /   ";
    })
    imprimir("Orde de las Puesta a tierra en funcón de su resistencia de menor a mayor:");
    imprimir(texto);
 });
 // evento imprimir
 imprimirLista.addEventListener("click",()=>{
    traerLocalStore();
    const puestaTierraOk= arrayPuestaTierra.filter((element)=>element.valorPuestaTierra<40);
    console.log(puestaTierraOk);
    const puestaTierraBad= arrayPuestaTierra.filter((element)=>element.valorPuestaTierra>=40);
    console.log(puestaTierraBad);
    let imprimirOk="";
    let imprimirBad="";
    // reset del DOM antes de volver a imprimir
    reset();
    // imprimir PAT OK
    puestaTierraOk.forEach((element)=>{
        imprimirOk= imprimirOk+" " +element.nombrePuestaTierra;
    });
    imprimirOk= "Puestas a tierra con valor menor a 40 Ohm (si cumplen): "+imprimirOk;
    imprimir(imprimirOk);
    // imprimir PAT BAD
    puestaTierraBad.forEach((element)=>{
        imprimirBad= imprimirBad+" " +element.nombrePuestaTierra;
    })
    imprimirBad="Puestas a tierra con valor mayor a 40 Ohm (no cumplen): "+imprimirBad;
    imprimir(imprimirBad);
 });