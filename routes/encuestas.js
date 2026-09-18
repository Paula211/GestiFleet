const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');

/**
 * GET /encuestas
 * Renderiza el formulario de encuesta de satisfacción
 * Requiere autenticación
 */
router.get('/encuestas', isAuth, (req, res) => {
  res.render('encuestas', {
    title: 'Encuesta de Satisfacción',
    usuario: req.session.usuario
  });
});

/**
 * GET /encuestas/resultados
 * Renderiza la vista con resultados y estadísticas de encuestas
 * Requiere autenticación
 */
router.get('/encuestas/resultados', isAuth, (req, res) => {
  res.render('encuestasResultados', {
    title: 'Resultados de Encuestas',
    usuario: req.session.usuario
  });
});

module.exports = router;
