## Why

Los administradores necesitan una vista centralizada para analizar el rendimiento del sistema de reservas. Esta funcionalidad proporciona métricas clave como el total de reservas, distribución por concesionario y vehículo más demandado, permitiendo tomar decisiones informadas sobre la gestión de la flota.

## What Changes

- **Nueva ruta** `GET /estadisticas` accesible solo para administradores
- **Vista dedicada** `estadisticasAdmin.ejs` que muestra:
  - Total de reservas del sistema
  - Tabla de reservas por concesionario (ordenadas de mayor a menor)
  - Vehículo más usado (marca, modelo y número de reservas)
- **Consultas SQL optimizadas** con JOINs para agregar datos de reservas, vehículos y concesionarios
- **Middleware de autorización** `isAdmin` para restringir acceso

## Capabilities

### New Capabilities
- `estadisticas-admin`: Panel de estadísticas de reservas para administradores con métricas agregadas del sistema (total reservas, distribución por concesionario, vehículo más usado)

### Modified Capabilities
<!-- No se modifican capabilities existentes - esta es documentación retroactiva -->

## Impact

- **Archivos afectados**:
  - `routes/index.js` - Nueva ruta GET /estadisticas
  - `views/estadisticasAdmin.ejs` - Vista con las estadísticas
  - `middleware/auth.js` - Uso del middleware isAdmin existente
- **Base de datos**: Consultas de solo lectura sobre tablas `reservas`, `vehiculos`, `concesionarios`
- **Dependencias**: Ninguna nueva
- **Permisos**: Solo usuarios con rol "Admin" pueden acceder
