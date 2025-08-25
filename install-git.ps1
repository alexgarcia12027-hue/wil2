# Script para instalar Git automáticamente
Write-Host "Instalando Git..." -ForegroundColor Green

# Descargar Git para Windows
$gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe"
$gitInstaller = "$env:TEMP\GitInstaller.exe"

Write-Host "Descargando Git..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $gitUrl -OutFile $gitInstaller

Write-Host "Instalando Git..." -ForegroundColor Yellow
Start-Process -FilePath $gitInstaller -ArgumentList "/VERYSILENT /NORESTART" -Wait

Write-Host "Git instalado correctamente!" -ForegroundColor Green

# Refrescar variables de entorno
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Git está listo para usar!" -ForegroundColor Green
