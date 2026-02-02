## Context

La vista `estadisticasAdmin.ejs` muestra 3 cards (total reservas, vehículo más usado, concesionario con más reservas). El store `encuestasStore.js` ya tiene `calcularEstadisticas()` que devuelve `totalRespuestas`. La ruta `/estadisticas` en `routes/index.js` no incluye datos de encuestas.

## Goals / Non-Goals

**Goals:**
- Añadir 4º card con total de encuestas en estadísticas admin
- Cambiar pregunta 4 "¿Qué tan guapos son los creadores?" por "¿Cómo valoras la atención del equipo de soporte?"

**Non-Goals:**
- Cambiar estructura de datos de encuestas
- Modificar lógica de cálculo de estadísticas existente
- Añadir nuevas preguntas

## Decisions

1. **Obtener total encuestas**: Usar `encuestasStore.calcularEstadisticas().totalRespuestas` en la ruta `/estadisticas`
   - Alternativa: consulta BD → descartada porque encuestas están en memoria

2. **Posición del nuevo card**: Añadirlo como 4º card en la misma fila, cambiando `col-md-4` a `col-md-3` para los 4 cards
   - Alternativa: nueva fila → descartada para mantener compacidad

3. **Cambio de pregunta**: Solo modificar el texto del label, mantener campo `equipo` por retrocompatibilidad
   - Alternativa: renombrar campo → requeriría migración de datos existentes

## Risks / Trade-offs

- [Encuestas en memoria] → Tras reinicio servidor, total será 0. Aceptable para este cambio.
- [Cambio semántico campo `equipo`] → Datos anteriores medían otra cosa. Mitigación: aceptar inconsistencia histórica.
