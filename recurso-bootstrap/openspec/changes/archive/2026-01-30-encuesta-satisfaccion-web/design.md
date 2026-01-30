## Context

Gestifleet es una aplicación Node.js + Express con vistas server-rendered usando EJS y llamadas AJAX para consumir endpoints REST JSON. Actualmente no existe ningún mecanismo para recoger feedback de usuarios sobre la experiencia de uso de la aplicación. Esta funcionalidad será añadida como una nueva sección independiente accesible desde el navbar.

La aplicación ya tiene:
- Sistema de autenticación con sesiones (express-session)
- Estructura de rutas separada: `routes/views/*` para vistas y `routes/api/*` para endpoints REST
- Plantillas EJS con partials para componentes reutilizables (navbar, etc.)

## Goals / Non-Goals

**Goals:**
- Añadir una encuesta de satisfacción simple y funcional accesible desde el navbar
- Recoger feedback sobre 4 dimensiones: accesibilidad, colores, funcionalidades, equipo
- Almacenar respuestas en memoria (persistencia no crítica, reinicio limpia datos)
- Usar tecnologías existentes del stack (Express, EJS, vanilla JS)

**Non-Goals:**
- Persistencia permanente en base de datos (se requiere almacenamiento en memoria)
- Análisis estadístico avanzado o dashboards de resultados
- Múltiples tipos de encuestas o sistema configurable
- Autenticación especial (usa la autenticación existente de la app)
- Prevención de envíos duplicados por usuario

## Decisions

### 1. Almacenamiento en memoria vs Base de Datos
**Decisión**: Usar un array en memoria en el servidor Node.js

**Rationale**:
- Requisito explícito del usuario
- Simple para implementar (no requiere migración de BD)
- Adecuado para una funcionalidad de feedback no crítica
- Los datos se pierden al reiniciar el servidor, pero es aceptable para este caso de uso

**Alternativas consideradas**:
- MySQL: Rechazada porque el requisito especifica almacenamiento en memoria
- Redis: Excesivo para esta necesidad simple

**Implementación**: Crear un módulo `lib/encuestasStore.js` que exporte un array y funciones helper para añadir/consultar respuestas.

### 2. Formato de datos de respuestas
**Decisión**: Usar objetos planos con estructura `{accesibilidad: Number, colores: Number, funcionalidad: Number, equipo: Number, timestamp: Date}`

**Rationale**:
- Formato solicitado por el usuario (diccionario con pares clave-valor)
- Fácil de serializar como JSON para el endpoint API
- Añadir timestamp permite análisis temporal posterior si se desea
- Valores numéricos (1-10) para escala Likert

**Estructura**:
```javascript
{
  accesibilidad: 8,
  colores: 9,
  funcionalidad: 7,
  equipo: 10,
  timestamp: "2026-01-30T10:30:00Z"
}
```

### 3. Rutas y endpoints
**Decisión**:
- Vista: `GET /encuestas` → renderiza formulario EJS
- API: `POST /api/encuestas` → recibe y almacena respuesta

**Rationale**:
- Sigue el patrón existente de la aplicación (views separadas de API)
- Permite AJAX desde el formulario para mejor UX
- Consistente con estructura actual `routes/views/*` y `routes/api/*`

### 4. Escala de valoración
**Decisión**: Usar `<select>` con opciones 1-10 para cada pregunta

**Rationale**:
- Requisito explícito del usuario (usar select)
- Escala Likert estándar de 1-10 es familiar para usuarios
- Select previene errores de validación (solo valores permitidos)

**Implementación**: 4 elementos select con las mismas opciones (1-10), labels descriptivos por pregunta

### 5. Middleware de autenticación
**Decisión**: Aplicar middleware de autenticación existente a ambas rutas (vista y API)

**Rationale**:
- Solo usuarios autenticados deben poder responder encuestas
- Consistente con el modelo de seguridad de la app
- Previene spam de respuestas anónimas

## Risks / Trade-offs

**[Risk]** Pérdida de datos al reiniciar servidor
→ **Mitigation**: Documentar claramente que es almacenamiento en memoria volátil. Si se requiere persistencia en el futuro, migrar a tabla MySQL es trivial.

**[Risk]** No hay prevención de envíos duplicados por usuario
→ **Mitigation**: Aceptado como trade-off para simplicidad. Si se requiere en el futuro, añadir id_usuario al objeto de respuesta y validar antes de insertar.

**[Risk]** Array en memoria no escalará con miles de respuestas
→ **Mitigation**: Para el alcance educativo/demo de esta app es aceptable. Si crece, implementar límite máximo de respuestas o rotación.

**[Trade-off]** Escala 1-10 vs radio buttons con etiquetas textuales
→ **Decision**: Select con números es más compacto visualmente y cumple el requisito del usuario. Trade-off: menos descriptivo que "Muy en desacuerdo / Neutral / Muy de acuerdo".

## Migration Plan

**Deployment**:
1. Añadir módulo `lib/encuestasStore.js` con estructura de datos
2. Crear rutas: `routes/views/encuestas.js` y `routes/api/encuestas.js`
3. Crear vista `views/encuestas.ejs`
4. Modificar `views/partials/navbar.ejs` para añadir enlace
5. Registrar rutas en `app.js` o archivo principal de rutas

**Rollback**:
- Eliminar enlace del navbar
- Comentar registros de rutas en app.js
- No requiere rollback de BD (no persiste datos)

**Testing**:
- Verificar que formulario renderiza correctamente
- Enviar respuesta y verificar que se almacena en array
- Verificar que autenticación protege las rutas
- Comprobar que reiniciar servidor limpia las respuestas

## Open Questions

- ¿Se requiere alguna vista para consultar los resultados agregados? (actualmente solo se recopilan)
- ¿Debe haber algún rol específico (admin) que pueda ver todas las respuestas?
- ¿Feedback visual después de enviar el formulario? (mensaje de éxito, redirección, etc.)
