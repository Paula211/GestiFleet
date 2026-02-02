const express = require('express');
const router = express.Router();
const { isAuthApi } = require('../../middleware/auth');
const { agregarRespuesta, calcularEstadisticas } = require('../../lib/encuestasStore');

/**
 * POST /api/encuestas
 * Recibe y almacena una respuesta de encuesta de satisfacción
 *
 * Body esperado: { accesibilidad, colores, funcionalidad, equipo, recomendacion }
 * Todos los valores deben ser números enteros entre 1 y 10
 */
router.post('/encuestas', isAuthApi, (req, res) => {
  try {
    const { accesibilidad, colores, funcionalidad, equipo, recomendacion } = req.body;

    // Validación de campos requeridos
    if (accesibilidad === undefined || colores === undefined ||
        funcionalidad === undefined || equipo === undefined || recomendacion === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son requeridos'
      });
    }

    // Convertir a números
    const valores = {
      accesibilidad: Number(accesibilidad),
      colores: Number(colores),
      funcionalidad: Number(funcionalidad),
      equipo: Number(equipo),
      recomendacion: Number(recomendacion)
    };

    // Validación de tipos (deben ser números válidos)
    if (isNaN(valores.accesibilidad) || isNaN(valores.colores) ||
        isNaN(valores.funcionalidad) || isNaN(valores.equipo) || isNaN(valores.recomendacion)) {
      return res.status(400).json({
        success: false,
        error: 'Todos los valores deben ser números'
      });
    }

    // Validación de que sean enteros
    if (!Number.isInteger(valores.accesibilidad) || !Number.isInteger(valores.colores) ||
        !Number.isInteger(valores.funcionalidad) || !Number.isInteger(valores.equipo) ||
        !Number.isInteger(valores.recomendacion)) {
      return res.status(422).json({
        success: false,
        error: 'Los valores deben ser números enteros'
      });
    }

    // Validación de rango (1-10)
    const valoresArray = [valores.accesibilidad, valores.colores, valores.funcionalidad, valores.equipo, valores.recomendacion];
    const fueraDeRango = valoresArray.some(v => v < 1 || v > 10);

    if (fueraDeRango) {
      return res.status(422).json({
        success: false,
        error: 'Los valores deben estar entre 1 y 10'
      });
    }

    // Almacenar la respuesta
    const respuestaGuardada = agregarRespuesta(valores);

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Encuesta guardada correctamente',
      data: respuestaGuardada
    });

  } catch (error) {
    console.error('Error procesando encuesta:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/encuestas/resultados
 * Devuelve estadísticas agregadas de todas las encuestas
 *
 * Response: { success, data: { totalRespuestas, promedios, distribuciones } }
 */
router.get('/encuestas/resultados', isAuthApi, (req, res) => {
  try {
    console.log('GET /api/encuestas/resultados - Usuario:', req.session.usuario?.nombre);
    const estadisticas = calcularEstadisticas();
    console.log('Estadísticas calculadas:', JSON.stringify(estadisticas));

    return res.status(200).json({
      success: true,
      data: estadisticas
    });
  } catch (error) {
    console.error('Error calculando estadísticas:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;
