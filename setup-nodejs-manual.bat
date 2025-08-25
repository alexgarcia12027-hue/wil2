@echo off
echo ================================
echo   CONFIGURACION MANUAL NODE.JS
echo ================================
echo.

echo PASO 1: Descarga Node.js manualmente
echo.
echo 1. Ve a: https://nodejs.org/
echo 2. Descarga "LTS" (version estable)
echo 3. Ejecuta el instalador como ADMINISTRADOR
echo 4. Reinicia esta terminal despues de instalar
echo.
echo PASO 2: Verifica la instalacion
echo.
echo Ejecuta estos comandos para verificar:
echo   node --version
echo   npm --version
echo.
echo PASO 3: Inicia la aplicacion
echo.
echo   npm install
echo   npm run dev
echo.
echo ================================
echo Tu aplicacion estara en:
echo http://localhost:5173
echo ================================
echo.

echo ¿Quieres abrir la pagina de descarga de Node.js? (s/n)
set /p choice=
if /i "%choice%"=="s" (
    start https://nodejs.org/
    echo.
    echo Pagina de descarga abierta en tu navegador.
    echo Descarga e instala Node.js, luego ejecuta: start-localhost.bat
)

echo.
pause
