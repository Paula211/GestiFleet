# Encuesta de Satisfacción

Sistema de encuestas de satisfacción que permite a usuarios autenticados proporcionar feedback sobre la aplicación mediante un formulario web con almacenamiento en memoria.

## ADDED Requirements

### Requirement: Navbar debe incluir enlace a encuestas
El sistema SHALL incluir un enlace "Encuestas" en la barra de navegación principal que dirija a la página de encuesta de satisfacción.

#### Scenario: Usuario autenticado ve enlace en navbar
- **WHEN** un usuario autenticado visualiza cualquier página de la aplicación
- **THEN** el navbar debe mostrar un enlace visible con texto "Encuestas" que apunte a `/encuestas`

#### Scenario: Enlace es accesible desde cualquier página
- **WHEN** un usuario hace clic en el enlace "Encuestas" desde cualquier página
- **THEN** el sistema debe redirigir a la página de encuesta sin perder la sesión

### Requirement: Vista de encuesta debe renderizar formulario de satisfacción
El sistema SHALL proporcionar una ruta `GET /encuestas` que renderice una vista EJS con un formulario de encuesta de satisfacción.

**Endpoint Details**:
- **Path**: `GET /encuestas`
- **Auth**: Required (middleware de autenticación existente)
- **Response**: HTML renderizado con plantilla EJS

#### Scenario: Usuario autenticado accede al formulario
- **WHEN** un usuario autenticado accede a `/encuestas`
- **THEN** el sistema debe renderizar una página con un formulario que contenga 4 preguntas con elementos `<select>`

#### Scenario: Usuario no autenticado es redirigido
- **WHEN** un usuario no autenticado intenta acceder a `/encuestas`
- **THEN** el sistema debe redirigir al login con código HTTP 302 o 401

#### Scenario: Formulario incluye las 4 preguntas requeridas
- **WHEN** el formulario se renderiza
- **THEN** debe mostrar exactamente 4 preguntas con labels:
  - "¿Qué opinas sobre la accesibilidad de la web?"
  - "¿Qué te parecen los colores y diseño visual utilizados?"
  - "¿Cómo valoras las funcionalidades añadidas?"
  - "¿Qué tan guapos son los creadores?"

### Requirement: Cada pregunta debe usar select con escala 1-10
El sistema SHALL proporcionar para cada pregunta un elemento `<select>` con opciones numéricas del 1 al 10, donde 1 representa "muy en desacuerdo" y 10 representa "muy de acuerdo".

#### Scenario: Select contiene todas las opciones
- **WHEN** el formulario se renderiza
- **THEN** cada elemento `<select>` debe contener 10 opciones con valores del 1 al 10

#### Scenario: Selects tienen atributos required
- **WHEN** el usuario intenta enviar el formulario sin completar todos los campos
- **THEN** el navegador debe prevenir el envío y mostrar mensaje de validación HTML5

### Requirement: API debe recibir y almacenar respuestas de encuesta
El sistema SHALL proporcionar un endpoint `POST /api/encuestas` que reciba respuestas del formulario y las almacene en memoria.

