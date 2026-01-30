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

module.exports = router;
