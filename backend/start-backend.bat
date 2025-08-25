@echo off
echo 🏛️  ABOGADO WILSON - BACKEND PROFESIONAL
echo =====================================

cd /d "%~dp0"

echo 📦 Instalando dependencias...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias
    pause
    exit /b 1
)

echo 🚀 Iniciando servidor backend...
echo 🔗 API URL: http://localhost:8787/api
echo 📊 Servicios: Auth, MCP, AI, WhatsApp, Pagos
echo =====================================

call npm start

pause
