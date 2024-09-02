//Estilos barra de inicio
let list = document.querySelectorAll(".navigation li");

function activelink(){
    list.forEach(element => {
        ClipboardItem.classlist.remove("hovered");
    });
    this.classlist.add("hovered")
}
list.forEach(item => item.addEventListener("mouseover", activelink))
let toggle = document.querySelector(".toggle")
let navigation = document.querySelector(".navigation")
let main = document.querySelector(".main")
console.log(toggle, navigation, main)
toggle.onclick = function(){
    navigation.classList.toggle("active");
    main.classList.toggle("active");
}



// Con esta funcion creamos un texto con la fecha en el sigueinte formato 2/9/2024
function Fecha (){
let Hora_Actual = new Date()
 const dia =   Hora_Actual.getDate()
 const mes = Hora_Actual.getMonth() +1
 const year = Hora_Actual.getFullYear()
 let fechaActual = dia + "/" +mes +"/"+ year
 return fechaActual
}
//Esta funcion captura la hora en un momento especifico
 function Registro_Hora(){
    let Hora_Actual = new Date()
    return Hora_Actual
 }
//Esta funcion recibe 2 stings de timepo de registro de enrtrada los convierte y me da la diferencia en minutos 
function Diferencia_Entrada_Salida(Tentrada , Tsalida){
   let Entrada = new Date(Tentrada)
   let Salida = new Date(Tsalida)
   const diferencia = Salida - Entrada
   const diferenciaMinutos = Math.floor(diferencia / (1000 * 60));
   console.log(diferenciaMinutos)
   return diferenciaMinutos
}

//Funcio de hora actual en formato correcto esta fubncion recibe el string almacenado en la consiola lo trasnfroma  y me devuelve otro string con la hora actualizada 
function horaFormateada(fechaString) {
    let fecha = new Date(fechaString);
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    return `${horas}:${minutos}`;
}

console.log(Registro_Hora())
    



