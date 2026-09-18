## ADDED Requirements

### Requirement: API endpoint para obtener estadísticas de encuestas

El sistema SHALL proporcionar un endpoint REST GET que calcule y devuelva estadísticas agregadas de todas las respuestas de encuestas almacenadas.

**Endpoint details:**
- **Path**: `/api/encuestas/estadisticas`
- **Method**: GET
- **Auth required**: Sí (middleware `isAuth`)
- **Request params**: Ninguno
- **Response format**: JSON

**Response structure:**
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
      "accesibilidad": { "1": 2, "2": 1, "3": 3, "4": 5, "5": 6, "6": 4, "7": 8, "8": 7, "9": 3, "10": 3 },
      "colores": { "1": 0, "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 8, "8": 9, "9": 6, "10": 4 },
      "funcionalidad": { "1": 3, "2": 2, "3": 4, "4": 6, "5": 7, "6": 8, "7": 5, "8": 4, "9": 2, "10": 1 },
      "equipo": { "1": 0, "2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 6, "8": 8, "9": 10, "10": 8 }
    }
  }
}
```

**Ejemplo de uso desde vista EJS:**
```javascript
const response = await fetch('/api/encuestas/estadisticas', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
const result = await response.json();
if (result.success) {
  console.log('Total respuestas:', result.data.totalRespuestas);
  console.log('Promedio accesibilidad:', result.data.promedios.accesibilidad);
}
```

#### Scenario: Obtener estadísticas con respuestas existentes

- **WHEN** un usuario autenticado hace GET a `/api/encuestas/estadisticas` y existen respuestas almacenadas
- **THEN** el sistema devuelve status 200 con JSON conteniendo `totalRespuestas > 0`, `promedios` con valores decimales para cada categoría, y `distribuciones` con conteo de cada valor 1-10 por categoría

#### Scenario: Obtener estadísticas sin respuestas

- **WHEN** un usuario autenticado hace GET a `/api/encuestas/estadisticas` y NO existen respuestas almacenadas
- **THEN** el sistema devuelve status 200 con JSON conteniendo `totalRespuestas: 0`, `promedios` con valores 0 para cada categoría, y `distribuciones` con valores 0 para todos los conteos

#### Scenario: Acceso sin autenticación

- **WHEN** un usuario NO autenticado intenta hacer GET a `/api/encuestas/estadisticas`
- **THEN** el sistema devuelve status 401 (Unauthorized) o redirige al login según el comportamiento del middleware `isAuth`

### Requirement: Cálculo correcto de promedios

El sistema SHALL calcular el promedio aritmético de cada categoría (accesibilidad, colores, funcionalidad, equipo) dividiendo la suma de todos los valores de esa categoría entre el número total de respuestas.

#### Scenario: Promedio con múltiples respuestas

- **WHEN** existen 3 respuestas con valores de accesibilidad [5, 7, 9]
- **THEN** el promedio de accesibilidad es 7.0 (suma 21 / 3 respuestas)

#### Scenario: Promedio con una sola respuesta

- **WHEN** existe solo 1 respuesta con valor de colores 8
- **THEN** el promedio de colores es 8.0

### Requirement: Cálculo correcto de distribuciones

El sistema SHALL contar cuántas respuestas tienen cada valor (1-10) para cada categoría, incluyendo valores con conteo 0.

#### Scenario: Distribución con valores variados

- **WHEN** existen 5 respuestas con valores de funcionalidad [3, 7, 7, 9, 3]
- **THEN** la distribución de funcionalidad muestra `"3": 2, "7": 2, "9": 1` y los demás valores (1,2,4,5,6,8,10) con conteo 0

#### Scenario: Distribución completa con todos los valores del 1 al 10

- **WHEN** se solicitan estadísticas
- **THEN** cada objeto de distribución MUST contener las claves "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" con sus respectivos conteos

### Requirement: Manejo de errores del servidor

El sistema SHALL retornar errores apropiados cuando ocurran problemas internos durante el cálculo de estadísticas.

#### Scenario: Error interno durante cálculo

- **WHEN** ocurre un error no previsto durante el cálculo de estadísticas
- **THEN** el sistema devuelve status 500 con JSON `{ "success": false, "error": "Error interno del servidor" }`
