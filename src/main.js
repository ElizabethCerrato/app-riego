// Riego: Gestión de plantas y recordatorios de riego.

// main.js
// Punto de entrada de la aplicación. Inicializa la app y gestiona la lógica principal

import "./style.css";
import {
  mostrarPlantas,
  mostrarBiblioteca,
  mostrarRegarhoy,
} from "../js/ui.js";

import { registrarPlanta } from "../js/storage.js";
import { filtrarPlanta } from "../js/filtros.js";
import { btnGuardar } from "../js/variables.js";

function inicio() {
  mostrarPlantas();
  mostrarRegarhoy();
  mostrarBiblioteca();
  filtrarPlanta();
}

btnGuardar.addEventListener("click", (event) => {
  event.preventDefault();
  registrarPlanta(
    nombrePlanta.value,
    frecuenciaRiego.value,
    fechaRiego.value,
    enFlor.value
  );
});

inicio();
