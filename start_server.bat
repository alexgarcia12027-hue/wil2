@echo off
echo Iniciando servidor web en http://localhost:8000
echo Si ves un aviso de Firewall de Windows, por favor, permite el acceso.
cd C:\Users\Usuario\1
python -m http.server 8000
pause
