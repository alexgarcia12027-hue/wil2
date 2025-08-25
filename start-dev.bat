@echo off
echo ================================
echo   INICIANDO SERVIDOR DE DESARROLLO
echo ================================

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    echo Ejecutando instalación automática...
    call install-nodejs.bat
    if %errorlevel% neq 0 (
        echo ❌ Error al instalar Node.js
        pause
        exit /b 1
    )
)

REM Verificar si npm está disponible
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está disponible
    echo Reiniciando terminal...
    pause
    exit /b 1
)

echo ✅ Node.js detectado: 
node --version
echo ✅ npm detectado:
npm --version

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Error al instalar dependencias
        pause
        exit /b 1
    )
)

echo 🚀 Iniciando servidor de desarrollo...
echo.
echo 📱 La aplicación se abrirá en: http://localhost:5173
echo 🔄 El servidor se recargará automáticamente al hacer cambios
echo 🛑 Presiona Ctrl+C para detener el servidor
echo.

REM Iniciar el servidor de desarrollo
npm run dev

pause
