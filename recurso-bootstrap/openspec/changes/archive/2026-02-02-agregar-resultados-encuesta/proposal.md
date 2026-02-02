## Why

La aplicación GestiFleet ya permite a los usuarios enviar encuestas de satisfacción con 4 categorías (accesibilidad, colores, funcionalidad, equipo). Sin embargo, los administradores no tienen forma de visualizar estadísticas agregadas de estas respuestas. Este cambio permite analizar el feedback de usuarios mediante estadísticas calculadas y gráficos visuales.

## What Changes

- Nueva vista web para mostrar resultados agregados de encuestas con estadísticas y gráficos
- API REST endpoint para obtener estadísticas calculadas (promedios, totales, distribución)
- Lógica de cálculo de estadísticas en el módulo encuestasStore
- Protección de acceso mediante autenticación (solo usuarios autenticados)

## Capabilities

### New Capabilities
- `survey-results-visualization`: Vista web que muestra estadísticas de encuestas con gráficos interactivos y tablas de datos agregados
- `survey-statistics-api`: Endpoint API para calcular y devolver estadísticas agregadas de las respuestas de encuestas

### Modified Capabilities
<!-- No se modifican capacidades existentes -->

## Impact

- **Código afectado**:
  - [lib/encuestasStore.js](lib/encuestasStore.js) - agregar función para calcular estadísticas
  - [routes/encuestas.js](routes/encuestas.js) - nueva ruta GET para la vista de resultados
  - [routes/api/encuestas.js](routes/api/encuestas.js) - nuevo endpoint GET para obtener estadísticas
  - Nueva vista [views/encuestasResultados.ejs](views/encuestasResultados.ejs) para mostrar resultados

- **APIs**: Nuevo endpoint GET `/api/encuestas/estadisticas` que devuelve JSON con estadísticas calculadas

- **Dependencias**: No requiere nuevas dependencias externas
