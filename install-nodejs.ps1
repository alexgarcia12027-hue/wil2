# Install Node.js for Abogado Wilson Backend
Write-Host "🏛️  ABOGADO WILSON - INSTALACIÓN NODE.JS" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Check if Node.js is already installed
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js ya está instalado: $nodeVersion" -ForegroundColor Green
        exit 0
    }
} catch {
    Write-Host "📦 Node.js no encontrado. Iniciando instalación..." -ForegroundColor Yellow
}

# Download and install Node.js
$nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
$installerPath = "$env:TEMP\nodejs-installer.msi"

Write-Host "⬇️  Descargando Node.js..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath -UseBasicParsing
    Write-Host "✅ Descarga completada" -ForegroundColor Green
} catch {
    Write-Host "❌ Error descargando Node.js: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "🔧 Instalando Node.js..." -ForegroundColor Yellow
try {
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait
    Write-Host "✅ Node.js instalado correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error instalando Node.js: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verify installation
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Instalación verificada:" -ForegroundColor Green
    Write-Host "   Node.js: $nodeVersion" -ForegroundColor White
    Write-Host "   npm: $npmVersion" -ForegroundColor White
} catch {
    Write-Host "⚠️  Instalación completada. Reinicie PowerShell para usar Node.js" -ForegroundColor Yellow
}

# Clean up
Remove-Item $installerPath -Force -ErrorAction SilentlyContinue

Write-Host "🚀 ¡Listo para ejecutar el backend!" -ForegroundColor Green
