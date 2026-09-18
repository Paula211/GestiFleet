## MODIFIED Requirements

### Requirement: Pregunta 4 de la encuesta
La encuesta de satisfacción DEBE incluir una pregunta sobre la atención del equipo de soporte (campo `equipo`). El texto DEBE ser: "¿Cómo valoras la atención del equipo de soporte?"

#### Scenario: Usuario ve pregunta 4
- **WHEN** un usuario accede al formulario de encuesta
- **THEN** la pregunta 4 muestra "¿Cómo valoras la atención del equipo de soporte?"

#### Scenario: Resultados muestran nombre actualizado
- **WHEN** un usuario ve los resultados de encuestas
- **THEN** la categoría correspondiente se muestra como "Atención del equipo de soporte" o similar texto profesional
