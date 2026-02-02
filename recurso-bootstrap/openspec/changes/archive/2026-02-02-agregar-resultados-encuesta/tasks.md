## 1. Backend - Lógica de cálculo de estadísticas

- [x] 1.1 Agregar función `calcularEstadisticas()` en lib/encuestasStore.js que procese el array de respuestas
- [x] 1.2 Implementar cálculo de `totalRespuestas` (length del array)
- [x] 1.3 Implementar cálculo de `promedios` para cada categoría (accesibilidad, colores, funcionalidad, equipo)
- [x] 1.4 Implementar cálculo de `distribuciones` contando valores 1-10 por cada categoría
- [x] 1.5 Asegurar que distribuciones incluyan todas las claves del 1 al 10 (incluso con conteo 0)
- [x] 1.6 Manejar caso sin respuestas (totalRespuestas: 0, promedios: 0, distribuciones con conteos en 0)
- [x] 1.7 Exportar función `calcularEstadisticas` en module.exports de lib/encuestasStore.js

## 2. Backend - Endpoint API de estadísticas

- [x] 2.1 Agregar ruta GET '/estadisticas' en routes/api/encuestas.js con middleware isAuth
- [x] 2.2 Importar función `calcularEstadisticas` desde lib/encuestasStore.js en routes/api/encuestas.js
- [x] 2.3 Implementar handler que llame a calcularEstadisticas() y devuelva response JSON
- [x] 2.4 Estructurar response con formato: `{ success: true, data: { totalRespuestas, promedios, distribuciones } }`
- [x] 2.5 Agregar manejo de errores con try-catch que devuelva status 500 en caso de error
- [x] 2.6 Verificar que el endpoint requiera autenticación (middleware isAuth funcionando)

## 3. Backend - Ruta de vista de resultados

- [x] 3.1 Agregar ruta GET '/encuestas/resultados' en routes/encuestas.js con middleware isAuth
- [x] 3.2 Implementar handler que renderice vista 'encuestasResultados' con datos { title, usuario }
- [x] 3.3 Verificar que la ruta esté registrada correctamente en app.js

## 4. Frontend - Vista EJS de resultados

- [x] 4.1 Crear archivo views/encuestasResultados.ejs con estructura base de container Bootstrap
- [x] 4.2 Agregar encabezado con título "Resultados de Encuestas" e icono apropiado
- [x] 4.3 Crear sección con tarjeta para mostrar total de respuestas (display-4 o similar)
- [x] 4.4 Crear 4 tarjetas Bootstrap (col-md-3 o col-lg-3) para mostrar promedios de cada categoría
- [x] 4.5 Agregar indicadores de carga (spinner o texto "Cargando...") en secciones de estadísticas
- [x] 4.6 Implementar script JavaScript con DOMContentLoaded para fetch al endpoint /api/encuestas/estadisticas
- [x] 4.7 Implementar función para actualizar DOM con total de respuestas recibido del API
- [x] 4.8 Implementar función para actualizar DOM con promedios (formatear a 1 decimal)
- [x] 4.9 Crear sección con tablas HTML para mostrar distribuciones por categoría
- [x] 4.10 Implementar función para poblar tablas de distribución con valores 1-10 y sus conteos
- [x] 4.11 Agregar manejo de error en fetch para mostrar mensaje al usuario si falla la carga
- [x] 4.12 Implementar caso especial cuando totalRespuestas es 0 (mostrar mensaje "No hay respuestas todavía")
- [x] 4.13 Aplicar estilos consistentes con views/estadisticasAdmin.ejs (reutilizar clases CSS existentes)

## 5. Integración y verificación

- [x] 5.1 Probar endpoint /api/encuestas/estadisticas sin autenticación (debe redirigir o devolver 401)
- [x] 5.2 Probar endpoint /api/encuestas/estadisticas con autenticación y sin respuestas (verificar estructura con valores en 0)
- [x] 5.3 Agregar al menos 3 respuestas de prueba usando el formulario de encuestas
- [x] 5.4 Probar endpoint /api/encuestas/estadisticas con respuestas existentes (verificar cálculos correctos)
- [x] 5.5 Probar vista /encuestas/resultados sin autenticación (debe redirigir al login)
- [x] 5.6 Probar vista /encuestas/resultados con autenticación (verificar que se muestren estadísticas correctamente)
- [x] 5.7 Verificar que la vista sea responsive en viewport móvil (tarjetas apiladas verticalmente)
- [x] 5.8 Verificar manejo de error en la vista (simular fallo del API o desconexión de red)
