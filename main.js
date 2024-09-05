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
  return Hora_Actual;
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
  contadormotos();
  contadorcarros();
  setTimeout(reloj, 60000);
  return;
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
      element.disponible = false;
      return libre;
    }
  }
  let hora = document.querySelector("#Hora_nuevoVehiculo");
  hora.textContent = horaFormateada(Registro_Hora());
  return null;
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

  memoria.vehiculos[text_nuevovehiculo] =
    memoria.vehiculos[text_nuevovehiculo] || {};
  memoria.vehiculos[text_nuevovehiculo].tipo = tipoVehiculo;
  memoria.vehiculos[text_nuevovehiculo].ingresado = true;
  //Falta agregar una condicion para hacer el push de cada visita

  memoria.vehiculos[text_nuevovehiculo].visitas =
    memoria.vehiculos[text_nuevovehiculo].visitas || [];
  let visita = {
    id: puesto,
    entrada: Registro_Hora(),
    salida: "",
    tiempo: "",
    costo: "",
    puesto: puesto,
  };
  memoria.vehiculos[text_nuevovehiculo].visitas.push(visita);
  localStorage.setItem("Parking", JSON.stringify(memoria));
  alert("Vehiculo Registrado exitosamente");
  ingresados();
  contadormotos();
  contadorcarros();
}

function ingresados() {
  let memoria = JSON.parse(localStorage.getItem("Parking"));
  let container = document.querySelector(".ContainerPrimario");
  let template = document.getElementById("vehiculo-template");

  container.innerHTML = "";
  let objeto = memoria.vehiculos;
  for (let llave in objeto) {
    let nuevoobjeto = objeto[llave];
    let nuevoobjetoordenado = nuevoobjeto.visitas.sort(
      (a, b) => new Date(b.entrada) - new Date(a.entrada)
    );
    console.log(nuevoobjeto.visitas);
    // console.log(nuevoobjeto.visitas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)))
    if (nuevoobjeto.ingresado === true) {
      const productClone = template.content.cloneNode(true);
      let icono = productClone.querySelector(".icono");
      let placaElement = productClone.querySelector(".placa");
      let Fecha = productClone.querySelector(".fecha");
      let entrada = productClone.querySelector(".ingreso");
      let ingreso = productClone.querySelector(".Tiempo");
      let costo = productClone.querySelector(".Costo");
      let botonSalida = productClone.querySelector(".botonsalida1");
      let primeraVisita = nuevoobjetoordenado[0];
      let fechaasinformato = formatearFecha(primeraVisita.entrada);
      placaElement.textContent = llave;
      Fecha.textContent = fechaasinformato;
      entrada.textContent = horaFormateada(primeraVisita.entrada);
      ingreso.textContent = Diferencia_Entrada_Salida(
        primeraVisita.entrada,
        Registro_Hora()
      );

      if (nuevoobjeto.tipo === "carro") {
        icono.setAttribute("name", "car-outline");
        costo.textContent =
          Diferencia_Entrada_Salida(primeraVisita.entrada, Registro_Hora()) *
          100;
      } else {
        icono.setAttribute("name", "bicycle-outline");
        costo.textContent =
          Diferencia_Entrada_Salida(primeraVisita.entrada, Registro_Hora()) *
          50;
      }
      


      botonSalida.addEventListener("click", function () {
        GeredarSalida(llave);
        contadormotos();
        contadorcarros();
      });

      container.appendChild(productClone);
    }
  }
}


document.addEventListener("DOMContentLoaded", function () {
  let button_Registro = document.getElementById("Ingreso_placas");
  if (button_Registro) {
    button_Registro.addEventListener("click", function (event) {
      event.preventDefault();
      Generaringreso();
      ingresados()
    });
  } else {
    console.error(
      "El botón con ID 'Ingreso_placas' no se encuentra en el DOM."
    );
  }
});

function Generaringreso() {
  let containersecundario = document.querySelector(".Containersecundario");
  let template = document.getElementById("Nuevo_Vehiculo");
  const productClone = template.content.cloneNode(true);
  containersecundario.innerHTML = "";
  containersecundario.appendChild(productClone);
  let button_ingreso = document.getElementById("button_nuevoVehiculo");
  button_ingreso.addEventListener("click", Nuevoingreso);
  if (button_ingreso) {
    // Verifica que el botón no sea null
    button_ingreso.addEventListener("click", function () {});

    document
    .getElementById("input_nuevovehiculo")
      .addEventListener("input", function () {
        this.value = this.value.toUpperCase();
      });
  }
}

