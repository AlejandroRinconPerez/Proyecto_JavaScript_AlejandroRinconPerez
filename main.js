//Estilos barra de inicio
let list = document.querySelectorAll(".navigation li");

function activelink() {
    list.forEach((element) => {
      element.classList.remove("hovered"); 
    });
    this.classList.add("hovered");
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
 



function formatearFecha(fechaISO) {
    let fecha = new Date(fechaISO);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; 
    let year = fecha.getFullYear();
    return `${dia}/${mes}/${year}`;
}

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
  return  Hora_Actual;
}
//Esta funcion recibe 2 stings de timepo de registro de enrtrada los convierte y me da la diferencia en minutos
function Diferencia_Entrada_Salida(Tentrada, Tsalida) {
  let Entrada = new Date(Tentrada);
  let Salida = new Date(Tsalida);
  const diferencia = Salida - Entrada;
  const diferenciaMinutos = Math.floor(diferencia / (1000 * 60));

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

function reloj() {
  let hora = document.querySelector("#Hora_Vivo");
  let fecha = document.querySelector("#Fecha_Vivo");
  fecha.textContent = Fecha();
  hora.textContent = horaFormateada(Registro_Hora());
  setTimeout(reloj, 60000);
  return 
}
reloj();

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

function asignar_puesto(memoria, tipoVehiculo) {
  let disponibilidad = [];

  if (tipoVehiculo == "carro") {
    disponibilidad = memoria.puestos.carros;
  } else if (tipoVehiculo == "moto") {
    disponibilidad = memoria.puestos.motos;
    
  }
  for (const element of disponibilidad) {
    if (element.disponible === true) {
        
        let libre = element.id;
        element.disponible = false
        return libre;
      } 
  }
  let hora = document.querySelector("#Hora_nuevoVehiculo");
  hora.textContent = horaFormateada(Registro_Hora());
  return null
}
function Nuevoingreso() {
let hora = document.querySelector("#Hora_nuevoVehiculo");
  hora.textContent = horaFormateada(Registro_Hora());
  
  
  let text_nuevovehiculo = document.getElementById("input_nuevovehiculo").value;
  let tipoVehiculo;
  if (document.getElementById("NuevoCarro").checked) {
    tipoVehiculo = document.getElementById("NuevoCarro").value;
  } else if (document.getElementById("NuevaMoto").checked) {
    tipoVehiculo = document.getElementById("NuevaMoto").value;
  }
  if (!validarPlaca(text_nuevovehiculo, tipoVehiculo)) {
    alert("Placa inválida, intente de nuevo.");
    return;
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
      alert(
        "Vehículo ya ingresado. Por favor, déjelo salir antes de ingresar nuevamente."
      );
      return;
    }
  }
  
  let puesto = asignar_puesto(memoria, tipoVehiculo);
  if (puesto === null) {
    alert("No hay Cupo ");
    return;
  }
  

  memoria.vehiculos[text_nuevovehiculo] = memoria.vehiculos[text_nuevovehiculo] || {};
  memoria.vehiculos[text_nuevovehiculo].tipo = tipoVehiculo;
  memoria.vehiculos[text_nuevovehiculo].ingresado = true;
  //Falta agregar una condicion para hacer el push de cada visita

  memoria.vehiculos[text_nuevovehiculo].visitas = memoria.vehiculos[text_nuevovehiculo].visitas || [];
  let visita = {
    id:memoria.vehiculos[text_nuevovehiculo].visitas.length +1,
    entrada: Registro_Hora(),
    salida: "",
    tiempo: "",
    costo: "",
    puesto:puesto,
  };
  memoria.vehiculos[text_nuevovehiculo].visitas.push(visita);
  localStorage.setItem("Parking", JSON.stringify(memoria));
  alert("Vehiculo Registrado exitosamente")
  ingresados()

}

