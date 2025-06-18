// modal.js
// Se encarga del funcionamiento de la modal.

import { mostrarPlantas, mostrarRegarhoy, mostrarMensajeVacio } from "./ui";
import { limpiarFormulario } from "./utils";
import { guardarPlanta } from "./storage";
import { divModal, btnGuardarModal, btnCancelarModal } from "./variables";

export function abrirModal() {
  divModal.classList.add("activa");
}

export function cerrarModal() {
  divModal.classList.remove("activa");
}

export function funcionamientoModal(arr) {
  btnGuardarModal.addEventListener("click", () => {
    const fecha = fechaModal.value;

    const flor = florModal.value;

    if (validarFecha(fecha)) {
      arr.fecha = fecha;
      arr.flor = flor;
      guardarPlanta(arr);
      cerrarModal();
      mostrarPlantas();
      mostrarRegarhoy();
    } else {
      mostrarMensajeVacio(
        "Fecha no válida, la fecha no puede ser posterior a hoy."
      );
    }
  });
  btnCancelarModal.addEventListener("click", () => {
    cerrarModal();
    let form = document.querySelector("#formularioModal");
    limpiarFormulario(form);
  });
}
