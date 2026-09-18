## Why

La vista de estadísticas de admin carece de métricas sobre encuestas. Además, la pregunta "¿Qué tan guapos son los creadores?" no es profesional para una aplicación de gestión de flotas.

## What Changes

- Añadir un 4º card en `estadisticasAdmin.ejs` mostrando el total de encuestas realizadas
- Modificar la ruta que renderiza estadísticas para incluir el conteo de encuestas
- Cambiar pregunta 4 de la encuesta (campo `equipo`) por: "¿Cómo valoras la atención del equipo de soporte?"
- Actualizar la vista de resultados si muestra el nombre de la pregunta

## Capabilities

### New Capabilities
- (ninguna)

### Modified Capabilities
- `estadisticas`: añadir card con total encuestas
- `encuestas`: cambiar pregunta 4 a algo profesional

## Impact

- **Vista**: `views/estadisticasAdmin.ejs` - nuevo card
- **Vista**: `views/encuestas.ejs` - texto pregunta 4
- **Vista**: `views/encuestasResultados.ejs` - si muestra nombre pregunta
- **Ruta**: endpoint que renderiza estadísticas admin - consultar total encuestas
- **Store**: `lib/encuestasStore.js` - posible método para contar encuestas
