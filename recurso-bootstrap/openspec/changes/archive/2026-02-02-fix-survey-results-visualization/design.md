## Context

GestiFleet tiene una encuesta de satisfacción con 4 preguntas (accesibilidad, colores, funcionalidad, equipo) que se almacenan en memoria en [lib/encuestasStore.js](../../lib/encuestasStore.js). La vista de resultados [views/encuestasResultados.ejs](../../views/encuestasResultados.ejs) muestra 5 tarjetas (total respuestas + 4 promedios) y 4 tablas de distribución separadas.

El sistema actual incluye:
- Formulario: [views/encuestas.ejs](../../views/encuestas.ejs) con 4 preguntas tipo select (1-10)
- API POST: `/api/encuestas` que valida y guarda respuestas
- API GET: `/api/encuestas/resultados` que devuelve estadísticas
- Vista de resultados: [views/encuestasResultados.ejs](../../views/encuestasResultados.ejs) con tarjetas y tablas

## Goals / Non-Goals

**Goals:**
- Añadir una quinta pregunta "¿Recomendarías esta aplicación a otros usuarios?" con escala 1-10
- Consolidar las 5 tablas de distribución en una única tabla con estructura: Valor | Accesibilidad | Colores | Funcionalidad | Equipo | Recomendación
- Mantener las tarjetas de promedio (añadiendo una sexta tarjeta para "Recomendación")
- Mantener retrocompatibilidad con respuestas existentes

**Non-Goals:**
- No cambiar el sistema de almacenamiento
- No añadir filtros ni ordenación a la tabla unificada
- No modificar la autenticación ni permisos existentes

## Decisions

### 1. Nueva pregunta: Recomendación

**Decisión**: Añadir campo "recomendacion" con la pregunta "¿Recomendarías esta aplicación a otros usuarios?" usando la misma escala Likert 1-10.

**Alternativas consideradas**:
- Pregunta de texto libre: más información pero más difícil de agregar estadísticamente
- Escala NPS (0-10 con categorización detractor/pasivo/promotor): más complejo de implementar

**Rationale**: Mantener consistencia con las preguntas existentes facilita el desarrollo y la visualización. Una pregunta de recomendación es estándar en encuestas de satisfacción.

### 2. Estructura de tabla unificada

**Decisión**: Crear una única tabla con la siguiente estructura:

| Valor | Accesibilidad | Colores | Funcionalidad | Equipo | Recomendación |
|-------|---------------|---------|---------------|--------|---------------|
| 1     | 2             | 1       | 3             | 0      | 1             |
| 2     | 1             | 2       | 1             | 1      | 0             |
| ...   | ...           | ...     | ...           | ...    | ...           |
| 10    | 5             | 4       | 6             | 8      | 7             |

**Alternativas consideradas**:
- Mantener tablas separadas con diseño más compacto: sigue ocupando mucho espacio vertical
- Tabla transpuesta (categorías en filas, valores en columnas): 10 columnas es demasiado ancho
- Pestañas/acordeón para cada categoría: oculta información, dificulta comparación

**Rationale**: La tabla unificada permite comparar fácilmente las distribuciones entre categorías en una sola vista. Las filas representan valores (1-10) y las columnas categorías, permitiendo ver patrones rápidamente.

### 3. Resaltado de valores máximos

**Decisión**: Resaltar con color verde (`table-success`) la celda con mayor cantidad en cada columna (categoría), no toda la fila.

**Alternativas consideradas**:
- Resaltar fila completa: confuso cuando diferentes categorías tienen máximos en distintos valores
- No resaltar nada: pierde información visual útil
- Usar gradiente de color por intensidad: más complejo de implementar

**Rationale**: Resaltar por celda permite identificar rápidamente el valor más común de cada categoría independientemente.

### 4. Manejo de respuestas existentes

**Decisión**: Las respuestas existentes (sin campo "recomendacion") se tratarán con valor `null` o ausente. En los cálculos:
- El promedio de recomendación se calcula solo con respuestas que tengan el campo
- La distribución mostrará 0 para valores sin datos

**Alternativas consideradas**:
- Migrar respuestas antiguas con valor por defecto (ej: 5): falsea los datos
- Eliminar respuestas antiguas: pérdida de datos

**Rationale**: Mantener integridad de datos. El sistema ya maneja el caso de 0 respuestas, se puede extender para manejar categorías parcialmente vacías.

### 5. Validación del nuevo campo

**Decisión**: El campo "recomendacion" será requerido en nuevas respuestas, validado como entero entre 1 y 10, igual que los otros campos.

**Rationale**: Mantener consistencia con la validación existente en [routes/api/encuestas.js](../../routes/api/encuestas.js).

## Risks / Trade-offs

**[Tabla más ancha]** → Con 6 columnas (valor + 5 categorías), la tabla puede ser difícil de leer en móviles.
- **Mitigación**: Usar `table-responsive` de Bootstrap para scroll horizontal en pantallas pequeñas.

**[Retrocompatibilidad de datos]** → Las respuestas existentes no tendrán valor para "recomendacion".
- **Mitigación**: Mostrar "N/A" o excluir del cálculo de promedio cuando no hay datos.

**[Breaking change en API]** → El POST ahora requiere campo adicional.
- **Mitigación**: Esto es aceptable dado que es una aplicación educativa sin clientes externos.
