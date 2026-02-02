## ADDED Requirements

### Requirement: Mostrar total de encuestas en estadísticas admin
La vista de estadísticas de administrador DEBE mostrar un card con el número total de encuestas realizadas.

#### Scenario: Admin visualiza total de encuestas
- **WHEN** un administrador accede a `/estadisticas`
- **THEN** se muestra un card con el total de encuestas completadas

#### Scenario: Sin encuestas registradas
- **WHEN** no hay encuestas en el sistema
- **THEN** el card muestra "0" como total de encuestas
