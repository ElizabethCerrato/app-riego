// filtros.js
// Contiene la lógica aplicada a los filtros de búsqueda de la biblioteca.

import {limpiarFormulario} from './utils'
import { plantasDB } from './data/plantasDB';
import { mostrarBiblioteca } from './ui';
import { btnSub, porNombre, porFrecuencia, porTipoLuz } from './variables';

export function filtrarPlanta() {
  btnSub.addEventListener("click", (e) => {
    e.preventDefault();
    divBiblioteca.innerHTML = "";
    let checkNombre = document.querySelector("#activarNombre").checked;
    let checkLuz = document.querySelector("#activarLuz").checked;
    let checkFrecuencia = document.querySelector("#activarFrecuencia").checked;

    const nombre = porNombre.value;
    const luz = porTipoLuz.value;
    const frecuencia = parseInt(porFrecuencia.value);

    const filtrado = plantasDB.filter((x) => {

      return (
        (!checkNombre ||
          x.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
        (!checkLuz || x.luz === luz) &&
        (!checkFrecuencia || x.frecuencia_riego === frecuencia)
      );
    });
 
    mostrarBiblioteca(filtrado);
    const form = document.querySelector("#busqueda");
    limpiarFormulario(form);
  });
}
