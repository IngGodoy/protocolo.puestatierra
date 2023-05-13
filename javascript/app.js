const arrayPuestaTierra=[]; // array con la lista puesta a tierra
let valorMedio=document.getElementById("buttonValorMedio"); // leer el botón de agregar PAT
let borrar=document.getElementById("buttonBorrar"); // leer el botón borrar array PAT
let mostrarTabla=document.getElementById("mostrarLista"); 
let ordenar=document.getElementById("buttonOrdenar"); // leer el botón para ordenar la lista PAT
let imprimirLista=document.getElementById("buttonImprimir"); // leer el botón para ordenar la lista PAT
let imprimirTexto=document.getElementById("imprimirDom"); //leer etiqueta del DOM para imprimir
let form=document.getElementById("form"); // leer formulario
// funcion para capturar los datos de los objetos puesta a tierra
function crearObjeto(){
    //leer datos del DOM (datos de PAT)
    let nombrePuestaTierra=document.getElementById("nombrePat").value; //Nombre de la puesta a tierra
    let valorPuestaTierra=Number(document.getElementById("valorPat").value); // valor de la resistencia de puesta a tierra
    let conexionPat=Number(document.getElementById("conexionPat").value); // indicacion por parte del usuario si la PAT esta conectada al tablero general
    arrayPuestaTierra.push(new PuestaTierra(nombrePuestaTierra,valorPuestaTierra,conexionPat));
    guardarLocalStore(arrayPuestaTierra);
    swal ( {
      title: "Valor de Puesta a tierra",
      text:"con nombre "+nombrePuestaTierra+" cargado con exito",
      icon:"success"
    });
    crearTablaPat();
};
function crearTablaPat() {
   const tablaPat = document.createElement("table");
   tablaPat.classList.add("tablePat");
   tablaPat.innerHTML = `
   <tr>
   <th>Número</th>
   <th>Nombre Puesta a Tierra</th>
   <th>Valor resistencia a tierra (Ohm)</th>
   </tr>
   `;
   let i = 0;
   arrayPuestaTierra.forEach((element)=>{
      let tr = document.createElement("tr");
      tr.innerHTML = `
         <td>${i}</td>
         <td>${element.nombrePuestaTierra}</td>
         <td>${element.valorPuestaTierra}</td>
      `;
      tablaPat.appendChild(tr);
      i++;
   });
   imprimirTexto.appendChild(tablaPat);
   botonEliminarUno();
   
}
function botonEliminarUno() {
   let div = document.createElement("div");
   let label = document.createElement("label");
   label.innerHTML = "Indique el número de la PAT a eliminar";
   label.setAttribute("for", "eliminarPat");
   let input = document.createElement("input");
   input.setAttribute("type", "text");
   input.setAttribute("name", "valorPat"); 
   input.setAttribute("placeholder", "número PAT");
   input.id="indiceEliminar";
   let botonEliminar = document.createElement("button");
   botonEliminar.innerHTML = "Eliminar PAT";
   botonEliminar.id = "eliminarPat";
   div.appendChild(label);
   div.appendChild(input);
   div.appendChild(botonEliminar);
   imprimirTexto.appendChild(div);
   let botonEliminarElemento=document.getElementById("eliminarPat");
    // evento eliminar un elemento de la lista PAT
botonEliminarElemento.addEventListener("click", () => {
   let indice = Number(document.getElementById("indiceEliminar").value); // leer el indice del elemento a eliminar 
   if (indice >= 0 && indice <= (arrayPuestaTierra.length-1)) {
      
      arrayPuestaTierra.splice(indice, 1); // eliminar el elemento de la lista PAT
      guardarLocalStore(arrayPuestaTierra);
      reset();
      swal({
         title: "Dato eliminado",
         text: "se eliminó un elemento de la lista de Puesta a tierra",
         icon: "warning",
       });
     
   } else{
     swal({
       title: "Error",
       text: "Indicar un número valido de puesta a Tierra",
       icon: "warning",
     });
   }
 }); 
 };
function guardarLocalStore(element){
   // guardar la array en el local store cada vez que alla un cambio
   let datosLocalStore=element;
   localStorage.setItem("arrayPat",JSON.stringify(datosLocalStore));
}
function traerLocalStore(){
   // verificar si hay datos en el localStore
   if (localStorage.length > 0 && localStorage!=null){
      let copiaLocalStore = JSON.parse(localStorage.getItem("arrayPat"));
      //verificar si array PAT es distinta de la lista local Store
      if (copiaLocalStore.length!=arrayPuestaTierra.length){
       //copiar la array del local store y cargar en la array PAT
       for (let i = 0; i < copiaLocalStore.length; i++) { 
         arrayPuestaTierra.push(copiaLocalStore[i]);
       }
      }
    }
}
function imprimir(texto){ 
   let p=document.createElement("p"); //crear elemento
   p.innerHTML=texto; // agregar contenido en el elemento
   imprimirTexto.appendChild(p); // agregar el elemento al parrafó 
}
// funcion para darle reset al texto del DOM
function reset(){
      while (imprimirTexto.firstChild){
         imprimirTexto.removeChild(imprimirTexto.firstChild);
       }   
}
function borrarArray(array) {
   while (array.length!=0) {
     array.pop();
   }
   return array;

 }
 function mensajeArrayVacio(){
   swal ( {
      title: "Error",
      text:"No hay datos que procesar",
      icon:"warning"
    });
 }
