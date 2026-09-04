# 🛍️ Lurica Accesorios - Ecosistema Web

Plataforma e-commerce completa para Lurica Accesorios con panel administrativo integrado.

## 📁 Estructura del Proyecto

```
LuricaAccesorios Ecosistema/
├── Lurica-Backend/          # API Express.js
│   ├── api/                 # Vercel Serverless Functions
│   ├── config/              # Configuración (DB)
│   ├── controllers/         # Lógica de negocio
│   ├── middlewares/         # CORS, Autenticación
│   ├── models/              # Modelos de datos
│   ├── routes/              # Definición de rutas
│   ├── schemas/             # Validaciones Zod
│   ├── vercel.json          # Configuración de Vercel
│   ├── .env.example         # Variables de entorno de ejemplo
│   └── package.json
│
├── Lurica-Frontend/         # React + Vite
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── contexts/        # Context API (Auth)
│   │   ├── hooks/           # Custom hooks
│   │   ├── Pages/           # Páginas principales
│   │   ├── services/        # Llamadas a API
│   │   └── utils/           # Utilidades
│   ├── vercel.json          # Configuración de Vercel
│   ├── .env.example         # Variables de entorno de ejemplo
│   └── package.json
│
├── DEPLOYMENT_VERCEL.md     # Guía completa de deployment
└── README.md                # Este archivo
```

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- pnpm (recomendado) o npm
- MySQL 8.0+

### Instalación Local

**Backend**:
```bash
cd Lurica-Backend
pnpm install
cp .env.example .env
# Edita .env con tus credenciales de DB
pnpm dev
```

**Frontend**:
```bash
cd Lurica-Frontend
pnpm install
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Arquitectura

### Backend (Vercel Serverless)
- **Framework**: Express.js
- **Base de datos**: MySQL
- **Autenticación**: JWT
- **Validación**: Zod
- **Seguridad**: CORS, bcryptjs

**Endpoints principales**:
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse
- `GET /userinfo` - Info del usuario
- `GET /products` - Listar productos
- `POST /products` - Crear producto (Admin)
- `PUT /products/:id` - Actualizar producto (Admin)
- `DELETE /products/:id` - Eliminar producto (Admin)

### Frontend (Vite + React)
- **Framework**: React 18
- **Build**: Vite
- **Estilos**: TailwindCSS + Bootstrap
- **HTTP Client**: Axios
- **Routing**: React Router
- **Animaciones**: Framer Motion

**Páginas**:
- `/` - Home
- `/login` - Iniciar sesión
- `/products` - Catálogo de productos
- `/admin` - Panel administrativo (protegido)

## 🔐 Seguridad

- JWT para autenticación
- CORS configurado
- Variables de entorno para credenciales
- Hashing de contraseñas con bcryptjs
- Validación de datos con Zod

## 📦 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy backend
cd Lurica-Backend
vercel deploy

# Deploy frontend
cd ../Lurica-Frontend
vercel deploy
```

**Ver guía completa**: [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md)

### Variables de Entorno Requeridas

**Backend** (`.env`):
```
DB_HOST=tu_host_mysql
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_PORT=3306
DB_NAME=lurica_db
JWT_SECRET=tu_jwt_secret_muy_seguro
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app
```

**Frontend** (`.env`):
```
VITE_API_URL=https://tu-backend.vercel.app/api
VITE_ENV=production
```

## 🎯 Features

- ✅ Autenticación JWT
- ✅ Panel administrativo
- ✅ Gestión de productos
- ✅ Gestión de usuarios
- ✅ Carrito de compras
- ✅ Búsqueda y filtrado
- ✅ Responsive design
- ✅ Animaciones suaves

## 🛠️ Scripts Disponibles

### Backend
```bash
pnpm dev      # Desarrollo local
pnpm start    # Producción
pnpm build    # Build
```

### Frontend
```bash
pnpm dev      # Desarrollo con hot reload
pnpm build    # Build para producción
pnpm lint     # ESLint
pnpm preview  # Preview de build
```

## 📚 Dependencias Principales

### Backend
- express: Framework HTTP
- mysql2: Driver MySQL
- jsonwebtoken: JWT
- bcryptjs: Hashing de contraseñas
- zod: Validación
- cors: CORS middleware

### Frontend
- react: Librería UI
- vite: Build tool
- tailwindcss: Utility CSS
- axios: HTTP client
- react-router-dom: Routing
- framer-motion: Animaciones

## 🐛 Troubleshooting

### La base de datos no conecta en Vercel
→ Asegúrate que la IP de Vercel está en whitelist de MySQL

### CORS error en producción
→ Revisa que el origin está en `ACCEPTED_ORIGINS` en `cors.js`

### Frontend no se conecta con el backend
→ Verifica que `VITE_API_URL` es correcto en `.env`

## 📞 Contacto & Soporte

Para preguntas o issues, abre un GitHub issue o contacta al equipo de desarrollo.

## 📄 Licencia

ISC

---

**Última actualización**: 2024
**Versión**: 1.0.0
