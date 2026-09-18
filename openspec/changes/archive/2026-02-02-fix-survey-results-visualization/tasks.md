## 1. Backend - Actualizar almacenamiento y cálculos

- [x] 1.1 Modificar función `agregarRespuesta()` en lib/encuestasStore.js para aceptar campo "recomendacion"
- [x] 1.2 Actualizar función `calcularEstadisticas()` para incluir "recomendacion" en promedios
- [x] 1.3 Actualizar función `calcularEstadisticas()` para incluir "recomendacion" en distribuciones
- [x] 1.4 Manejar caso de respuestas antiguas sin campo "recomendacion" (excluir del promedio, mostrar 0 en distribución)

## 2. Backend - Actualizar validación de API

- [x] 2.1 Añadir validación del campo "recomendacion" en POST /api/encuestas (routes/api/encuestas.js)
- [x] 2.2 Validar que "recomendacion" sea entero entre 1 y 10
- [x] 2.3 Añadir "recomendacion" como campo requerido en la validación

## 3. Frontend - Actualizar formulario de encuesta

- [x] 3.1 Añadir quinta pregunta "¿Recomendarías esta aplicación a otros usuarios?" en views/encuestas.ejs
- [x] 3.2 Crear select con opciones 1-10 para el nuevo campo "recomendacion"
- [x] 3.3 Actualizar script de envío para incluir el valor de "recomendacion" en el JSON

## 4. Frontend - Actualizar vista de resultados

- [x] 4.1 Añadir sexta tarjeta de promedio para "Recomendación" en views/encuestasResultados.ejs
- [x] 4.2 Eliminar las 4 tablas de distribución separadas
- [x] 4.3 Crear nueva tabla unificada con estructura: Valor | Accesibilidad | Colores | Funcionalidad | Equipo | Recomendación
- [x] 4.4 Actualizar función `poblarTabla()` para generar filas de la tabla unificada (valores 1-10 con 5 columnas de datos)
- [x] 4.5 Implementar resaltado por celda (no por fila) para el valor máximo de cada categoría
- [x] 4.6 Actualizar script para obtener y mostrar promedio de "recomendacion"
- [x] 4.7 Aplicar clase `table-responsive` para scroll horizontal en móviles

## 5. Integración y verificación

- [x] 5.1 Probar envío de nueva encuesta con los 5 campos
- [x] 5.2 Verificar que la API valide correctamente el nuevo campo "recomendacion"
- [x] 5.3 Verificar que los promedios se calculen correctamente incluyendo "recomendacion"
- [x] 5.4 Verificar que la tabla unificada muestre todas las distribuciones correctamente
- [x] 5.5 Verificar el resaltado de celdas con valores máximos por columna
- [x] 5.6 Probar visualización en viewport móvil (scroll horizontal de la tabla)
- [x] 5.7 Verificar manejo de respuestas antiguas (sin "recomendacion") en los cálculos