var IngresadosRegistro = document.querySelector(".IngresadosRegistro");
IngresadosRegistro.addEventListener("click", ingresados);

function GeredarSalida(placa) {
  let memoria = JSON.parse(localStorage.getItem("Parking"));
  let containersecundario = document.querySelector(".Containersecundario");
  let template = document.getElementById("Ingresado");
  containersecundario.innerHTML = "";
  const productClone = template.content.cloneNode(true);
  let icono = productClone.querySelector(".icono");
  let placas = productClone.querySelector(".placa_ingresado");
  let fecha = productClone.querySelector(".Fecha_ingresado");
  let Hora = productClone.querySelector(".Entrada_ingreso");
  let tiempo = productClone.querySelector(".Tiempo_ingreso");
  let costo = productClone.querySelector(".Costo_ingreso");
  let Puesto = productClone.querySelector(".Puesto_ingreso");
  let boton = productClone.querySelector("#boton_Salida");

  let Objeto = memoria.vehiculos[placa];
  Objeto.visitas.sort((a, b) => new Date(b.entrada) - new Date(a.entrada));
  let ordenamiento = Objeto.visitas.sort(
    (a, b) => new Date(b.entrada) - new Date(a.entrada)
  );
  var objetolista = ordenamiento[0];
  if (Objeto.tipo === "carro") {
    icono.setAttribute("name", "car-outline");
    costo.textContent =
      Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora()) * 100;
  } else {
    icono.setAttribute("name", "bicycle-outline");
    costo.textContent =
      Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora()) * 50;
  }
  placas.textContent = placa;
  fecha.textContent = formatearFecha(objetolista.entrada);
  Hora.textContent = horaFormateada(objetolista.entrada);
  tiempo.textContent = Diferencia_Entrada_Salida(
    objetolista.entrada,
    Registro_Hora()
  );

  Puesto.textContent = objetolista.puesto;
  boton.addEventListener("click", function () {
    console.log("Botón de salida clickeado para la placa: " + placa);
    GeredarFactura_Salida(placa);
    contadormotos();
    contadorcarros();
  });
  containersecundario.appendChild(productClone);

  function GeredarFactura_Salida(placa) {
    let memoria = JSON.parse(localStorage.getItem("Parking"));
    let containersecundario = document.querySelector(".Containersecundario");
    let template = document.getElementById("Facturacion");
    containersecundario.innerHTML = "";
    const productClone = template.content.cloneNode(true);

    let icono = productClone.querySelector(".icono");
    let placas = productClone.querySelector(".placa_ingresado");
    let fecha = productClone.querySelector(".Fecha_ingresado");
    let Hora = productClone.querySelector(".Entrada_ingreso");
    let tiempo = productClone.querySelector(".Tiempo_ingreso");
    let costo = productClone.querySelector(".Costo_ingreso");
    let Salida = productClone.querySelector(".Hora_Salida");
    let botonfactura = productClone.querySelector(".botonfactura");

    let Objeto = memoria.vehiculos[placa];
    let ordenadito = Objeto.visitas.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    Objeto.visitas.sort((a, b) => new Date(b.entrada) - new Date(a.entrada));
    let objetolista = ordenadito[0];
    let costos = 0;

    if (Objeto.tipo === "carro") {
      icono.setAttribute("name", "car-outline");
      costos =
        Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora()) * 100;
      costo.textContent = costos;
    } else {
      icono.setAttribute("name", "bicycle-outline");
      costos =
        Diferencia_Entrada_Salida(objetolista.entrada, Registro_Hora()) * 50;
      costo.textContent = costos;
    }

    placas.textContent = placa;
    fecha.textContent = formatearFecha(objetolista.entrada);
    Hora.textContent = horaFormateada(objetolista.entrada);
    tiempo.textContent = Diferencia_Entrada_Salida(
      objetolista.entrada,
      Registro_Hora()
    );
    let salidahora = Registro_Hora();
    let Tiempos = Diferencia_Entrada_Salida(
      objetolista.entrada,
      Registro_Hora()
    );
    Salida.textContent = horaFormateada(Registro_Hora());

    botonfactura.addEventListener("click", function () {
      DarSalida_Salida(placa, salidahora, costos, Tiempos);
    });

    containersecundario.appendChild(productClone);
  }

  function DarSalida_Salida(placa, salidahora, costos, Tiempos) {
    let memoria = JSON.parse(localStorage.getItem("Parking"));
    let Objeto = memoria.vehiculos[placa];
    if (Objeto.ingresado == false) {
      alert("Carro no ingresado no puede darle salida");
    }

    Objeto.visitas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    let ordenado = Objeto.visitas.sort(
      (a, b) => new Date(b.entrada) - new Date(a.entrada)
    );
    Objeto.ingresado = false;
    ordenado[0].tiempo = Tiempos;

    ordenado[0].costo = costos;
    ordenado[0].salida = salidahora;
    let tipo = Objeto.tipo;
    let idpuesto = ordenado[0].id;
    let lista_puestos = [];
    if (tipo == "carro") {
      lista_puestos = memoria.puestos.carros;
    } else {
      lista_puestos = memoria.puestos.motos;
    }
    lista_puestos.forEach((element) => {
      if (element.id == idpuesto) {
        element.disponible = true;
      }
    });
    localStorage.setItem("Parking", JSON.stringify(memoria));
    ingresados();
    Generaringreso();
    contadormotos();
    contadorcarros();
  }
}

