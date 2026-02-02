# Estadísticas de Administración

Panel de estadísticas de reservas exclusivo para administradores que muestra métricas agregadas del sistema de reservas de vehículos.

## ADDED Requirements

### Requirement: Acceso restringido a administradores
El sistema SHALL restringir el acceso a la ruta `/estadisticas` únicamente a usuarios con rol "Admin".

#### Scenario: Administrador accede correctamente
- **WHEN** un usuario con rol "Admin" accede a `/estadisticas`
- **THEN** el sistema renderiza la vista `estadisticasAdmin.ejs` con los datos de estadísticas

#### Scenario: Usuario no administrador es rechazado
- **WHEN** un usuario con rol "Empleado" intenta acceder a `/estadisticas`
- **THEN** el sistema redirige a la página principal con mensaje de error "Acceso denegado"

#### Scenario: Usuario no autenticado es redirigido
- **WHEN** un usuario no autenticado intenta acceder a `/estadisticas`
- **THEN** el sistema redirige a `/login` con mensaje "Debes iniciar sesión para acceder a esa página"

### Requirement: Mostrar total de reservas del sistema
El sistema SHALL mostrar el número total de reservas registradas en el sistema.

#### Scenario: Existen reservas en el sistema
- **WHEN** el administrador accede a `/estadisticas` y hay reservas registradas
- **THEN** el sistema muestra el contador `total_reservas` con el número exacto de reservas

#### Scenario: No existen reservas en el sistema
- **WHEN** el administrador accede a `/estadisticas` y no hay reservas registradas
- **THEN** el sistema muestra `total_reservas` con valor 0

### Requirement: Mostrar reservas por concesionario
El sistema SHALL mostrar una tabla con el número de reservas agrupadas por cada concesionario, ordenadas de mayor a menor.

#### Scenario: Múltiples concesionarios con reservas
- **WHEN** existen varios concesionarios con reservas
- **THEN** el sistema muestra una tabla con columnas: nombre del concesionario y total de reservas, ordenada descendentemente por total

#### Scenario: Concesionario sin reservas
- **WHEN** existe un concesionario que no tiene vehículos reservados
- **THEN** el sistema incluye ese concesionario en la tabla con `total_reservas = 0`

#### Scenario: No existen concesionarios
- **WHEN** no hay concesionarios registrados en el sistema
- **THEN** el sistema muestra la tabla vacía o un mensaje indicando que no hay datos

### Requirement: Mostrar vehículo más reservado
El sistema SHALL identificar y mostrar el vehículo con mayor número de reservas.

#### Scenario: Existe un vehículo más reservado
- **WHEN** hay reservas en el sistema
- **THEN** el sistema muestra la marca, modelo y número total de reservas del vehículo más usado

#### Scenario: Empate entre vehículos
- **WHEN** varios vehículos tienen el mismo número máximo de reservas
- **THEN** el sistema muestra uno de ellos (el primero según ORDER BY)

#### Scenario: No hay reservas
- **WHEN** no existen reservas en el sistema
- **THEN** el sistema muestra un mensaje indicando que no hay datos de vehículo más usado o `vehiculoMasUsado = null`

### Requirement: Manejo de errores en consultas
El sistema SHALL manejar errores de base de datos y mostrar mensajes apropiados.

#### Scenario: Error en consulta de total de reservas
- **WHEN** falla la consulta SQL del total de reservas
- **THEN** el sistema responde con HTTP 500 y renderiza vista de error con mensaje "Error al cargar estadísticas (1)"

#### Scenario: Error en consulta de reservas por concesionario
- **WHEN** falla la consulta SQL de reservas por concesionario
- **THEN** el sistema responde con HTTP 500 y renderiza vista de error con mensaje "Error al cargar estadísticas (2)"

#### Scenario: Error en consulta de vehículo más usado
- **WHEN** falla la consulta SQL del vehículo más usado
- **THEN** el sistema responde con HTTP 500 y renderiza vista de error con mensaje "Error al cargar estadísticas (3)"
