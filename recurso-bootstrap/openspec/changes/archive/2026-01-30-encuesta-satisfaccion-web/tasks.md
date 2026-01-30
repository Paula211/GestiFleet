# Implementation Tasks: Encuesta de Satisfacción

## 1. Estructura de datos y almacenamiento

- [x] 1.1 Crear directorio `lib/` si no existe
- [x] 1.2 Crear módulo `lib/encuestasStore.js` con array vacío para almacenar respuestas
- [x] 1.3 Implementar función `agregarRespuesta(data)` que añade objeto con timestamp al array
- [x] 1.4 Implementar función `obtenerRespuestas()` que retorna todas las respuestas almacenadas
- [x] 1.5 Exportar funciones del módulo para uso en rutas

## 2. API REST - Endpoint de encuestas

- [x] 2.1 Crear archivo `routes/api/encuestas.js`
- [x] 2.2 Importar módulo `encuestasStore` en el archivo de rutas
- [x] 2.3 Configurar router Express para el endpoint POST `/api/encuestas`
- [x] 2.4 Aplicar middleware de autenticación al endpoint POST
- [x] 2.5 Implementar validación de campos requeridos (accesibilidad, colores, funcionalidad, equipo)
- [x] 2.6 Implementar validación de tipos (valores deben ser números)
- [x] 2.7 Implementar validación de rango (valores entre 1-10, enteros)
- [x] 2.8 Implementar lógica para almacenar respuesta válida usando `agregarRespuesta()`
- [x] 2.9 Implementar respuestas JSON apropiadas: 200 (éxito), 400 (datos inválidos), 401 (no autenticado), 422 (fuera de rango)
- [x] 2.10 Añadir manejo de errores con try-catch

## 3. Rutas de vistas - Página de encuesta

- [x] 3.1 Crear archivo `routes/views/encuestas.js`
- [x] 3.2 Configurar router Express para el endpoint GET `/encuestas`
- [x] 3.3 Aplicar middleware de autenticación al endpoint GET
- [x] 3.4 Implementar handler que renderice la vista `encuestas.ejs`
- [x] 3.5 Pasar datos necesarios a la vista (título de página, usuario actual si es relevante)

## 4. Vista EJS - Formulario de encuesta

- [x] 4.1 Crear archivo `views/encuestas.ejs`
- [x] 4.2 Incluir header/navbar con `<%- include('partials/header') %>` o similar
- [x] 4.3 Crear estructura HTML del formulario con id `encuestaForm`
- [x] 4.4 Añadir label y select para "Accesibilidad de la web" (id: `accesibilidad`)
- [x] 4.5 Añadir label y select para "Colores y diseño visual" (id: `colores`)
- [x] 4.6 Añadir label y select para "Funcionalidades añadidas" (id: `funcionalidad`)
- [x] 4.7 Añadir label y select para "Lo guapos que son los creadores" (id: `equipo`)
- [x] 4.8 Generar opciones 1-10 en cada select con atributo `required`
- [x] 4.9 Añadir botón de submit con texto apropiado ("Enviar encuesta")
- [x] 4.10 Incluir footer con `<%- include('partials/footer') %>` o similar

## 5. JavaScript cliente - AJAX para envío de formulario

- [x] 5.1 Añadir script en `encuestas.ejs` o archivo JS separado para manejar submit
- [x] 5.2 Implementar preventDefault() en el evento submit del formulario
- [x] 5.3 Recoger valores de los 4 selects y convertir a enteros con parseInt()
- [x] 5.4 Construir objeto JSON con estructura {accesibilidad, colores, funcionalidad, equipo}
- [x] 5.5 Implementar fetch() POST a `/api/encuestas` con Content-Type JSON
- [x] 5.6 Manejar respuesta exitosa (mostrar mensaje de éxito al usuario)
- [x] 5.7 Manejar errores de red y respuestas de error del servidor (mostrar mensaje apropiado)
- [x] 5.8 Opcional: limpiar formulario o redirigir después de envío exitoso

## 6. Navbar - Enlace a encuestas

- [x] 6.1 Identificar archivo de navbar (ej: `views/partials/navbar.ejs` o `views/partials/header.ejs`)
- [x] 6.2 Añadir nuevo elemento de navegación con enlace a `/encuestas`
- [x] 6.3 Usar texto "Encuestas" o icono + texto según estilo del navbar
- [x] 6.4 Verificar que el enlace solo aparezca para usuarios autenticados (si aplica)
- [x] 6.5 Asegurar que el enlace sigue el estilo visual existente del navbar

## 7. Integración en la aplicación

- [x] 7.1 Identificar archivo principal (app.js, server.js, o index.js)
- [x] 7.2 Importar ruta de API: `const encuestasApiRouter = require('./routes/api/encuestas')`
- [x] 7.3 Importar ruta de vista: `const encuestasViewRouter = require('./routes/views/encuestas')`
- [x] 7.4 Registrar ruta API: `app.use('/api', encuestasApiRouter)` o `app.use('/api/encuestas', encuestasApiRouter)`
- [x] 7.5 Registrar ruta de vista: `app.use('/', encuestasViewRouter)` o `app.use('/encuestas', encuestasViewRouter)`
- [x] 7.6 Verificar orden de middlewares (autenticación debe estar antes de las rutas)

## 8. Testing y verificación

- [x] 8.1 Iniciar servidor y verificar que compila sin errores
- [x] 8.2 Acceder a `/encuestas` sin autenticación y verificar redirección a login
- [x] 8.3 Autenticarse y verificar que enlace "Encuestas" aparece en navbar
- [x] 8.4 Hacer clic en enlace y verificar que formulario se renderiza correctamente
- [x] 8.5 Verificar que los 4 selects tienen opciones 1-10
- [x] 8.6 Intentar enviar formulario vacío y verificar validación HTML5
- [x] 8.7 Completar formulario y enviar, verificar mensaje de éxito
- [x] 8.8 Verificar en consola del servidor que respuesta se almacenó (añadir console.log temporal)
- [x] 8.9 Enviar múltiples respuestas y verificar que se acumulan en el array
- [x] 8.10 Reiniciar servidor y verificar que array se resetea (almacenamiento volátil)
- [x] 8.11 Probar envío con datos inválidos vía Postman/curl y verificar códigos de error
- [x] 8.12 Eliminar console.logs temporales de depuración
