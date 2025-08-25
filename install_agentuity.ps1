# Este script instala Agentuity CLI usando WSL.
# IMPORTANTE: Antes de ejecutar, asegúrate de haber instalado WSL y reiniciado tu computadora.
# Para ejecutar este script, haz clic derecho sobre él y selecciona "Ejecutar con PowerShell".

Write-Host "Iniciando la instalación de Agentuity CLI..."
Write-Host "Esto puede tardar unos minutos."

# Ejecuta el comando de instalación de Agentuity dentro de WSL
wsl curl -fsSL https://agentuity.com/install.sh | wsl sh

Write-Host "Instalación de Agentuity CLI completada."
Write-Host "Ahora, por favor, ejecuta el siguiente comando en tu terminal para iniciar sesión:"
Write-Host "wsl agentuity login"

# Mantén la ventana abierta para que el usuario pueda leer el mensaje.
Read-Host "Presiona Enter para salir."
