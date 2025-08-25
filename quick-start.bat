@echo off
echo ================================
echo   INICIO RAPIDO - SERVIDOR LOCAL
echo ================================

REM Usar Node.js portable si está disponible
if exist "node-portable\node.exe" (
    echo ✅ Usando Node.js portable
    set PATH=%CD%\node-portable;%PATH%
) else (
    echo ⚠️ Node.js portable no encontrado, usando sistema
)

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no disponible
    echo.
    echo Opciones:
    echo 1. Instalar Node.js manualmente desde https://nodejs.org
    echo 2. Usar servidor Python simple
    echo.
    choice /c 12 /m "Seleccione opción"
    if %errorlevel%==2 goto python_server
    echo Instale Node.js y ejecute este archivo nuevamente
    pause
    exit /b 1
)

REM Instalar dependencias básicas si no existen
if not exist "node_modules" (
    echo 📦 Instalando dependencias mínimas...
    npm install --production --no-optional
)

echo 🚀 Iniciando aplicación...
echo.
echo 📱 Abrir en navegador: http://localhost:5173
echo 🛑 Presiona Ctrl+C para detener
echo.

REM Iniciar con configuración mínima
npm run dev -- --host 0.0.0.0 --port 5173

goto end

:python_server
echo 🐍 Iniciando servidor Python simple...
echo 📱 Abrir en navegador: http://localhost:8000
python -m http.server 8000 2>nul || python3 -m http.server 8000

:end
pause
