#!/bin/bash
# Comandos rápidos para Deployment a Vercel
# Copiar y ejecutar según sea necesario

# =============================================================================
# 🔧 SETUP INICIAL
# =============================================================================

# Instalar Vercel CLI (una sola vez)
npm install -g vercel

# =============================================================================
# 📱 BACKEND - DEPLOYMENT
# =============================================================================

# 1. Preparar backend
cd Lurica-Backend
cp .env.example .env
# ⚠️ EDITA .env con tus credenciales de base de datos

# 2. Instalar dependencias localmente (para verificar)
pnpm install

# 3. Verificar que funciona localmente
pnpm dev
# Verifica que pueda conectar a DB

# 4. Hacer commit y push
git add .
git commit -m "Preparar backend para Vercel"
git push

# 5. Deploy a Vercel (opción 1: interactivo)
vercel deploy --prod

# O deploy automático desde GitHub
# 1. Ve a https://vercel.com/new
# 2. Conecta tu repositorio GitHub
# 3. Vercel automáticamente deployará cuando hagas git push

# 6. Configurar variables de entorno en Vercel (muy importante!)
# Ir a: https://vercel.com → Proyecto → Settings → Environment Variables
# Agregar todas las variables del .env.example

# 7. Verificar deployment
curl https://tu-backend-vercel-app.vercel.app/
# Debe retornar: {"message":"Welcome to lurica api"}

# =============================================================================
# 🎨 FRONTEND - DEPLOYMENT
# =============================================================================

# 1. Preparar frontend
cd ../Lurica-Frontend
cp .env.example .env
# Actualizar VITE_API_URL si es necesario

# 2. Instalar dependencias
pnpm install

# 3. Verificar build localmente
pnpm build
pnpm preview
# Abre http://localhost:5173 y verifica que funciona

# 4. Hacer commit y push
git add .
git commit -m "Preparar frontend para Vercel"
git push

# 5. Deploy a Vercel (opción 1: interactivo)
vercel deploy --prod

# O deploy automático desde GitHub (recomendado)
# Vercel detectará automáticamente que es un proyecto Vite
# y configurará todo correctamente

# 6. Verificar deployment
# Abre https://tu-frontend-vercel-app.vercel.app en el navegador
# Verifica que:
# - Página carga
# - Puede navegar
# - Puede acceder a /login

# =============================================================================
# 🔗 CONECTAR FRONTEND CON BACKEND
# =============================================================================

# Opción 1: Usar mismo dominio con rewrites (recomendado)
# En la raíz del proyecto, crear/actualizar vercel.json:
cat > vercel.json << 'EOF'
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://tu-backend.vercel.app/api/:path*"
    }
  ]
}
EOF

# Opción 2: Actualizar CORS en backend
# Editar: Lurica-Backend/middlewares/cors.js
# Agregar URLs de frontend en ACCEPTED_ORIGINS

# =============================================================================
# 🧪 VERIFICACIÓN POST-DEPLOYMENT
# =============================================================================

# Probar backend
curl https://tu-backend.vercel.app/
curl https://tu-backend.vercel.app/products

# Probar frontend en navegador
# https://tu-frontend.vercel.app

# Probar login
# 1. Ir a https://tu-frontend.vercel.app/login
# 2. Intentar login
# 3. Si funciona, todo está OK!

# =============================================================================
# 📊 MONITOREO Y LOGS
# =============================================================================

# Ver logs del backend
vercel logs tu-backend-nombre

# Ver logs del frontend
vercel logs tu-frontend-nombre

# Ver estado de deployment
vercel status

# =============================================================================
# 🔄 ACTUALIZACIONES FUTURAS
# =============================================================================

# Para actualizar código en Vercel, simplemente:
git push

# Vercel automáticamente detectará los cambios y re-deployará
# (si está conectado a GitHub)

# O redeploy manualmente:
vercel deploy --prod

# =============================================================================
# 🚨 TROUBLESHOOTING RÁPIDO
# =============================================================================

# Si el backend no conecta a DB:
# 1. Verificar credenciales en Vercel → Environment Variables
# 2. Verificar que IP de Vercel está en whitelist de MySQL
# 3. Revisar logs: vercel logs tu-backend-nombre

# Si CORS error:
# 1. Verificar que el origin está en ACCEPTED_ORIGINS
# 2. Verificar que FRONTEND_URL está configurado
# 3. Revisar logs del backend

# Si frontend no conecta con API:
# 1. Abrir DevTools (F12) → Network
# 2. Ver qué URL está usando para las requests
# 3. Verificar que baseURL en axios es correcto
# 4. Si usa /api/, verificar que rewrite está en vercel.json

# =============================================================================
# 📝 NOTAS IMPORTANTES
# =============================================================================

# - NUNCA commits archivos .env (solo .env.example)
# - Las variables de entorno deben configurarse en Vercel Dashboard
# - El MySQL debe ser accesible desde internet
# - El dominio debe tener DNS configurado
# - SSL/TLS es automático en Vercel (https)
# - Los logs están disponibles en Vercel Dashboard → Deployments → Runtime Logs

echo "✅ Comandos de referencia. Ejecutar los que apliquen según tu situación."
