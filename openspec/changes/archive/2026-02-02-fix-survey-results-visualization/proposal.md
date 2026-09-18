## Why

La encuesta actual de "opinión general de la aplicación" tiene 4 preguntas, pero falta una pregunta adicional para obtener una valoración más completa. Además, la visualización de resultados muestra 4 tablas separadas (una por cada categoría) lo cual dificulta la comparación y análisis de los datos. Este cambio mejora la experiencia añadiendo una quinta pregunta y consolidando todas las distribuciones en una única tabla unificada.

## What Changes

- Añadir una quinta pregunta a la encuesta de satisfacción: "¿Recomendarías esta aplicación a otros usuarios?"
- Unificar las 4 tablas de distribución (que serán 5 con la nueva pregunta) en una sola tabla consolidada
- Actualizar el API para manejar la nueva categoría "recomendacion"
- Actualizar la lógica de cálculo de estadísticas para incluir la nueva categoría

## Capabilities

### New Capabilities
<!-- No se añaden nuevas capacidades, se modifican las existentes -->

### Modified Capabilities
- `survey-form`: Añadir quinta pregunta "recomendacion" al formulario de encuesta
- `survey-statistics-api`: Incluir la nueva categoría en promedios y distribuciones
- `survey-results-visualization`: Consolidar las 5 tablas de distribución en una única tabla

## Impact

- **Código afectado**:
  - [views/encuestas.ejs](views/encuestas.ejs) - añadir quinta pregunta al formulario
  - [lib/encuestasStore.js](lib/encuestasStore.js) - incluir "recomendacion" en cálculos de estadísticas
  - [routes/api/encuestas.js](routes/api/encuestas.js) - validar nuevo campo "recomendacion"
  - [views/encuestasResultados.ejs](views/encuestasResultados.ejs) - unificar tablas y añadir tarjeta de promedio

- **APIs**: El endpoint POST `/api/encuestas` aceptará un nuevo campo "recomendacion" (1-10). El endpoint GET `/api/encuestas/resultados` incluirá la nueva categoría en promedios y distribuciones.

- **Dependencias**: No requiere nuevas dependencias externas

- **Retrocompatibilidad**: Las respuestas existentes (sin campo "recomendacion") se mantendrán pero mostrarán valor 0 o N/A en la nueva categoría
