/**
 * Módulo de almacenamiento en memoria para encuestas de satisfacción
 *
 * Almacena las respuestas de encuestas en un array en memoria.
 * Los datos se pierden al reiniciar el servidor (almacenamiento volátil).
 */

// Array para almacenar respuestas de encuestas
const respuestas = [];

/**
 * Agrega una nueva respuesta de encuesta al array
 * @param {Object} data - Objeto con los campos: accesibilidad, colores, funcionalidad, equipo
 * @returns {Object} - La respuesta almacenada con timestamp
 */
function agregarRespuesta(data) {
  const respuesta = {
    accesibilidad: data.accesibilidad,
    colores: data.colores,
    funcionalidad: data.funcionalidad,
    equipo: data.equipo,
    timestamp: new Date().toISOString()
  };

  respuestas.push(respuesta);
  return respuesta;
}

/**
 * Obtiene todas las respuestas almacenadas
 * @returns {Array} - Array con todas las respuestas
 */
function obtenerRespuestas() {
  return respuestas;
}

module.exports = {
  agregarRespuesta,
  obtenerRespuestas
};
