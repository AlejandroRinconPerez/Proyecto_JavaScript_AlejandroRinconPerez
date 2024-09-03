//Estilos barra de inicio
let list = document.querySelectorAll(".navigation li");

function activelink() {
  list.forEach((element) => {
    ClipboardItem.classlist.remove("hovered");
  });
  this.classlist.add("hovered");
}
list.forEach((item) => item.addEventListener("mouseover", activelink));
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
console.log(toggle, navigation, main);
toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Con esta funcion creamos un texto con la fecha en el sigueinte formato 2/9/2024
function Fecha() {
  let Hora_Actual = new Date();
  const dia = Hora_Actual.getDate();
  const mes = Hora_Actual.getMonth() + 1;
  const year = Hora_Actual.getFullYear();
  let fechaActual = dia + "/" + mes + "/" + year;
  return fechaActual;
}
//Esta funcion captura la hora en un momento especifico
function Registro_Hora() {
  let Hora_Actual = new Date();
  return Hora_Actual;
}
//Esta funcion recibe 2 stings de timepo de registro de enrtrada los convierte y me da la diferencia en minutos
function Diferencia_Entrada_Salida(Tentrada, Tsalida) {
  let Entrada = new Date(Tentrada);
  let Salida = new Date(Tsalida);
  const diferencia = Salida - Entrada;
  const diferenciaMinutos = Math.floor(diferencia / (1000 * 60));
  console.log(diferenciaMinutos);
  return diferenciaMinutos;
}

//Funcio de hora actual en formato correcto esta fubncion recibe el string almacenado en la consiola lo trasnfroma  y me devuelve otro string con la hora actualizada
function horaFormateada(fechaString) {
  let fecha = new Date(fechaString);
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  return `${horas}:${minutos}`;
}


function reloj (){
    let hora = document.querySelector("#Hora_Vivo")
    let fecha = document.querySelector("#Fecha_Vivo")
    fecha.textContent = Fecha()
    hora.textContent =horaFormateada(Registro_Hora())
    setTimeout(reloj, 60000)
}
reloj ()


//Con esta funcion llamamos a una base de datos que vamos a precargar al locale storage
//co el objetivo de que podamos visualizar los datos

const url = "./Parking.json";

async function obtener(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
}

//Con esta fubncion subo los elemtos al locale storege y podemos empezar a hacer nuestras funciones del Dom

async function Carga_Datos() {
  const precarga = await obtener(url);
  if (precarga) {
    localStorage.setItem("Park", JSON.stringify(precarga));
    console.log("Datos almacenados correctamente en localStorage");
  } else {
    console.error("No se pudieron obtener los datos");
  }
}

//Ahota vamos a intentar el ingreso de un vehiculo

let button_ingreso = document.querySelector("#button_nuevoVehiculo");
button_ingreso.addEventListener("click", Nuevoingreso);

document
  .getElementById("input_nuevovehiculo")
  .addEventListener("input", function () {
    this.value = this.value.toUpperCase();
  });

// Esta funcion puede ser usada para validar un input de placa mediante expresiones regulares
function validarPlaca(textoPlaca, tipoVehiculo) {
  const regexCarro = /^[A-Z]{3}\d{3}$/;
  const regexMoto = /^[A-Z]{3}\d{2}[A-Z]{1}$/;

  let esValido = false;

  if (tipoVehiculo === "carro" && regexCarro.test(textoPlaca)) {
    esValido = true;
  } else if (tipoVehiculo === "moto" && regexMoto.test(textoPlaca)) {
    esValido = true;
  }
  return esValido;
}

function asignar_puesto(memoria , tipoVehiculo) {
    let disponibilidad =""
    console.log(tipoVehiculo)
   if (tipoVehiculo === "carro"){
    disponibilidad = memoria.puestos.carros
   }else if(tipoVehiculo === "moto"){
    disponibilidad = memoria.puestos.motos
   }

   for (let element of disponibilidad) {
    if (element.disponible === true) { 
      element.disponible = false; 
      return element.id; 
    }return 3
  }
  
}

function Nuevoingreso() {
  let text_nuevovehiculo = document.getElementById("input_nuevovehiculo").value;
  let tipoVehiculo;
  if (document.getElementById("NuevoCarro").checked) {
    tipoVehiculo = document.getElementById("NuevoCarro").value;
  } else if (document.getElementById("NuevaMoto").checked) {
    tipoVehiculo = document.getElementById("NuevaMoto").value;
  }
  if (!validarPlaca(text_nuevovehiculo, tipoVehiculo)) {
    alert("Placa inválida, intente de nuevo.");
    return
  }
  // Esta zona limpia los input despues del evento click
  document.getElementById("input_nuevovehiculo").value = "";
  document.getElementById("NuevoCarro").checked = false;
  document.getElementById("NuevaMoto").checked = false;
  

  let memoria = JSON.parse(localStorage.getItem("Parking"));
  if (!memoria) {
    memoria = {
      vehiculos: {},
      puestos: {
        carros: [
          { id: 1, disponible: true },
          { id: 2, disponible: true },
          { id: 3, disponible: true },
          { id: 4, disponible: true },
          { id: 5, disponible: true },
          { id: 6, disponible: true },
          { id: 7, disponible: true },
          { id: 8, disponible: true },
          { id: 9, disponible: true },
          { id: 10, disponible: true },
          { id: 11, disponible: true },
          { id: 12, disponible: true },
          { id: 13, disponible: true },
          { id: 14, disponible: true },
          { id: 15, disponible: true },
          { id: 16, disponible: true },
          { id: 17, disponible: true },
          { id: 18, disponible: true },
          { id: 19, disponible: true },
          { id: 20, disponible: true },
        ],
        motos: [
          { id: 1, disponible: true },
          { id: 2, disponible: true },
          { id: 3, disponible: true },
          { id: 4, disponible: true },
          { id: 5, disponible: true },
          { id: 6, disponible: true },
          { id: 7, disponible: true },
          { id: 8, disponible: true },
          { id: 9, disponible: true },
          { id: 10, disponible: true },
          { id: 11, disponible: true },
          { id: 12, disponible: true },
          { id: 13, disponible: true },
          { id: 14, disponible: true },
          { id: 15, disponible: true },
          { id: 16, disponible: true },
          { id: 17, disponible: true },
          { id: 18, disponible: true },
          { id: 19, disponible: true },
          { id: 20, disponible: true },
        ],
      },
    };
    localStorage.setItem("Parking", JSON.stringify(memoria));
  }
  
  if (memoria.vehiculos[text_nuevovehiculo]) {
    if (memoria.vehiculos[text_nuevovehiculo].ingresado === true) {
      alert("Vehículo ya ingresado. Por favor, déjelo salir antes de ingresar nuevamente.");
      return;
    }}
    console.log("aca vamos")
    let puesto = asignar_puesto(memoria, tipoVehiculo);
    if (puesto == 3) {
      alert("No hay Cupo ");
      return;
    }
    
  memoria.vehiculos[text_nuevovehiculo] = {};
  memoria.vehiculos[text_nuevovehiculo].tipo = tipoVehiculo;
  memoria.vehiculos[text_nuevovehiculo].ingresado = true;
  memoria.vehiculos[text_nuevovehiculo].visitas = [];
  
  let visita = {
    entrada: Registro_Hora(),
    salida: "",
    tiempo: "",
    costo: "",
    puesto: puesto
  };
  memoria.vehiculos[text_nuevovehiculo].visitas.push(visita);

  localStorage.setItem("Parking", JSON.stringify(memoria));
}
