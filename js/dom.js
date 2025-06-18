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
import { divListado, divBiblioteca, divRegar } from "./variables.js";

export function crearTitulo(nombre) {
  const titulo = document.createElement("h4");
  titulo.textContent = nombre;
  return titulo;
}

export function crearTarjetaColeccion(planta) {
  const divTarjeta = document.createElement("div");
  divTarjeta.classList.add("tarjeta-planta");
  const nombre = planta.nombre;
  const titulo = crearTitulo(nombre);
  const parrafo = document.createElement("p");
  parrafo.textContent = "Regar cada " + planta.frecuencia_riego + " días.";
  const parrafo2 = document.createElement("p");
  parrafo2.textContent = "Último riego: " + formatearFecha(planta.fecha);
  const parrafo3 = document.createElement("p");
  parrafo3.textContent =
    "Próximo riego: " +
    formatearFecha(calcularProximaFecha(planta.fecha, planta.frecuencia_riego));
  const btnEliminar = document.createElement("button");
  btnEliminar.setAttribute("data-id", planta.id);
  btnEliminar.textContent = "Eliminar";

  btnEliminar.addEventListener("click", (e) => {
    const plantaId = e.target.dataset.id;
    eliminarPlanta(plantaId);
  });

  divTarjeta.appendChild(titulo);
  divTarjeta.appendChild(parrafo2);
  divTarjeta.appendChild(parrafo);
  divTarjeta.appendChild(parrafo3);
  divTarjeta.appendChild(btnEliminar);

  if (planta.imagen && planta.imagen !== "") {
    const img = document.createElement("img");
    img.setAttribute("src", planta.imagen);
    img.setAttribute("alt", planta.nombre);
    img.setAttribute("width", "200");
    img.setAttribute("height", "auto");

    divTarjeta.appendChild(img);
  }

  divListado.appendChild(divTarjeta);
}

export function crearTarjetaAviso(planta) {
  if (tocaRegarHoy(planta.fecha, planta.frecuencia_riego) === true) {
    divRegar.appendChild(crearTitulo(planta.nombre));
    const ultimoRiego = document.createElement("p");
    ultimoRiego.textContent = "Último riego: " + formatearFecha(planta.fecha);
    divRegar.appendChild(ultimoRiego);

    const btnCondicional = document.createElement("button");
    btnCondicional.classList.add("btn-condicional");
    btnCondicional.setAttribute("data-id", planta.id);
    btnCondicional.textContent = "Regar";
    divRegar.appendChild(btnCondicional);

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
  divTarjetaBiblioteca.appendChild(img);
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