function catalogo(vehiculo) {
  let memoria = JSON.parse(localStorage.getItem("Parking"));
  let container = document.querySelector(".ContainerPrimario");
  let template = document.getElementById("verdisponibilidad");
  container.innerHTML = "";
  container.classList.add("catalogoflex");
  let idt = memoria.puestos[vehiculo];

  idt.forEach((element) => {
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

let botondispo = document.querySelector("#disponibilidadmotos");
botondispo.addEventListener("click", function () {
  catalogo("motos");
  Generaringreso();
});

let botondispo2 = document.querySelector("#disponibilidadcarros");
botondispo2.addEventListener("click", function () {
  catalogo("carros");
  Generaringreso();
});

function historial() {
  let memoria = JSON.parse(localStorage.getItem("Parking"));
  let container = document.querySelector(".ContainerPrimario");
  let template = document.getElementById("Historial");
  container.innerHTML = "";
  let objeto = memoria.vehiculos;

  for (let llave in objeto) {
    let nuevoobjeto = objeto[llave];
    let nuevoobjetoordenado = nuevoobjeto.visitas.sort(
      (a, b) => new Date(b.entrada) - new Date(a.entrada)
    );
    

    if (nuevoobjeto.ingresado === false) {
      nuevoobjetoordenado.forEach((element) => {
        const productClone = template.content.cloneNode(true);
    let icono = productClone.querySelector(".icono");
    let placaElement = productClone.querySelector(".placa");
    let Fecha = productClone.querySelector(".fecha");
    let entrada = productClone.querySelector(".ingreso");
    let ingreso = productClone.querySelector(".Tiempo");
    let costo = productClone.querySelector(".Costo");
    let Salida = productClone.querySelector(".salida");
        placaElement.textContent = llave;
        Fecha.textContent = formatearFecha(element.salida);
        entrada.textContent = horaFormateada(element.entrada);
        if (nuevoobjeto.tipo === "carro") {
          icono.setAttribute("name", "car-outline");
          costo.textContent =
            Diferencia_Entrada_Salida(element.entrada, element.salida) * 100;
        } else {
          icono.setAttribute("name", "bicycle-outline");
          costo.textContent =
            Diferencia_Entrada_Salida(element.entrada, element.salida) * 50;
        }
        ingreso.textContent = Diferencia_Entrada_Salida(
          element.entrada,
          element.salida
        );
        Salida.textContent = horaFormateada(element.salida);

        container.appendChild(productClone);
      });
    }
  }
}

let botonhistorial = document.querySelector("#Reporteshistoricos");
botonhistorial.addEventListener("click", function () {
  historial();
});

function ganacias() {
  let memoria = JSON.parse(localStorage.getItem("Parking"));
  let container = document.querySelector(".Containersecundario");
  let template = document.getElementById("ganancias");
  container.innerHTML = "";
  let objeto = memoria.vehiculos;
  let contadorcantidad = 0;
  let contadorcosto = 0;

  for (let llave in objeto) {
    let nuevoobjeto = objeto[llave];

    let nuevoobjetoordenado = nuevoobjeto.visitas.sort(
      (a, b) => new Date(b.entrada) - new Date(a.entrada)
    );

    if (nuevoobjeto.ingresado === false) {
      nuevoobjetoordenado.forEach((element) => {
        contadorcantidad++;
        contadorcosto += element.costo || 0;
      });
    }
  }

  const productClone = template.content.cloneNode(true);
  let cantidad = productClone.querySelector(".Entrada_ingreso");
  let dinero = productClone.querySelector(".Tiempo_ingreso");
  let Fecha = productClone.querySelector(".Fecha_ingresado");

  cantidad.textContent = contadorcantidad;
  dinero.textContent = contadorcosto;
  Fecha.textContent = formatearFecha(new Date());

  container.appendChild(productClone);
}

let botonganancias = document.querySelector("#Ganacias");
botonganancias.addEventListener("click", function () {
  ganacias();
});

function contadormotos() {
  let memoria = JSON.parse(localStorage.getItem("Parking"));
  let objeto = memoria.puestos;
  let contador = 0;
  objeto.motos.forEach((element) => {
    if (element.disponible == false) {
      contador = contador + 1;
    }
    let motocupo = document.getElementById("cupomoto");
    motocupo.textContent = contador + "/" + "20";
    catalogo("motos");
  });
}
let botoncontadormotos = document.querySelector(".CupoMotocicletas");
botoncontadormotos.addEventListener("click", function () {
  catalogo("motos");
  contadorcarros();
  contadormotos();
});

function contadorcarros() {
  let memoria = JSON.parse(localStorage.getItem("Parking"));

  let objeto = memoria.puestos;

  let contador = 0;
  objeto.carros.forEach((element) => {
    if (element.disponible == false) {
      contador = contador + 1;
    }
    let motocarro = document.getElementById("cupocarro");
    motocarro.textContent = contador + "/" + "20";
    catalogo("carros");
  });
}

let botoncontadorcarros = document.querySelector(".Cuposdisponibles");
botoncontadorcarros.addEventListener("click", function () {
  catalogo("carros");
  contadorcarros();
  contadormotos();
  contadorcarros();
});

contadorcarros();
contadormotos();

function validarPlaca2(textoPlaca) {
  const regexCarro = /^[A-Z]{3}\d{3}$/;
  const regexMoto = /^[A-Z]{3}\d{2}[A-Z]{1}$/;

  return regexCarro.test(textoPlaca) || regexMoto.test(textoPlaca);
}

function barra() {
  
  
  let placa = document.getElementById("BarradeBusqueda").value;

  if (!validarPlaca2(placa)) {
    console.log("Placa no válida:", placa);
    return
  }

  document.getElementById("BarradeBusqueda").value = "";

  let memoria = JSON.parse(localStorage.getItem("Parking"));

  let objeto = memoria.vehiculos;
  console.log(objeto[placa].ingresado);
  
  var container = document.querySelector(".ContainerPrimario");
  container.innerHTML = "";
  if (objeto[placa].ingresado == true) {
     
    let template = document.getElementById("vehiculo-template");
    let nuevo_objeto_ordenado = objeto[placa].visitas.sort((a, b) => new Date(b.entrada) - new Date(a.entrada));
    const productClone = template.content.cloneNode(true);

    let icono = productClone.querySelector(".icono");
    let placaElement = productClone.querySelector(".placa");
    let Fecha = productClone.querySelector(".fecha");
    let entrada = productClone.querySelector(".ingreso");
    let ingreso = productClone.querySelector(".Tiempo");
    let costo = productClone.querySelector(".Costo");
    let botonSalida = productClone.querySelector(".botonsalida1");
    let primeraVisita = nuevo_objeto_ordenado[0]
    placaElement.textContent = placa;
    Fecha.textContent =formatearFecha(primeraVisita.entrada);
    entrada.textContent = horaFormateada(primeraVisita.entrada);
    ingreso.textContent = Diferencia_Entrada_Salida(primeraVisita.entrada,Registro_Hora());
    if (objeto[placa].tipo === "carro") {
      icono.setAttribute("name", "car-outline");
      costo.textContent =Diferencia_Entrada_Salida(primeraVisita.entrada, Registro_Hora()) * 100;
    } else {
      icono.setAttribute("name", "bicycle-outline");
      costo.textContent =
        Diferencia_Entrada_Salida(primeraVisita.entrada, Registro_Hora()) * 50;
    }
    botonSalida.addEventListener("click", function () {
      GeredarSalida(placa);
      contadormotos();
      contadorcarros();
    });
    container.appendChild(productClone)
       
  }
  
   container = document.querySelector(".ContainerPrimario");
  let template = document.getElementById("Historial");
 
  let  nuevoobjetoordenado = objeto[placa].visitas.sort((a, b) => new Date(b.entrada) - new Date(a.entrada));
    const productClone1 = template.content.cloneNode(true);
    let icono = productClone1.querySelector(".icono");
    let placaElement = productClone1.querySelector(".placa");
    let Fecha = productClone1.querySelector(".fecha");
    let entrada = productClone1.querySelector(".ingreso");
    let ingreso = productClone1.querySelector(".Tiempo");
    let costo = productClone1.querySelector(".Costo");
    let Salida = productClone1.querySelector(".salida");
    nuevoobjetoordenado.forEach((element) => {
      const productClone1 = template.content.cloneNode(true);
      console.log(element)
      placaElement.textContent = placa;
      Fecha.textContent = formatearFecha(element.salida);
      entrada.textContent = horaFormateada(element.entrada);
      if (objeto[placa].tipo === "carro") {
        icono.setAttribute("name", "car-outline");
        costo.textContent =
          Diferencia_Entrada_Salida(element.entrada, element.salida) * 100;
      } else {
        icono.setAttribute("name", "bicycle-outline");
        costo.textContent =
          Diferencia_Entrada_Salida(element.entrada, element.salida) * 50;
      }
      ingreso.textContent = Diferencia_Entrada_Salida(
        element.entrada,
        element.salida
      );
      Salida.textContent = horaFormateada(element.salida);

      container.appendChild(productClone1);
      

    })
  }

let BarradeBusqueda2 = document.getElementById("BarradeBusqueda");
BarradeBusqueda2.addEventListener("input", function () {
  this.value = this.value.toUpperCase();
});

BarradeBusqueda2.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    barra();
  }
});

