## Context

GestiFleet es una aplicación web con arquitectura server-rendered (EJS) y rutas API REST que devuelven JSON. La aplicación ya cuenta con un sistema de encuestas que permite a usuarios autenticados enviar respuestas de satisfacción sobre 4 categorías (accesibilidad, colores, funcionalidad, equipo) con valores del 1 al 10. Las respuestas se almacenan en memoria en [lib/encuestasStore.js](../../lib/encuestasStore.js).

El sistema actual incluye:
- Vista de formulario: [views/encuestas.ejs](../../views/encuestas.ejs)
- API endpoint POST: `/api/encuestas` en [routes/api/encuestas.js](../../routes/api/encuestas.js)
- Almacenamiento volátil en memoria con funciones `agregarRespuesta()` y `obtenerRespuestas()`

La aplicación ya tiene un patrón establecido para mostrar estadísticas en [views/estadisticasAdmin.ejs](../../views/estadisticasAdmin.ejs) usando tarjetas Bootstrap y tablas HTML, sin librerías de gráficos complejas.

## Goals / Non-Goals

**Goals:**
- Permitir visualizar resultados agregados de encuestas a usuarios autenticados
- Calcular estadísticas: promedio por categoría, total de respuestas, y distribución de valores
- Presentar datos en formato tabular y visual siguiendo los patrones de diseño existentes
- Mantener la arquitectura actual (server-rendered + AJAX para datos dinámicos)
- Reutilizar componentes y estilos existentes (Bootstrap cards, tablas)

**Non-Goals:**
- No implementar gráficos interactivos complejos (Chart.js, D3.js)
- No cambiar el sistema de almacenamiento (persistir en base de datos)
- No agregar control de acceso basado en roles (todos los usuarios autenticados pueden ver resultados)
- No implementar filtros avanzados (por fecha, usuario, etc.)

## Decisions

### 1. Cálculo de estadísticas en el servidor

**Decisión**: Agregar función `calcularEstadisticas()` en [lib/encuestasStore.js](../../lib/encuestasStore.js) que procesa el array de respuestas y retorna un objeto con:
- `totalRespuestas`: número total de encuestas
- `promedios`: objeto con promedio de cada categoría
- `distribuciones`: objeto con conteo de cada valor (1-10) por categoría

**Alternativas consideradas**:
- Calcular en el cliente con JavaScript: requeriría enviar todas las respuestas brutas, menos eficiente
- Calcular en la ruta API: menos reutilizable y mezcla lógica de negocio con routing

**Rationale**: Centralizar la lógica de negocio en el módulo de almacenamiento facilita testing y reutilización. El servidor calcula una vez y envía datos agregados, reduciendo payload.

### 2. Presentación visual simple con Bootstrap

**Decisión**: Usar tarjetas Bootstrap (siguiendo el patrón de [estadisticasAdmin.ejs](../../views/estadisticasAdmin.ejs)) para mostrar promedios y tablas HTML para distribuciones.

**Alternativas consideradas**:
- Chart.js para gráficos de barras/pastel: añade complejidad y dependencia externa
- Canvas API nativo: requiere código personalizado de renderizado
- Gráficos SVG inline: más complejo de mantener

**Rationale**: La aplicación no usa librerías de gráficos actualmente. Mantener consistencia con estadísticas existentes simplifica el desarrollo y mantiene el bundle size reducido. Las tablas HTML son accesibles y suficientes para mostrar distribuciones.

### 3. Estructura del endpoint API

**Decisión**: Crear GET `/api/encuestas/estadisticas` en [routes/api/encuestas.js](../../routes/api/encuestas.js) que devuelve:

```json
{
  "success": true,
  "data": {
    "totalRespuestas": 42,
    "promedios": {
      "accesibilidad": 7.5,
      "colores": 8.2,
      "funcionalidad": 6.8,
      "equipo": 9.1
    },
    "distribuciones": {
      "accesibilidad": { "1": 2, "2": 1, "3": 3, ..., "10": 5 },
      "colores": { ... },
      "funcionalidad": { ... },
      "equipo": { ... }
    }
  }
}
```

**Alternativas consideradas**:
- Endpoint separado por cada estadística (`/promedios`, `/distribuciones`): más requests HTTP
- Incluir respuestas individuales en el mismo endpoint: payload innecesariamente grande

**Rationale**: Una sola petición reduce latencia. Los datos agregados son compactos. Estructura JSON consistente con otros endpoints de la app.

### 4. Renderizado híbrido (server + client)

**Decisión**:
- Renderizar la estructura HTML de la vista en servidor (EJS) con middleware `isAuth`
- Cargar estadísticas dinámicamente con fetch al endpoint API desde el cliente
- Mostrar spinner/loading durante la carga

**Alternativas consideradas**:
- Renderizado 100% server-side: calcular estadísticas en cada request GET de la vista
- Renderizado 100% client-side (SPA): requiere cambio arquitectural significativo

**Rationale**: Sigue el patrón híbrido usado en [views/encuestas.ejs](../../views/encuestas.ejs) donde el formulario es server-rendered pero el submit es AJAX. Permite actualizaciones dinámicas sin full-page refresh.

### 5. Integración con sistema de rutas existente

**Decisión**:
- Agregar ruta `GET /encuestas/resultados` en [routes/encuestas.js](../../routes/encuestas.js)
- Reutilizar middleware `isAuth` para proteger acceso
- Registrar la ruta API en el archivo de rutas API existente

**Rationale**: Mantiene la organización actual donde rutas de vistas van en `routes/` y APIs en `routes/api/`.

## Risks / Trade-offs

**[Almacenamiento volátil en memoria]** → Las estadísticas se recalculan desde el array en cada request. Con muchas respuestas (>1000), el cálculo puede ser lento.
- **Mitigación**: El scope actual es educativo/prototipo. Si escala, migrar a base de datos con índices y agregaciones SQL.

**[Sin caché de resultados]** → Cada request recalcula todas las estadísticas incluso si no hay nuevas respuestas.
- **Mitigación**: Aceptable para el scope actual. Implementar caché si performance se degrada (ej: caché invalidado al agregar nueva respuesta).

**[Acceso sin roles]** → Todos los usuarios autenticados (empleados y admins) pueden ver resultados agregados.
- **Mitigación**: Según contexto del proyecto, esto es aceptable. Los datos son agregados y anónimos. Si se requiere, agregar check de rol admin en el middleware.

**[Visualización limitada]** → Sin gráficos interactivos puede ser menos intuitivo que librerías como Chart.js.
- **Mitigación**: Las tablas y cards son suficientes para el objetivo. Evaluar agregar Chart.js en futuro si usuarios lo solicitan.

**[Sin filtros temporales]** → No se pueden ver tendencias por período o filtrar respuestas antiguas.
- **Mitigación**: Out of scope. El timestamp existe en cada respuesta, facilitando agregar filtros en el futuro.