//evento click de agregar puesta a tierra
form.addEventListener("submit",(element)=>{
    element.preventDefault();
    reset();
    crearObjeto();
 });
 // evento valor medio
 valorMedio.addEventListener("click",()=>{
    if(arrayPuestaTierra.length>0){
      let acumulador=0;
       arrayPuestaTierra.forEach((element)=>{
       acumulador=element.valorPuestaTierra+acumulador;
       }) 
    let valorMedio=acumulador/arrayPuestaTierra.length;
    let texto= " el valor medio de las resistencias de puesta a tierra es: "+valorMedio.toFixed(1)+" Ohm";
    reset();
    imprimir(texto);
    } else{
      swal ( {
         title: "Error",
         text:"No hay datos que procesar",
         icon:"warning"
       });
    }   
 });
 // evento borrar todo la lista
 borrar.addEventListener("click",()=>{
    if(arrayPuestaTierra.length>0){
      borrarArray(arrayPuestaTierra);
      guardarLocalStore(arrayPuestaTierra);
      reset();
      swal ( {
        title: "Datos borrados",
        text:"Todos los valores de puesta a tierra fueron borrados",
        icon:"warning"
      });
    } else{
      mensajeArrayVacio(); //
    } 
 });
 // evento borrar un elemento o mostrar tabla
 mostrarTabla.addEventListener("click",()=>{
   if(arrayPuestaTierra.length>0){
      reset();
      crearTablaPat();
   }else{
      swal ( {
         title: "Error",
         text:"No hay datos que procesar",
         icon:"warning"
       });
   }
});
 // evento ordenar
 ordenar.addEventListener("click",()=>{
    if(arrayPuestaTierra.length>0){
      arrayPuestaTierra.sort((a,b)=>{
         if (a.valorPuestaTierra>b.valorPuestaTierra){
            return 1;
         }
         if (a.valorPuestaTierra<b.valorPuestaTierra){
             return -1;
          }
             return 0;
         });  
         reset();
         let texto="";
         arrayPuestaTierra.forEach((element)=>{
           texto= texto+" " +element.nombrePuestaTierra+" ("+element.valorPuestaTierra+"Ohm)  /   ";
         })
         imprimir("Orde de las Puesta a tierra en funcón de su resistencia de menor a mayor:");
         imprimir(texto);
    } else{
      mensajeArrayVacio();
    }
 });
 // evento imprimir
 imprimirLista.addEventListener("click",()=>{
    if(arrayPuestaTierra.length>0){
      const puestaTierraOk= arrayPuestaTierra.filter((element)=>element.valorPuestaTierra<40);
    const puestaTierraBad= arrayPuestaTierra.filter((element)=>element.valorPuestaTierra>=40);
    let imprimirOk="";
    let imprimirBad="";
    let contadorOK=0;
    let contadorBad=0;
    // reset del DOM antes de volver a imprimir
    reset();
    // imprimir PAT OK
    puestaTierraOk.forEach((element)=>{
      if(contadorOK>0){
         imprimirOk= imprimirOk+", " +element.nombrePuestaTierra;
      } else {
         imprimirOk= element.nombrePuestaTierra;
      }
      contadorOK++; 
    });
    if(imprimirOk!=""){
      imprimirOk= " * Las puestas a tierra: " +imprimirOk+" presentan un valor de resistencia a tierra que cumplen con las exigencias del Reglamento AEA Tabla 771.3.1 que establece un valor admisible máximo de 40 ohms. Sin Observaciones";
      imprimir(imprimirOk);
    }
    
    // imprimir PAT BAD
    puestaTierraBad.forEach((element)=>{
      if(contadorBad>0){
         imprimirBad= imprimirBad+", " +element.nombrePuestaTierra;
      } else {
         imprimirBad= element.nombrePuestaTierra;
      }
        contadorBad++; 
    })
    if(imprimirBad!=""){
      imprimirBad=" * Las puestas a tierra: " +imprimirBad+" presentan un valor de resistencia a tierra que NO cumplen con las exigencias del Reglamento AEA Tabla 771.3.1 que establece un valor admisible máximo de 40 ohms. Deben reemplazarse las jabalinas de puesta a tierra anteriormente mencionadas por unas nuevas que cumplan con las exigencias del Reglamento AEA Tabla 771.3.1 que establece un valor admisible máximo de 40 ohms.";
      imprimir(imprimirBad);
    }
    // verificar si todas las PAT están equipotencializadas, si es una sola PAT ignorar
    if(arrayPuestaTierra.length>1){
      let verificadorConexionPat=arrayPuestaTierra.some((element)=>element.conexionPat!=0);
      if(verificadorConexionPat==true){
         imprimir("* Hay puestas a tierras que no se encuentran equipotencializadas, se debe revisar la conexión de todas las puestas a tierra de tal forma que resulten vinculdas.");
      }else{
         imprimir("* Todas las puestas a tierras se encuentran equipotencializadas. Sin Observaciones.");
      }
    }
    
    }else{
      mensajeArrayVacio();
    }
 });
 // evento de carga de página recuperar la array PAT
 document.addEventListener('DOMContentLoaded', ()=> {
   traerLocalStore();
   callApi();
 });

 