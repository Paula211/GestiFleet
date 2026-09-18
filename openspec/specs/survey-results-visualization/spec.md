# Survey Results Visualization

## Purpose

Esta capacidad proporciona una interfaz web para visualizar resultados agregados de encuestas de satisfacción, mostrando estadísticas mediante tarjetas interactivas y una tabla unificada de distribución con carga dinámica mediante AJAX.

## Requirements

### Requirement: Ruta para visualizar resultados de encuestas

El sistema SHALL proporcionar una ruta web GET que renderice una vista HTML con los resultados agregados de las encuestas de satisfacción.

**Route details:**
- **Path**: `/encuestas/resultados`
- **Method**: GET
- **Auth required**: Sí (middleware `isAuth`)
- **Response**: Renderiza vista EJS `encuestasResultados.ejs`
- **Template data**: `{ title, usuario }`

#### Scenario: Acceso a la vista con autenticación

- **WHEN** un usuario autenticado navega a `/encuestas/resultados`
- **THEN** el sistema renderiza la vista `encuestasResultados.ejs` con status 200 y datos del usuario en sesión

#### Scenario: Acceso sin autenticación

- **WHEN** un usuario NO autenticado intenta acceder a `/encuestas/resultados`
- **THEN** el sistema redirige al login o devuelve status 401 según el comportamiento del middleware `isAuth`

### Requirement: Vista de resultados con estructura HTML

El sistema SHALL renderizar una vista EJS que incluya estructura base con contenedor, encabezado y secciones para mostrar estadísticas.

#### Scenario: Renderizado de estructura base

- **WHEN** se renderiza la vista `encuestasResultados.ejs`
- **THEN** la página incluye un contenedor Bootstrap, un encabezado con título "Resultados de Encuestas" (o similar), secciones para tarjetas de estadísticas y una tabla unificada de distribución

### Requirement: Carga dinámica de estadísticas mediante AJAX

El sistema SHALL cargar los datos estadísticos dinámicamente mediante fetch al endpoint `/api/encuestas/resultados` cuando la vista se carga en el navegador.

**Ejemplo de implementación:**
```javascript
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/encuestas/resultados');
    const result = await response.json();

    if (result.success) {
      mostrarEstadisticas(result.data);
    } else {
      mostrarError(result.error);
    }
  } catch (error) {
    mostrarError('Error al cargar estadísticas');
  }
});
```

#### Scenario: Carga exitosa de estadísticas

- **WHEN** la vista se carga en el navegador y el endpoint de estadísticas devuelve datos exitosamente
- **THEN** el JavaScript de la vista hace fetch a `/api/encuestas/resultados` y actualiza el DOM con los datos recibidos

#### Scenario: Error al cargar estadísticas

- **WHEN** la vista se carga pero el endpoint de estadísticas falla o no responde
- **THEN** el JavaScript muestra un mensaje de error al usuario indicando que no se pudieron cargar las estadísticas

### Requirement: Visualización de promedios en tarjetas

El sistema SHALL mostrar el promedio de cada categoría (accesibilidad, colores, funcionalidad, equipo, recomendacion) en tarjetas visuales estilo Bootstrap card.

#### Scenario: Mostrar tarjetas con promedios

- **WHEN** se cargan estadísticas con promedios calculados
- **THEN** la vista muestra 6 tarjetas Bootstrap: 1 tarjeta para el total de respuestas y 5 tarjetas para cada categoría (accesibilidad, colores, funcionalidad, equipo, recomendación), cada una con el nombre de la categoría y su promedio formateado con 1 decimal

#### Scenario: Mostrar indicador de carga antes de recibir datos

- **WHEN** la vista se está cargando pero aún no se han recibido los datos del API
- **THEN** la vista muestra un spinner o mensaje "Cargando..." en las secciones de estadísticas

### Requirement: Visualización de total de respuestas

El sistema SHALL mostrar el número total de respuestas de encuestas recibidas de forma destacada.

#### Scenario: Mostrar total en tarjeta principal

- **WHEN** se cargan las estadísticas
- **THEN** la vista muestra el valor de `totalRespuestas` en una tarjeta destacada con estilo numérico grande (display-4 o similar)

#### Scenario: Mostrar mensaje cuando no hay respuestas

- **WHEN** las estadísticas indican `totalRespuestas: 0`
- **THEN** la vista muestra un mensaje informativo indicando "No hay respuestas de encuestas todavía" o similar

### Requirement: Visualización de distribuciones en tabla unificada

El sistema SHALL mostrar las distribuciones de valores (1-10) para todas las categorías en una única tabla HTML unificada.

**Estructura de la tabla:**
| Valor | Accesibilidad | Colores | Funcionalidad | Equipo | Recomendación |
|-------|---------------|---------|---------------|--------|---------------|
| 1     | (count)       | (count) | (count)       | (count)| (count)       |
| ...   | ...           | ...     | ...           | ...    | ...           |
| 10    | (count)       | (count) | (count)       | (count)| (count)       |

#### Scenario: Tabla unificada de distribución

- **WHEN** se cargan las estadísticas con distribuciones
- **THEN** la vista muestra una única tabla con columnas: "Valor" (1-10), "Accesibilidad", "Colores", "Funcionalidad", "Equipo", "Recomendación", mostrando el conteo de cada valor por categoría

#### Scenario: Resaltar valores con mayor frecuencia por categoría

- **WHEN** se muestra la tabla de distribución
- **THEN** las celdas con el valor más alto de respuestas en cada columna (categoría) se resaltan con clase `table-success` (verde)

### Requirement: Diseño responsive y consistente

El sistema SHALL aplicar estilos Bootstrap consistentes con el resto de la aplicación GestiFleet, incluyendo diseño responsive.

#### Scenario: Vista responsive en móvil

- **WHEN** la vista se accede desde un dispositivo móvil o viewport estrecho
- **THEN** las tarjetas de estadísticas se reorganizan verticalmente usando el sistema de grid de Bootstrap (col-xl-2, col-lg-4, col-md-6) y la tabla usa clase `table-responsive` para scroll horizontal

#### Scenario: Uso de iconos y estilos de la app

- **WHEN** se renderiza la vista
- **THEN** la vista utiliza iconos de Bootstrap Icons (si están disponibles en la app) y clases CSS consistentes con otras vistas como `estadisticasAdmin.ejs`