botoningreso = document.querySelector("#salida1")
botoningreso.addEventListener("click",function (event) {
  Generaringreso()
  ingresados()
}); 

botonvehiculoingresado = document.querySelector("#vehiculoingresado")
botonvehiculoingresado.addEventListener("click", function (event) {
  ingresados()
}); 



function actualizarPlaca() {
  
  let placamala = document.getElementById("placamala").value.trim().toUpperCase();
  let placabuena = document.getElementById("nuevaplaca").value.trim().toUpperCase();
  let memoria = JSON.parse(localStorage.getItem("Parking"));
  if (!memoria || !memoria.vehiculos) {
      console.log("No hay datos en el almacenamiento local.");
      return;
  }
  let objeto = memoria.vehiculos;
  if (!objeto[placamala]) {
      console.log("La placa actual no existe:", placamala);
      return;
  }

  if (objeto[placabuena] && placamala !== placabuena) {
      console.log("La nueva placa ya está en uso:", placabuena);
      return;
  }
  objeto[placabuena] = objeto[placamala];
  delete objeto[placamala];
  localStorage.setItem("Parking", JSON.stringify(memoria));
  console.log("Placa actualizada correctamente.");
  document.getElementById("placamala").value = '';
  document.getElementById("nuevaplaca").value = '';
}


function Generareditar() {
  let containersecundario = document.querySelector(".Containersecundario");
  let template = document.getElementById("Edicion");
  const productClone = template.content.cloneNode(true);
  containersecundario.innerHTML = "";
  containersecundario.appendChild(productClone);
  let button_ingreso = document.getElementById("butoneditar");
  button_ingreso.addEventListener("click", actualizarPlaca);
  if (butoneditar) {
  
    button_ingreso.addEventListener("click",  actualizarPlaca);


  }
}

 let Edicionmultple =document.querySelector("#Edicionmultple")
 Edicionmultple.addEventListener("click",Generareditar )


