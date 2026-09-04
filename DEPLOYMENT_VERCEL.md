# Guía de Deployment a Vercel - Lurica Accesorios

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com)
- GitHub conectado a Vercel (recomendado para CI/CD)
- Base de datos MySQL accesible desde internet (con IP pública de Vercel en whitelist)

## 🚀 Backend Deployment

### Paso 1: Preparar variables de entorno

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las siguientes variables:

```
DB_HOST=tu_host_mysql
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_PORT=3306
DB_NAME=nombre_base_datos
JWT_SECRET=tu_jwt_secret_seguro
NODE_ENV=production
```

### Paso 2: Configurar base de datos

**IMPORTANTE**: Tu base de datos MySQL debe ser accesible desde internet.

Si usas un proveedor en la nube (AWS RDS, Google Cloud SQL, etc.):
- Agrega las IPs de Vercel al whitelist de tu base de datos
- IPs de Vercel: [Ver documentación oficial](https://vercel.com/docs/concepts/solutions/databases)

### Paso 3: Deploy

```bash
# Opción 1: Desde CLI
vercel deploy

# Opción 2: Conectar GitHub repositorio
# 1. Push código a GitHub
# 2. En Vercel, clickea "New Project"
# 3. Selecciona tu repositorio
# 4. Vercel detectará la configuración automáticamente
```

### Paso 4: Verificar deployment

```bash
curl https://tu-backend.vercel.app/
# Debe retornar: {"message":"Welcome to lurica api"}
```

## 🎨 Frontend Deployment

### Paso 1: Configurar variables de entorno

En Vercel Dashboard → Environment Variables:

```
VITE_API_URL=https://tu-backend.vercel.app/api
VITE_ENV=production
```

### Paso 2: Deploy

```bash
# Opción 1: Desde CLI
cd Lurica-Frontend
vercel deploy

# Opción 2: GitHub automático
# Conecta el repositorio en Vercel
```

### Paso 3: Configurar dominio

1. En Vercel Dashboard, ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Configura los DNS records en tu proveedor de dominio

## 🔗 Conectar Frontend con Backend

El frontend está configurado para usar rutas relativas `/api/`. 

Para producción, asegúrate que:
1. El backend está en: `https://tu-backend.vercel.app`
2. El frontend está en: `https://tu-frontend.vercel.app`
3. O ambos en el mismo dominio usando rewrites (ver abajo)

### Opción A: Mismo dominio con rewrites

Crea `vercel.json` en la raíz del proyecto:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://tu-backend.vercel.app/api/:path*"
    }
  ]
}
```

### Opción B: Dominios separados

Actualiza el CORS en `middlewares/cors.js`:

```javascript
const ACCEPTED_ORIGINS = [
    'https://tu-frontend.vercel.app',
    'https://www.tu-frontend.vercel.app',
    'https://tu-dominio.com',
    // ... otros orígenes
]
```

## ✅ Checklist Final

- [ ] Base de datos MySQL accesible desde internet
- [ ] Variables de entorno configuradas en Vercel
- [ ] Backend deployado y funcionando
- [ ] Frontend deployado y funcionando
- [ ] CORS configurado correctamente
- [ ] Rutas de API apuntando al backend correcto
- [ ] SSL/TLS habilitado (automático en Vercel)
- [ ] Dominio personalizado configurado (opcional)

## 🔧 Troubleshooting

### Error: "Connection timeout" en base de datos

**Solución**: 
- Verificar que la IP de Vercel está en whitelist de MySQL
- Verificar credenciales de base de datos
- Verificar que la base de datos es accesible desde internet

### Error: "CORS blocked"

**Solución**:
- Verificar que el origen está en `ACCEPTED_ORIGINS` en `cors.js`
- Verificar que las credenciales están habilitadas en CORS
- Revisar que el `baseURL` en axios es correcto

### Backend devuelve 500 error

**Solución**:
- Revisar logs en Vercel Dashboard → Deployments → Runtime Logs
- Verificar que todas las variables de entorno están configuradas
- Verificar conexión a base de datos

## 📚 Recursos Útiles

- [Documentación Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Última actualización**: 2024