function ingresados() {
    let memoria = JSON.parse(localStorage.getItem("Parking"));
    let container = document.querySelector(".ContainerPrimario");
    let template = document.getElementById("vehiculo-template");

    container.innerHTML = "";
    let objeto = memoria.vehiculos;
    for (let llave in objeto) {
        let nuevoobjeto = objeto[llave];
        nuevoobjeto.visitas.sort((a, b) => b.id - a.id);
        if (nuevoobjeto.ingresado === true) {
            const productClone = template.content.cloneNode(true);

            let icono = productClone.querySelector(".icono");
            let placaElement = productClone.querySelector(".placa");
            let Fecha = productClone.querySelector(".fecha");
            let entrada = productClone.querySelector(".ingreso");
            let ingreso = productClone.querySelector(".Tiempo");
            let costo = productClone.querySelector(".Costo");
            let botonSalida = productClone.querySelector(".botonsalida1");

            let primeraVisita = nuevoobjeto.visitas[0];
            let fechaasinformato = formatearFecha(primeraVisita.entrada);

            placaElement.textContent = llave;
            Fecha.textContent = fechaasinformato;
            entrada.textContent = horaFormateada(primeraVisita.entrada);
            ingreso.textContent = Diferencia_Entrada_Salida(primeraVisita.entrada, Registro_Hora());
            costo.textContent = Diferencia_Entrada_Salida(primeraVisita.entrada, Registro_Hora()) * 100;

            if (nuevoobjeto.tipo === "carro") {
                icono.setAttribute("name", "car-outline");
            } else {
                icono.setAttribute("name", "bicycle-outline");
            }

            botonSalida.addEventListener("click", function () {
                GeredarSalida(llave);
            });

            container.appendChild(productClone);
        }
    }
}



//Boton Registro que activa la funsion de ingresados y la funcion de ingresar un carro o moto 
document.addEventListener("DOMContentLoaded", function() {
    let button_Registro = document.getElementById("Ingreso_placas");
    if (button_Registro) {
        button_Registro.addEventListener("click", function(event) {
            event.preventDefault(); 
            Generaringreso();
        });
    } else {
        console.error("El botón con ID 'Ingreso_placas' no se encuentra en el DOM.");
    }
});


    function Generaringreso() {
        let containersecundario = document.querySelector(".Containersecundario");
        let template = document.getElementById("Nuevo_Vehiculo")
        const productClone = template.content.cloneNode(true);
        containersecundario.innerHTML = "";
                containersecundario.appendChild(productClone);
                let button_ingreso = document.getElementById("button_nuevoVehiculo");
                button_ingreso.addEventListener("click", Nuevoingreso);
                if (button_ingreso) { // Verifica que el botón no sea null
                    button_ingreso.addEventListener("click", function() {
                    });
                
                document
                  .getElementById("input_nuevovehiculo")
                  .addEventListener("input", function () {
                    this.value = this.value.toUpperCase();
                  });
    }
   
}

 var IngresadosRegistro =document.querySelector(".IngresadosRegistro")
 IngresadosRegistro.addEventListener("click",ingresados)


    function GeredarSalida(placa){
        let memoria = JSON.parse(localStorage.getItem("Parking"));
        let containersecundario = document.querySelector(".Containersecundario");
        let template = document.getElementById("Ingresado");
        containersecundario.innerHTML = "";
        const productClone = template.content.cloneNode(true);
               let icono = productClone.querySelector(".icono")
               let placas =productClone.querySelector(".placa_ingresado")
               let fecha =productClone.querySelector(".Fecha_ingresado")
               let Hora = productClone.querySelector(".Entrada_ingreso")
               let tiempo =productClone.querySelector(".Tiempo_ingreso")
               let costo = productClone.querySelector(".Costo_ingreso")
               let Puesto = productClone.querySelector(".Puesto_ingreso")
               let boton =productClone.querySelector("#boton_Salida")
               
              let Objeto = memoria.vehiculos[placa];
              Objeto.visitas.sort((a,b) => b.id - a.id)
                var  objetolista = Objeto.visitas[0]
                if (Objeto.tipo === "carro") {
                    icono.setAttribute("name", "car-outline");
                } else {
                    icono.setAttribute("name", "bicycle-outline");
                }
                placas.textContent =placa
                fecha.textContent = formatearFecha(objetolista.entrada)
                Hora.textContent =horaFormateada(objetolista.entrada)
                tiempo.textContent= Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora());
                costo.textContent =  Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora()) *100;
                Puesto.textContent = objetolista.puesto
                boton.addEventListener("click", function () {
                    console.log("Botón de salida clickeado para la placa: " + placa);
                    GeredarFactura_Salida(placa);
                    
                });
                containersecundario.appendChild(productClone)