**Endpoint Details**:
- **Path**: `POST /api/encuestas`
- **Method**: POST
- **Auth**: Required (middleware de autenticación existente)
- **Request Body**:
  ```json
  {
    "accesibilidad": 8,
    "colores": 9,
    "funcionalidad": 7,
    "equipo": 10
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Encuesta guardada correctamente",
    "data": {
      "accesibilidad": 8,
      "colores": 9,
      "funcionalidad": 7,
      "equipo": 10,
      "timestamp": "2026-01-30T10:30:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - 400: Datos inválidos o campos faltantes
    ```json
    {
      "success": false,
      "error": "Todos los campos son requeridos"
    }
    ```
  - 401: No autenticado
    ```json
    {
      "success": false,
      "error": "Autenticación requerida"
    }
    ```
  - 422: Valores fuera de rango
    ```json
    {
      "success": false,
      "error": "Los valores deben estar entre 1 y 10"
    }
    ```

**AJAX Example desde EJS**:
```javascript
// En la vista encuestas.ejs
document.getElementById('encuestaForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    accesibilidad: parseInt(document.getElementById('accesibilidad').value),
    colores: parseInt(document.getElementById('colores').value),
    funcionalidad: parseInt(document.getElementById('funcionalidad').value),
    equipo: parseInt(document.getElementById('equipo').value)
  };

  try {
    const response = await fetch('/api/encuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      alert('¡Gracias por tu feedback!');
      // Opcional: limpiar formulario o redirigir
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Error al enviar la encuesta');
  }
});
```

#### Scenario: Envío exitoso con datos válidos
- **WHEN** se envía un POST a `/api/encuestas` con los 4 campos numéricos válidos (1-10) y usuario autenticado
- **THEN** el sistema debe retornar HTTP 200 con `success: true` y almacenar la respuesta con timestamp en el array en memoria

#### Scenario: Envío rechazado por datos faltantes
- **WHEN** se envía un POST sin uno o más campos requeridos
- **THEN** el sistema debe retornar HTTP 400 con mensaje de error indicando campos faltantes

#### Scenario: Envío rechazado por valores fuera de rango
- **WHEN** se envía un POST con valores menores a 1 o mayores a 10
- **THEN** el sistema debe retornar HTTP 422 con mensaje de error sobre rango válido

#### Scenario: Envío rechazado sin autenticación
- **WHEN** un usuario no autenticado intenta enviar POST a `/api/encuestas`
- **THEN** el sistema debe retornar HTTP 401 con mensaje de error de autenticación

### Requirement: Respuestas deben almacenarse en memoria como array de objetos
El sistema SHALL mantener un array en memoria que almacene cada respuesta como un objeto JSON con los campos de las 4 preguntas más un timestamp.

**Estructura de datos**:
```javascript
// En lib/encuestasStore.js
const respuestas = [
  {
    accesibilidad: 8,
    colores: 9,
    funcionalidad: 7,
    equipo: 10,
    timestamp: "2026-01-30T10:30:00.000Z"
  },
  {
    accesibilidad: 6,
    colores: 8,
    funcionalidad: 9,
    equipo: 10,
    timestamp: "2026-01-30T11:15:00.000Z"
  }
];
```

#### Scenario: Nueva respuesta se añade al array
- **WHEN** se recibe una respuesta válida en el endpoint POST
- **THEN** el sistema debe añadir un nuevo objeto al array con los 4 valores numéricos y un campo `timestamp` con la fecha/hora actual en formato ISO

#### Scenario: Array persiste durante ejecución del servidor
- **WHEN** se envían múltiples respuestas durante la misma sesión del servidor
- **THEN** todas las respuestas deben acumularse en el array sin sobrescribirse

#### Scenario: Array se resetea al reiniciar servidor
- **WHEN** el servidor Node.js se reinicia
- **THEN** el array debe comenzar vacío (almacenamiento volátil en memoria)

### Requirement: Validación de datos debe ser robusta
El sistema SHALL validar todos los campos recibidos antes de almacenarlos, asegurando que son números enteros entre 1 y 10.

#### Scenario: Validación rechaza tipos no numéricos
- **WHEN** se recibe un valor de tipo string, null, undefined u objeto
- **THEN** el sistema debe retornar error 400 indicando tipo de dato inválido

#### Scenario: Validación rechaza números decimales
- **WHEN** se recibe un valor decimal como 7.5 o 8.2
- **THEN** el sistema debe retornar error 422 indicando que solo se aceptan enteros

#### Scenario: Validación acepta números en el rango válido
- **WHEN** todos los valores son enteros entre 1 y 10 inclusive
- **THEN** el sistema debe procesar y almacenar la respuesta exitosamente
