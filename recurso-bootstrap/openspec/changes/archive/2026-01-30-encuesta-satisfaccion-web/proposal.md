## Why

Los usuarios necesitan una forma de proporcionar feedback sobre su experiencia con la aplicación Gestifleet. Una encuesta de satisfacción permitirá recoger opiniones sobre accesibilidad, diseño, funcionalidades y el equipo de desarrollo, ayudando a identificar áreas de mejora y medir la satisfacción general.

## What Changes

- Añadir enlace "Encuestas" en la barra de navegación principal
- Crear nueva ruta `/encuestas` que muestre un formulario de satisfacción
- Implementar formulario con 4 preguntas tipo Likert (escala de acuerdo/desacuerdo) usando `<select>`:
  - Accesibilidad de la web
  - Colores y diseño visual utilizados
  - Funcionalidades añadidas
  - Valoración del equipo de desarrollo
- Almacenar resultados en memoria como array de objetos JSON (formato: `{accesibilidad: 10, colores: 8, funcionalidad: 9, equipo: 10}`)
- Endpoint API para recibir y almacenar las respuestas de la encuesta

## Capabilities

### New Capabilities
- `encuesta-satisfaccion`: Sistema de encuestas de satisfacción con formulario web, almacenamiento en memoria y visualización de resultados

### Modified Capabilities
<!-- No se modifican capacidades existentes -->

## Impact

**Affected Code**:
- `views/partials/navbar.ejs` o plantilla de navegación principal - añadir enlace
- `routes/views/*` - nueva ruta para renderizar vista de encuesta
- `routes/api/*` - nuevo endpoint POST para recibir respuestas
- `views/` - nueva plantilla EJS para el formulario de encuesta

**New Files**:
- Estructura de datos en memoria (array global o módulo) para almacenar respuestas
- Vista EJS del formulario de encuesta
- Controlador/ruta para manejar la lógica de encuestas

**Dependencies**: Ninguna nueva dependencia requerida (usa Express, EJS y JavaScript vanilla existentes)

**User Impact**: Nueva funcionalidad opcional accesible desde el navbar para todos los usuarios autenticados
