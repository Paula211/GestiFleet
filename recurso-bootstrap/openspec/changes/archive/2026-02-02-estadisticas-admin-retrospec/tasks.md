# Tasks - Estadísticas Admin (Retrospec)

> **Nota**: Este es un change de documentación retroactiva. Todas las tareas están marcadas como completadas porque la funcionalidad ya existe en el código.

## 1. Configuración de Ruta

- [x] 1.1 Crear ruta GET `/estadisticas` en `routes/index.js`
- [x] 1.2 Aplicar middleware `isAdmin` para restricción de acceso

## 2. Consultas de Base de Datos

- [x] 2.1 Implementar consulta SQL para total de reservas
- [x] 2.2 Implementar consulta SQL para reservas por concesionario con LEFT JOINs
- [x] 2.3 Implementar consulta SQL para vehículo más usado con LIMIT 1

## 3. Vista EJS

- [x] 3.1 Crear vista `views/estadisticasAdmin.ejs`
- [x] 3.2 Mostrar tarjeta con total de reservas
- [x] 3.3 Mostrar tabla de reservas por concesionario
- [x] 3.4 Mostrar sección de vehículo más usado

## 4. Manejo de Errores

- [x] 4.1 Agregar manejo de error para consulta de total de reservas
- [x] 4.2 Agregar manejo de error para consulta de reservas por concesionario
- [x] 4.3 Agregar manejo de error para consulta de vehículo más usado

## 5. Integración

- [x] 5.1 Verificar que el enlace a `/estadisticas` existe en el menú de administración
- [x] 5.2 Probar flujo completo como usuario Admin
- [x] 5.3 Verificar que usuarios no-admin son rechazados
