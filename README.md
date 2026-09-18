# GestiFleet

Aplicación web para la **gestión de flotas de vehículos eléctricos corporativos**: concesionarios, vehículos, usuarios con distintos roles y reservas, con interfaz web y una API REST paralela.

Proyecto en equipo de la asignatura de Aplicaciones Web (Universidad Complutense de Madrid), desarrollado por [Paula211](https://github.com/Paula211), [paulal20](https://github.com/paulal20) y [arturito-7](https://github.com/arturito-7).

## Qué hace y qué problema resuelve

Una empresa con flota de vehículos repartida entre varios concesionarios necesita saber qué vehículos tiene, dónde está cada uno, quién puede reservarlos y cuándo. La aplicación cubre ese circuito completo:

- **Concesionarios** — alta, edición, detalle y listado. Cada vehículo y cada empleado pertenece a uno.
- **Vehículos** — alta, edición, detalle y listado, con imagen asociada.
- **Usuarios** — registro, login con sesión y contraseñas cifradas con bcrypt, y dos roles: `Admin` y `Empleado`.
- **Reservas** — creación, detalle y listado, relacionando usuario y vehículo.
- **Encuestas de satisfacción** — formulario de valoración y una pantalla de resultados con estadísticas agregadas para el administrador.
- **Carga inicial** — un asistente en tres pasos (`/carga-inicial/setup`) que siembra la base de datos a partir de los ficheros JSON de `data/`. Si un administrador entra y no hay concesionarios, el middleware `carga.js` le redirige ahí automáticamente.

Cada recurso tiene dos capas de rutas: las vistas EJS renderizadas en servidor (`/vehiculos`, `/reserva`, `/concesionarios`, `/usuarios`) y una **API REST** bajo `/api/*` que consumen las llamadas AJAX del frontend.

El control de acceso está en `middleware/auth.js`, que expone ocho guardas en lugar de una comprobación única de rol: `isAuth` e `isAuthApi` (la primera redirige al login, la segunda devuelve un 401 en JSON), `isGuest`, `isAdmin`, `isAdminOrSelf` (un empleado solo puede ver su propio perfil), `isAdminOrWorker` (un empleado solo gestiona el concesionario en el que trabaja), `isEmpty` e `isInstallationOrImport`, que permiten la carga inicial solo mientras la base de datos esté vacía.

## Stack

- **Node.js** con **Express 4**.
- **EJS** como motor de plantillas, con `express-ejs-layouts` para la plantilla común.
- **MySQL** a través de **mysql2**, con pool de conexiones inyectado en cada petición por el middleware `connection.js`.
- **bcrypt** para el cifrado de contraseñas.
- **express-session** y **cookie-parser** para la sesión.
- **multer** para la subida de imágenes de vehículos, con `memoryStorage`: la imagen se guarda en la base de datos como buffer, no en disco.
- **method-override** para poder usar PUT y DELETE desde formularios HTML.
- **morgan** para el log de peticiones.
- **Bootstrap 5** y **Bootstrap Icons** en el frontend, servidos desde `public/`.
- **nodemon** en desarrollo.

## Estructura del proyecto

```
app.js                    Punto de entrada: middlewares, sesión y montaje de rutas
script.sql                Esquema completo: crea la BD gestifleetbd y sus 4 tablas
data/
├── db.js                 Pool de conexiones a MySQL
├── concesionarios.json   Datos semilla del asistente de carga inicial
├── usuarios.json
├── vehiculos.json
└── datos.json
middleware/
├── auth.js               Control de acceso por rol
├── carga.js              Fuerza la carga inicial si la BD está vacía
└── connection.js         Entrega una conexión del pool a cada petición
routes/
├── index.js              Home, login, registro y logout
├── vehiculos.js  reservas.js  concesionarios.js  usuarios.js  encuestas.js
├── cargaInicial.js       Asistente de siembra en tres pasos
└── api/                  API REST: concesionarios, usuarios, vehiculos,
                          reservas, encuestas e importacion
views/                    23 vistas EJS (listados, detalles, formularios, layout)
lib/
└── encuestasStore.js     Almacén en memoria de las respuestas de encuestas
public/                   Bootstrap, Bootstrap Icons, CSS e imágenes
openspec/                 Especificaciones y cambios documentados del proyecto
docs/prototipo/           Maqueta estática inicial, previa a pasarlo a Express
```

Las respuestas de las encuestas se guardan **en memoria** (`lib/encuestasStore.js`), no en MySQL: se pierden al reiniciar el servidor. Es intencionado, así está documentado en el propio módulo.

## Cómo instalarlo y ejecutarlo

### Requisitos

- **Node.js 18+** y npm
- **MySQL** en marcha

### Pasos

```bash
npm install
```

Crea la base de datos y las tablas. El script ya incluye el `CREATE DATABASE`:

```bash
mysql -u root -p < script.sql
```

Arranca el servidor:

```bash
npm run dev     # con nodemon, recarga al guardar
npm start       # sin recarga
```

Abre `http://localhost:3000`.

### Configuración

Por defecto se conecta a `localhost:3307` con usuario `root`, contraseña vacía y base de datos `gestifleetbd`. Si tu MySQL está en otro sitio, define las variables de entorno antes de arrancar: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` y `PORT`. Están documentadas en `.env.example`.

Ten en cuenta que el proyecto **no usa dotenv**, así que un fichero `.env` no se carga solo: o exportas las variables en tu shell, o instalas `dotenv` y añades `require('dotenv').config();` al principio de `app.js`.

### Primer arranque

Con la base de datos vacía, entra en `/carga-inicial/setup` y sigue el asistente: carga concesionarios, vehículos y usuarios desde los JSON de `data/`.

Los usuarios semilla son **datos de demostración**. Todos tienen la contraseña `Demo1234!`, que el asistente cifra con bcrypt al insertarla. El administrador es `director@gestifleet.com`. Cámbialos si vas a desplegar esto en algún sitio real.

## Estado

Proyecto académico. El desarrollo activo fue de septiembre de 2025 a febrero de 2026.
