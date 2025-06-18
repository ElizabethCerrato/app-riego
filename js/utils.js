// utils.js
// Funciones auxiliares para validar datos, realizar cálculos, etc.

export function validarNombre(nombre) {
  let nombreValido = nombre.trim().match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/);
  return nombreValido ? true : false;
}

export function validarFecha(cadenaFecha) {
  const fechaValida = new Date(cadenaFecha);
  fechaValida.setHours(0, 0, 0, 0);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return fechaValida.getTime() > hoy.getTime() ? false : true;
}

export function calcularProximaFecha(ultimaFecha, frecuencia) {
  const fechaObj = new Date(ultimaFecha);
  fechaObj.setHours(0, 0, 0, 0);
  const fechaTratada = fechaObj.getTime() + frecuencia * (1000 * 60 * 60 * 24);
  const resultadoFecha = new Date(fechaTratada);

  return resultadoFecha;
}

export function tocaRegarHoy(ultimaFecha, frecuencia) {
  const fechaHoy = new Date().getTime();
  const proximaFecha = calcularProximaFecha(ultimaFecha, frecuencia);
  return fechaHoy >= proximaFecha.getTime() ? true : false;
}
export function capitalizarNombre(nombre) {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

export function generarId() {
  const id = Date.now();
  return id;
}
export function formatearFecha(fecha) {
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate().toString();
  const mes = (fechaObj.getMonth() + 1).toString();
  const anyo = fechaObj.getFullYear().toString();

  return dia.padStart(2, 0) + "-" + mes.padStart(2, 0) + "-" + anyo;
}

export function limpiarFormulario(f) {
  f.reset();
}
