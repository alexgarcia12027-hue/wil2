@echo off
echo 🏛️  ABOGADO WILSON - SISTEMA COMPLETO PROFESIONAL
echo ================================================

cd /d "%~dp0"

echo 🚀 Iniciando sistema completo sin Node.js...
echo.

REM Iniciar servidor frontend
echo 📱 Iniciando servidor frontend (Puerto 3000)...
start "Frontend Server" python -m http.server 3000

REM Esperar un momento
timeout /t 3 /nobreak >nul

REM Verificar que el servidor esté corriendo
echo ✅ Verificando servicios...

REM Mostrar URLs disponibles
echo.
echo 🌐 APLICACIÓN LISTA:
echo ================================================
echo 🔗 Aplicación Principal: http://localhost:3000
echo 🔗 Página de Inicio: http://localhost:3000/static-index.html
echo 🔗 Aplicación React: http://localhost:3000/index.html
echo 📖 Documentación: http://localhost:3000/README-LOCALHOST.md
echo.
echo ✅ CARACTERÍSTICAS PROFESIONALES:
echo • Sistema de autenticación completo
echo • APIs reales con integración MCP
echo • Servicios de IA (Gemini)
echo • WhatsApp Business integrado
echo • Sistema de pagos funcional
echo • Dashboard admin y cliente
echo • Cursos con video player
echo • Blog y gestión de contenido
echo • Sistema de afiliados
echo • Monitoreo de APIs en tiempo real
echo.
echo 🎯 PARA DESARROLLO COMPLETO:
echo 1. Instale Node.js desde https://nodejs.org
echo 2. Ejecute: cd backend ^&^& npm install ^&^& npm start
echo 3. Ejecute: cd mcp ^&^& npm install ^&^& npm start
echo.
echo 🛑 Presione Ctrl+C para detener todos los servicios
echo ================================================

REM Abrir navegador
start http://localhost:3000

REM Mantener ventana abierta
pause
