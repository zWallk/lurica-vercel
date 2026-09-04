# ✅ Checklist Pre-Deployment

## Backend - Vercel Deployment

### Código & Configuración
- [ ] `api/index.js` creado con estructura correcta
- [ ] `vercel.json` configurado
- [ ] `.env.example` completo con todas las variables
- [ ] `package.json` con scripts `start` y `build`
- [ ] Importes y exports corregidos (módulos ES6)

### Base de Datos
- [ ] Base de datos MySQL está funcionando
- [ ] Usuario MySQL tiene permisos correctos
- [ ] Base de datos es accesible desde internet
- [ ] Credenciales probadas localmente

### Seguridad
- [ ] JWT_SECRET es fuerte y único
- [ ] Credenciales de BD no están en código
- [ ] CORS configurado correctamente
- [ ] Variables sensibles en `.env.example` solo como ejemplo

### Testing Local
- [ ] Backend funciona en `http://localhost:3001`
- [ ] Endpoints `/auth`, `/userinfo`, `/products` responden
- [ ] Base de datos conecta correctamente
- [ ] CORS permite requests del frontend local

### Vercel Setup
- [ ] Cuenta Vercel creada
- [ ] Proyecto creado en Vercel
- [ ] Variables de entorno agregadas:
  - [ ] DB_HOST
  - [ ] DB_USER
  - [ ] DB_PASSWORD
  - [ ] DB_PORT
  - [ ] DB_NAME
  - [ ] JWT_SECRET
  - [ ] NODE_ENV
  - [ ] FRONTEND_URL (opcional)

### Deployment
- [ ] GitHub repository actualizado
- [ ] `git push` realizado
- [ ] Vercel detecta y despliega
- [ ] Logs sin errores en Vercel Dashboard
- [ ] Endpoint público funciona: `https://tu-backend.vercel.app/`

---

## Frontend - Vercel Deployment

### Código & Configuración
- [ ] `vercel.json` configurado correctamente
- [ ] `.env.example` completo
- [ ] `vite.config.js` tiene proxy para desarrollo
- [ ] `package.json` tiene scripts `build` y `preview`

### Assets & Recursos
- [ ] Todas las imágenes están en `public/img/`
- [ ] Rutas de imágenes son relativas
- [ ] No hay rutas hardcodeadas a localhost
- [ ] Archivos CSS compilados correctamente

### API Connections
- [ ] `axios.config.js` usa `baseURL: '/api/'`
- [ ] Todas las llamadas API usan rutas relativas
- [ ] No hay URLs hardcodeadas al backend local

### Testing Local
- [ ] Frontend funciona en `http://localhost:5173`
- [ ] `pnpm build` genera `dist/` sin errores
- [ ] `pnpm preview` muestra la build correctamente
- [ ] Proxy funciona: `/api/` → `http://localhost:3001`

### Vercel Setup
- [ ] Proyecto creado en Vercel
- [ ] Variables de entorno agregadas:
  - [ ] VITE_API_URL (opcional, ya usa `/api/`)
  - [ ] VITE_ENV=production

### Deployment
- [ ] GitHub repository actualizado
- [ ] `git push` realizado
- [ ] Vercel detecta `Lurica-Frontend`
- [ ] Build output: `dist`
- [ ] Logs sin errores en Vercel Dashboard
- [ ] Sitio públicamente accesible

---

## Post-Deployment

### Verificación
- [ ] Backend responde en producción
- [ ] Frontend carga correctamente
- [ ] Navegación funciona
- [ ] Login funciona
- [ ] Productos cargan desde la API
- [ ] Panel admin accesible

### Dominios
- [ ] Dominio personalizado configurado (si aplica)
- [ ] SSL/TLS funciona (automático en Vercel)
- [ ] Redirecciones funcionan (www → sin www)

### Monitoreo
- [ ] Logs de Vercel monitoreados
- [ ] Alertas de errores configuradas
- [ ] Analytics habilitadas
- [ ] Email de notificación de deployment

### Funcionalidades
- [ ] Autenticación JWT funciona
- [ ] CORS permite requests
- [ ] Búsqueda de productos funciona
- [ ] Admin puede crear/editar/eliminar productos
- [ ] Las imágenes cargan correctamente

### Performance
- [ ] Frontend carga rápido
- [ ] API responde en < 1s
- [ ] Base de datos queries optimizadas
- [ ] No hay logs de error en consola

---

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| "Cannot GET /" en backend | Verifica que `api/index.js` exporta la app correctamente |
| CORS error | Revisa `ACCEPTED_ORIGINS` en `cors.js` y variables de entorno |
| "No database connection" | Verifica credenciales y whitelist de IP en MySQL |
| 404 en endpoints | Revisa que las rutas están importadas en `api/index.js` |
| Build falla en Vercel | Revisa logs, puede ser dependencia faltante |
| Frontend no conecta con API | Verifica que `baseURL` en axios es `/api/` |

---

**Última revisión**: 2024
