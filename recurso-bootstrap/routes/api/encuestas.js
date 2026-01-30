const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middleware/auth');
const { agregarRespuesta } = require('../../lib/encuestasStore');

/**
 * POST /api/encuestas
 * Recibe y almacena una respuesta de encuesta de satisfacción
 *
 * Body esperado: { accesibilidad, colores, funcionalidad, equipo }
 * Todos los valores deben ser números enteros entre 1 y 10
 */
router.post('/encuestas', isAuth, (req, res) => {
  try {
    const { accesibilidad, colores, funcionalidad, equipo } = req.body;

    // Validación de campos requeridos
    if (accesibilidad === undefined || colores === undefined ||
        funcionalidad === undefined || equipo === undefined) {
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
      equipo: Number(equipo)
    };

    // Validación de tipos (deben ser números válidos)
    if (isNaN(valores.accesibilidad) || isNaN(valores.colores) ||
        isNaN(valores.funcionalidad) || isNaN(valores.equipo)) {
      return res.status(400).json({
        success: false,
        error: 'Todos los valores deben ser números'
      });
    }

    // Validación de que sean enteros
    if (!Number.isInteger(valores.accesibilidad) || !Number.isInteger(valores.colores) ||
        !Number.isInteger(valores.funcionalidad) || !Number.isInteger(valores.equipo)) {
      return res.status(422).json({
        success: false,
        error: 'Los valores deben ser números enteros'
      });
    }

    // Validación de rango (1-10)
    const valoresArray = [valores.accesibilidad, valores.colores, valores.funcionalidad, valores.equipo];
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

module.exports = router;
