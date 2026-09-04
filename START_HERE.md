# 🚀 Guía Rápida: Deploy a Vercel en 5 Minutos

## ✋ Antes de empezar, tienes:
- [ ] Cuenta en GitHub con el código
- [ ] Cuenta en Vercel (free es OK)
- [ ] Base de datos MySQL funcionando
- [ ] Credenciales de DB a mano

## 🎯 Paso 1: Preparar Backend (2 min)

```bash
cd Lurica-Backend

# Ver y completar las variables
cat .env.example

# Copiar a .env (solo local para testing)
cp .env.example .env

# Editar .env con TUS credenciales
nano .env  # o tu editor favorito

# Verificar que funciona
pnpm install
pnpm dev

# Si ves "Server Started" y "database connected" ✅
```

## 🎨 Paso 2: Preparar Frontend (1 min)

```bash
cd ../Lurica-Frontend

# Verificar build
pnpm install
pnpm build

# Si ves "dist/" creado ✅
```

## 🔄 Paso 3: Push a GitHub (1 min)

```bash
git add .
git commit -m "Adaptar para Vercel"
git push origin main
```

## ⚙️ Paso 4: Vercel Dashboard (1 min)

### Para Backend:
1. Ir a https://vercel.com
2. Clickear "+ New Project"
3. Conectar GitHub y seleccionar el repo
4. Esperar a que Vercel auto-detecte la estructura
5. **⚠️ IMPORTANTE**: Antes de Deploy:
   - Settings → Environment Variables
   - Agregar cada variable de `Lurica-Backend/.env.example`:
     ```
     DB_HOST = (tu host)
     DB_USER = (tu usuario)
     DB_PASSWORD = (tu password)
     DB_PORT = 3306
     DB_NAME = (tu db)
     JWT_SECRET = (genera uno seguro)
     NODE_ENV = production
     ```
6. Clickear "Deploy"
7. Esperar a que termine (2-3 min)

### Para Frontend:
1. "+ New Project" nuevamente
2. Conectar el mismo repo
3. Vercel detecta que es Vite
4. Deploy
5. Nota la URL que te da (ej: lurica-frontend.vercel.app)

## ✅ Paso 5: Verificación (instant)

```bash
# Backend debe responder
curl https://tu-backend.vercel.app/

# Debe retornar:
# {"message":"Welcome to lurica api"}
```

Abre https://tu-frontend.vercel.app en navegador
- ¿La página carga? ✅
- ¿Puedes navegar? ✅
- ¿El login funciona? ✅

## 🎉 ¡LISTO!

Tu web está en Vercel y en vivo.

---

## 🚨 Si algo no funciona:

### Backend no responde
1. Revisar Vercel → Deployments → Click en el último
2. Ver "Runtime Logs" sección
3. Probablemente falta variable de entorno

### Frontend no conecta con API
1. Abrir DevTools (F12) → Network tab
2. Ver a qué URL está pidiendo
3. Revisar que es `/api/...`

### Base de datos no conecta
1. Verificar credenciales en Vercel Dashboard
2. Verificar que MySQL permite conexiones desde internet
3. Agregar IP de Vercel al whitelist de MySQL

---

## 💡 Tips Rápidos

- Vercel auto-redeploya cada vez que haces `git push`
- Los logs están disponibles en Dashboard → Deployments
- El dominio personalizado se configura en Settings → Domains
- SSL/TLS es automático (https)

---

**¡Tu web está lista para el mundo! 🌍**

Próximos pasos opcionales:
- Configurar dominio personalizado
- Configurar alias/redirects
- Configurar analytics
- Revisar variables de rendimiento