function  GeredarFactura_Salida(placa){
    let memoria = JSON.parse(localStorage.getItem("Parking"));
        let containersecundario = document.querySelector(".Containersecundario");
        let template = document.getElementById("Facturacion");
        containersecundario.innerHTML = "";
        const productClone = template.content.cloneNode(true);
               let icono = productClone.querySelector(".icono")
               let placas =productClone.querySelector(".placa_ingresado")
               let fecha =productClone.querySelector(".Fecha_ingresado")
               let Hora = productClone.querySelector(".Entrada_ingreso")
               let tiempo =productClone.querySelector(".Tiempo_ingreso")
               let costo = productClone.querySelector(".Costo_ingreso")
               let Salida = productClone.querySelector(".Hora_Salida")
                let botonfactura = productClone.querySelector(".botonfactura")
               
              let Objeto = memoria.vehiculos[placa];
              Objeto.visitas.sort((a,b) => b.id - a.id)
                var  objetolista = Objeto.visitas[0]
                if (Objeto.tipo === "carro") {
                    icono.setAttribute("name", "car-outline");
                } else {
                    icono.setAttribute("name", "bicycle-outline");
                }
                placas.textContent =placa
                fecha.textContent = formatearFecha(objetolista.entrada)
                Hora.textContent =horaFormateada(objetolista.entrada)
                tiempo.textContent= Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora());
                costo.textContent =  Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora()) *100;
                let salidahora = Registro_Hora()
                let costos =  Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora()) *100;
                let Tiempos = Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora());
                Salida.textContent = horaFormateada(Registro_Hora())
                botonfactura.addEventListener("click", function () {
                    DarSalida_Salida(placa ,salidahora,costos, Tiempos );
                });

                containersecundario.appendChild(productClone)
}

function DarSalida_Salida(placa ,salidahora,costos, Tiempos ){
    let memoria = JSON.parse(localStorage.getItem("Parking"));
    let Objeto = memoria.vehiculos[placa]
    if(Objeto.ingresado == false){
        alert("Carro no ingresado no puede darle salida")
    }
    Objeto.ingresado = false
    Objeto.visitas.sort((a,b) => b.id - a.id)
    Objeto.visitas[0].tiempo =Tiempos
    Objeto.visitas[0].costo =  costos
    Objeto.visitas[0].salida = salidahora
    let tipo = Objeto.tipo
    let idpuesto = Objeto.visitas[0].id
    let Objetopuestos = memoria.puestos
    let lista_puestos =[]
    if ( tipo == "carro"){
        lista_puestos = memoria.puestos.carros
    }else{
        lista_puestos = memoria.puestos.motos
    }
    lista_puestos.forEach(element => {
        if (element.id ==idpuesto){
            element.disponible = true
        }
        
    });
    ingresados()
    Generaringreso()

    localStorage.setItem("Parking", JSON.stringify(memoria));
}
    }

    function catalogo(vehiculo) {
        let memoria = JSON.parse(localStorage.getItem("Parking"));
        let container = document.querySelector(".ContainerPrimario");
        let template = document.getElementById("verdisponibilidad");
        container.innerHTML = "";
        container.classList.add("catalogoflex");
        let idt = memoria.puestos[vehiculo];
        
        idt.forEach(element => {
            const productClone = template.content.cloneNode(true);
            let icono = productClone.querySelector(".icono");
            let idtext = productClone.querySelector(".idt");
            let verdisponibilidad = productClone.querySelector(".verdisponibilidad");
            
            if (vehiculo === "carros") {
                icono.setAttribute("name", "car-outline");
            } else {
                icono.setAttribute("name", "bicycle-outline");
            }
            
            idtext.textContent = element.id;
            
            // Aplicar la clase según la disponibilidad
            if (element.disponible) {
                verdisponibilidad.classList.remove("verdisponibilidadfalse");
            } else {
                verdisponibilidad.classList.add("verdisponibilidadfalse");
            }


    
            container.appendChild(productClone);
        });
    }


let botondispo = document.querySelector("#disponibilidadmotos")
    botondispo.addEventListener("click", function () {
        catalogo("motos")
        Generaringreso() 
    });
    
   
let botondispo2 = document.querySelector("#disponibilidadcarros")
    botondispo2.addEventListener("click", function () {
        catalogo("carros")
        Generaringreso() 
    });
    
   
    

    

        





    
   




