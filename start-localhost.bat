@echo off
echo ================================
echo   ABOGADO WILSON - LOCALHOST
echo ================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    echo.
    echo Descarga e instala Node.js desde: https://nodejs.org/
    echo Luego ejecuta este script nuevamente.
    echo.
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm no esta disponible
    pause
    exit /b 1
)

echo npm encontrado!
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Fallo al instalar dependencias
        pause
        exit /b 1
    )
) else (
    echo Dependencias ya instaladas.
)

echo.
echo Iniciando servidor en http://localhost:5173
echo Presiona Ctrl+C para detener el servidor
echo.

REM Start the development server
npm run dev
