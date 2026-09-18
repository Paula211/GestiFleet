## Context

GestiFleet necesita proporcionar a los administradores visibilidad sobre el uso del sistema de reservas. Actualmente no existe una forma centralizada de ver métricas agregadas. Esta funcionalidad se implementa como una vista server-rendered que ejecuta consultas SQL directas sobre las tablas existentes (`reservas`, `vehiculos`, `concesionarios`).

**Estado actual**: El sistema ya cuenta con:
- Modelo de datos completo (concesionarios, vehículos, reservas)
- Sistema de autenticación con roles (Admin/Empleado)
- Middleware `isAdmin` para proteger rutas

## Goals / Non-Goals

**Goals:**
- Mostrar total de reservas del sistema
- Mostrar distribución de reservas por concesionario
- Identificar el vehículo más reservado
- Acceso restringido solo a administradores
- Renderizado server-side con EJS

**Non-Goals:**
- API REST para consumo externo (solo vista HTML)
- Filtros por rango de fechas
- Exportación de datos (CSV, PDF)
- Gráficos interactivos (solo tablas HTML)
- Caché de estadísticas

## Decisions

### 1. Renderizado server-side vs API + cliente
**Decisión**: Server-side rendering con EJS

**Alternativas consideradas**:
- API REST + fetch desde cliente: Mayor complejidad, requiere manejo de estados de carga
- GraphQL: Overhead innecesario para consultas fijas

**Razón**: Consistente con el resto de la aplicación. Las estadísticas son de solo lectura y no requieren interactividad compleja.

### 2. Consultas SQL anidadas vs Promise.all
**Decisión**: Callbacks anidados secuenciales

**Alternativas consideradas**:
- Promise.all con promisify: Mejor rendimiento paralelo
- Stored procedures: Mayor complejidad de mantenimiento

**Razón**: Simplicidad y consistencia con el patrón existente en el proyecto. Las consultas son rápidas y el overhead secuencial es mínimo.

### 3. Agregación en SQL vs JavaScript
**Decisión**: Agregación completa en SQL con GROUP BY y COUNT

**Razón**: Más eficiente que traer todos los registros y agregar en memoria. Las consultas usan LEFT JOIN para incluir concesionarios/vehículos sin reservas.

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| Consultas lentas con muchos datos | Las consultas usan índices existentes (PKs y FKs). Monitorear si el volumen crece |
| Sin caché - consulta en cada request | Aceptable para uso administrativo poco frecuente. Implementar caché si se detecta problema |
| Callbacks anidados dificultan manejo de errores | Cada nivel tiene su propio handler de error con mensaje específico |

## Implementation Details

### Ruta
```
GET /estadisticas
Middleware: isAdmin
```

### Consultas SQL

1. **Total de reservas**:
```sql
SELECT COUNT(*) AS total_reservas FROM reservas
```

2. **Reservas por concesionario**:
```sql
SELECT c.nombre AS concesionario, COUNT(r.id_reserva) AS total_reservas, c.id_concesionario
FROM concesionarios c
LEFT JOIN vehiculos v ON v.id_concesionario = c.id_concesionario
LEFT JOIN reservas r ON r.id_vehiculo = v.id_vehiculo
GROUP BY c.id_concesionario
ORDER BY total_reservas DESC
```

3. **Vehículo más usado**:
```sql
SELECT v.marca, v.modelo, COUNT(r.id_reserva) AS total_reservas, v.id_vehiculo
FROM vehiculos v
LEFT JOIN reservas r ON r.id_vehiculo = v.id_vehiculo
GROUP BY v.id_vehiculo
ORDER BY total_reservas DESC
LIMIT 1
```

### Vista
`views/estadisticasAdmin.ejs` recibe:
- `total_reservas`: número
- `reservasPorConcesionario`: array de objetos
- `vehiculoMasUsado`: objeto o null
