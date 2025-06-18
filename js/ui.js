// ui.js
// Renderizado de elementos.

import { crearTarjetaColeccion, crearTarjetaAviso, crearTarjetaBiblioteca } from './dom.js';
import { calcularProximaFecha, tocaRegarHoy} from './utils.js';
import { divListado, divRegar, divBiblioteca, divError, porFrecuencia } from './variables.js';
import { plantasDB } from './data/plantasDB.js';



export function mostrarPlantas() {
  divListado.innerHTML = "";
  let arr = JSON.parse(localStorage.getItem("plantas"));
  if (arr === null) {
    return mostrarMensajeVacio("No hay plantas guardadas.");
  } else {
    arr.sort((a, b) => {
      return (
        calcularProximaFecha(a.fecha, a.frecuencia_riego).getTime() -
        calcularProximaFecha(b.fecha, b.frecuencia_riego).getTime()
      );
    });
    for (let planta of arr) {
      crearTarjetaColeccion(planta);
    }
  }
}

export function mostrarRegarhoy() {
  divRegar.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("plantas"));
  if (arr !== null) {
    const filtrado = arr.filter((x) =>
      tocaRegarHoy(x.fecha, x.frecuencia_riego)
    );
    if (filtrado.length > 0) {
      for (let planta of filtrado) {
        crearTarjetaAviso(planta);
      }
    }
  } else {
    mostrarMensajeVacio("Hoy no toca regar ninguna planta.");
  }
}

export function mostrarBiblioteca(arr = plantasDB) {
  divBiblioteca.innerHTML = "";

  for (let planta of arr) {
    crearTarjetaBiblioteca(planta);
  }
}

export function mostrarMensajeVacio(texto) {
  divError.innerHTML = "";
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  parrafo.classList.add("mensaje-vacio");
  divError.appendChild(parrafo);
}

const span = document.querySelector("#span-slider");

porFrecuencia.addEventListener("input", () => {
  mostrarValorSlider(porFrecuencia);
})

export function mostrarValorSlider(f) {
  span.textContent = f.value;
}