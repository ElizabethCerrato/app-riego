// storage.js
// Contiene funciones que gestionan localStorage: guardar, recuperar y actualizar datos.

import {
  generarId,
  capitalizarNombre,
  tocaRegarHoy,
  limpiarFormulario,
} from "./utils.js";

import { mostrarPlantas, mostrarRegarhoy, mostrarMensajeVacio } from "./ui.js";

let formulario = document.querySelector("#formularioPlantas");

export function registrarPlanta(nombre, frecuencia, fecha, flor) {
  if (validarNombre(nombre) === true && validarFecha(fecha) === true) {
    const planta = {
      id: generarId(),
      nombre: capitalizarNombre(nombre),
      frecuencia_riego: frecuencia,
      fecha: fecha,
      flor: flor,
      toca: tocaRegarHoy(fecha, frecuencia),
      imagen: "",
    };

    guardarPlanta(planta);
    limpiarFormulario(formulario);
    mostrarPlantas();
    mostrarRegarhoy();
  } else {
    mostrarMensajeVacio("Datos no válidos"); //OJO A ESO
  }
}

export function guardarPlanta(planta) {
  if (localStorage.getItem("plantas")) {
    let plantas = JSON.parse(localStorage.getItem("plantas"));
    plantas.push(planta);
    localStorage.setItem("plantas", JSON.stringify(plantas));
  } else {
    let arr = [];
    arr.push(planta);
    localStorage.setItem("plantas", JSON.stringify(arr));
  }
}

export function eliminarPlanta(plantaId) {
  const plantas = JSON.parse(localStorage.getItem("plantas"));
  const filtrado = plantas.filter((x) => x.id !== parseInt(plantaId));
  localStorage.setItem("plantas", JSON.stringify(filtrado));
  mostrarPlantas();
  mostrarRegarhoy();
}
