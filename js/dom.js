// dom.js
// Contiene funciones relacionadas con la manipulación del DOM: creación de elementos.

import {
  calcularProximaFecha,
  formatearFecha,
  tocaRegarHoy,
  generarId,
} from "./utils";

import { abrirModal, funcionamientoModal } from "./modal.js";
import { eliminarPlanta } from "./storage.js";
import { mostrarPlantas, mostrarRegarhoy } from "./ui.js";
import { divListado, divBiblioteca, sectionAvisos } from "./variables.js";

export function crearTitulo(nombre) {
  const titulo = document.createElement("h4");
  titulo.textContent = nombre;
  return titulo;
}

export function crearTarjetaColeccion(planta) {
  const divTarjeta = document.createElement("div");
  divTarjeta.classList.add("tarjeta-planta");

  const divNombre = document.createElement("div");
  divNombre.classList.add("titulo-coleccion");
  const nombre = planta.nombre;
  const titulo = crearTitulo(nombre);
  divNombre.appendChild(titulo);

  const divUltimo = document.createElement("div");
  divUltimo.classList.add("regar-coleccion");
  const parrafo = document.createElement("p");
  parrafo.textContent = "Regar cada " + planta.frecuencia_riego + " días.";
  divUltimo.appendChild(parrafo);

  const divReg = document.createElement("div");
  divReg.classList.add("ultimo-coleccion");
  const parrafo2 = document.createElement("p");
  parrafo2.textContent = "Último riego: " + formatearFecha(planta.fecha);
  divReg.appendChild(parrafo2);

  const divProximo = document.createElement("div");
  divProximo.classList.add("proximo-coleccion");
  const parrafo3 = document.createElement("p");
  parrafo3.textContent =
    "Próximo riego: " +
    formatearFecha(calcularProximaFecha(planta.fecha, planta.frecuencia_riego));
  divProximo.appendChild(parrafo3);

  const divBoton = document.createElement("div");
  divBoton.classList.add("btn-coleccion");
  const btnEliminar = document.createElement("button");
  btnEliminar.classList.add("btn-eliminar-coleccion");
  btnEliminar.setAttribute("data-id", planta.id);
  btnEliminar.textContent = "Eliminar";
  divBoton.appendChild(btnEliminar);

  btnEliminar.addEventListener("click", (e) => {
    const plantaId = e.target.dataset.id;
    eliminarPlanta(plantaId);
  });

  const divColumnaLeft = document.createElement("div");
  divColumnaLeft.classList.add("columna-izda");
  divColumnaLeft.appendChild(divNombre);
  divColumnaLeft.appendChild(divReg);
  divColumnaLeft.appendChild(divUltimo);
  divColumnaLeft.appendChild(divProximo);

  divTarjeta.appendChild(divColumnaLeft);

  const divColumnaRight = document.createElement("div");
  divColumnaRight.classList.add("columna-dcha");

  const div = document.createElement("div");
  div.classList.add("img-coleccion");
  const img = document.createElement("img");

  if (planta.imagen) {
    img.setAttribute("src", planta.imagen);
    img.setAttribute("alt", planta.nombre);
  
  } else if (planta.imagen === "") {
    img.setAttribute("src", "/assets/img/plantas/planta_modelo.png");
    img.setAttribute("alt", "Imagen por defecto");
  }
    div.appendChild(img);
    divColumnaRight.appendChild(div);

  divColumnaRight.appendChild(divBoton);
  divTarjeta.appendChild(divColumnaRight);
  divListado.appendChild(divTarjeta);
}

export function crearTarjetaAviso(planta) {
  if (tocaRegarHoy(planta.fecha, planta.frecuencia_riego) === true) {
    const divRegar = document.createElement("div");
    divRegar.classList.add("regar-hoy");
    const nombreAviso = document.createElement("div");
    nombreAviso.classList.add("nombre-planta");
    nombreAviso.appendChild(crearTitulo(planta.nombre));
    divRegar.appendChild(nombreAviso);
    const divAreaEmoji = document.createElement("div");
    divAreaEmoji.classList.add("area-emoji");
    const ultimoRiego = document.createElement("p");
    ultimoRiego.textContent = "💦 Estoy sedienta "; // Solo mensaje
    divAreaEmoji.appendChild(ultimoRiego);
    divRegar.appendChild(divAreaEmoji);

    const divBtn = document.createElement("div");
    divBtn.classList.add("div-btn-condicional");
    const btnCondicional = document.createElement("button");
    btnCondicional.classList.add("btn-condicional");
    btnCondicional.setAttribute("data-id", planta.id);
    btnCondicional.textContent = "Regar";
    divBtn.appendChild(btnCondicional);
    divRegar.appendChild(divBtn);
    sectionAvisos.appendChild(divRegar);

    btnCondicional.addEventListener("click", (event) => {
      const dataId = event.target.getAttribute("data-id");
      const idNumero = parseInt(dataId);
      let arr = JSON.parse(localStorage.getItem("plantas"));
      const filtrado = arr.find((x) => x.id === idNumero);
      const fechaActualizada = new Date();
      filtrado.fecha = fechaActualizada;
      filtrado.toca = tocaRegarHoy(filtrado.fecha, planta.frecuencia_riego);
      localStorage.setItem("plantas", JSON.stringify(arr));
      mostrarRegarhoy();
      mostrarPlantas();
    });
  }
}

export function crearTarjetaBiblioteca(planta) {
  const divTarjetaBiblioteca = document.createElement("div");
  divTarjetaBiblioteca.classList.add("tarjeta-biblioteca");
  const img = document.createElement("img");
  const divMarco = document.createElement("div");
  divMarco.classList.add("marco");
  img.setAttribute("src", planta.imagen);
  img.setAttribute("alt", planta.nombre);
  img.setAttribute("width", "200");
  img.setAttribute("height", "auto");
  const nombre = crearTitulo(planta.nombre);
  const luz = document.createElement("p");
  luz.textContent = "Tipo de luz: " + planta.luz;
  const frecuencia = document.createElement("p");
  frecuencia.textContent = `Riego cada ${planta.frecuencia_riego} días`;
  const btnAgregar = document.createElement("button");
  btnAgregar.setAttribute("type", "submit");
  btnAgregar.setAttribute("id", "btn-agregar");
  btnAgregar.textContent = "Añadir a colección";

  divTarjetaBiblioteca.appendChild(nombre);
  divMarco.appendChild(img);
  divTarjetaBiblioteca.appendChild(divMarco);
  divTarjetaBiblioteca.appendChild(luz);
  divTarjetaBiblioteca.appendChild(frecuencia);
  divTarjetaBiblioteca.appendChild(btnAgregar);

  divBiblioteca.appendChild(divTarjetaBiblioteca);

  btnAgregar.addEventListener("click", () => {
    let clonPlanta = { ...planta };
    clonPlanta.id = generarId();
    abrirModal();
    funcionamientoModal(clonPlanta);
  });
}
