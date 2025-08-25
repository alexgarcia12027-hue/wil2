@echo off
echo ================================
echo   INSTALANDO NODE.JS
echo ================================
echo.

echo Descargando Node.js LTS...
powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -OutFile '%TEMP%\nodejs-installer.msi'"

if %errorlevel% neq 0 (
    echo ERROR: No se pudo descargar Node.js
    echo Verifica tu conexion a internet
    pause
    exit /b 1
)

echo.
echo Instalando Node.js...
echo (Esto puede tomar unos minutos)
msiexec /i "%TEMP%\nodejs-installer.msi" /quiet /norestart

if %errorlevel% neq 0 (
    echo ERROR: Fallo la instalacion de Node.js
    pause
    exit /b 1
)

echo.
echo Limpiando archivos temporales...
del "%TEMP%\nodejs-installer.msi" /q

echo.
echo ================================
echo   NODE.JS INSTALADO CORRECTAMENTE
echo ================================
echo.
echo IMPORTANTE: Cierra esta ventana y abre una nueva ventana de comandos
echo para que los cambios tomen efecto.
echo.
echo Luego ejecuta: start-localhost.bat
echo.
pause
