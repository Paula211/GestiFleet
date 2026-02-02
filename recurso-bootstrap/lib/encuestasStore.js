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
 * @param {Object} data - Objeto con los campos: accesibilidad, colores, funcionalidad, equipo, recomendacion
 * @returns {Object} - La respuesta almacenada con timestamp
 */
function agregarRespuesta(data) {
  const respuesta = {
    accesibilidad: data.accesibilidad,
    colores: data.colores,
    funcionalidad: data.funcionalidad,
    equipo: data.equipo,
    recomendacion: data.recomendacion,
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

/**
 * Calcula estadísticas agregadas de todas las respuestas de encuestas
 * @returns {Object} - Objeto con totalRespuestas, promedios y distribuciones
 */
function calcularEstadisticas() {
  const totalRespuestas = respuestas.length;

  // Inicializar estructura de datos
  const categorias = ['accesibilidad', 'colores', 'funcionalidad', 'equipo', 'recomendacion'];
  const promedios = {};
  const distribuciones = {};

  // Inicializar distribuciones con todos los valores del 1 al 10
  categorias.forEach(categoria => {
    distribuciones[categoria] = {};
    for (let i = 1; i <= 10; i++) {
      distribuciones[categoria][i.toString()] = 0;
    }
  });

  // Si no hay respuestas, devolver estructura con valores en 0
  if (totalRespuestas === 0) {
    categorias.forEach(categoria => {
      promedios[categoria] = 0;
    });

    return {
      totalRespuestas,
      promedios,
      distribuciones
    };
  }

  // Calcular sumas y distribuciones (con contador separado para recomendacion por retrocompatibilidad)
  const sumas = {
    accesibilidad: 0,
    colores: 0,
    funcionalidad: 0,
    equipo: 0,
    recomendacion: 0
  };
  const contadores = {
    accesibilidad: 0,
    colores: 0,
    funcionalidad: 0,
    equipo: 0,
    recomendacion: 0
  };

  respuestas.forEach(respuesta => {
    categorias.forEach(categoria => {
      const valor = respuesta[categoria];
      // Manejar respuestas antiguas que no tienen el campo recomendacion
      if (valor !== undefined && valor !== null) {
        sumas[categoria] += valor;
        contadores[categoria]++;
        distribuciones[categoria][valor.toString()]++;
      }
    });
  });

  // Calcular promedios (usando contadores individuales para retrocompatibilidad)
  categorias.forEach(categoria => {
    promedios[categoria] = contadores[categoria] > 0 ? sumas[categoria] / contadores[categoria] : 0;
  });

  return {
    totalRespuestas,
    promedios,
    distribuciones
  };
}

module.exports = {
  agregarRespuesta,
  obtenerRespuestas,
  calcularEstadisticas
};
