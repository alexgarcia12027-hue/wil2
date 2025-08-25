#!/usr/bin/env python3
"""
Servidor HTTP profesional para Abogado Wilson
Verificación completa de puerto y funcionalidad
"""
import http.server
import socketserver
import os
import sys
import webbrowser
import time
from pathlib import Path

PORT = 3000
DIRECTORY = Path(__file__).parent

class ProfessionalHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()
    
    def do_GET(self):
        # Ruteo para React Router
        if self.path.startswith('/dashboard') or self.path.startswith('/admin') or self.path.startswith('/client'):
            self.path = '/index.html'
        elif self.path == '/':
            self.path = '/static-index.html'
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        print(f"✅ {format % args}")

def check_port_available(port):
    """Verificar si el puerto está disponible"""
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', port))
    sock.close()
    return result != 0

def main():
    print("🏛️  ABOGADO WILSON - SERVIDOR PROFESIONAL")
    print("=" * 60)
    
    # Verificar puerto
    if not check_port_available(PORT):
        print(f"⚠️  Puerto {PORT} ocupado. Intentando puerto alternativo...")
        PORT_ALT = PORT + 1
        if check_port_available(PORT_ALT):
            global PORT
            PORT = PORT_ALT
        else:
            print("❌ Puertos ocupados. Cerrando procesos...")
            os.system(f"taskkill /F /IM python.exe 2>nul")
            time.sleep(2)
    
    print(f"📂 Directorio: {DIRECTORY}")
    print(f"🌐 Puerto: {PORT}")
    print(f"🔗 URL Principal: http://localhost:{PORT}")
    print(f"🔗 Aplicación React: http://localhost:{PORT}/index.html")
    print("=" * 60)
    
    try:
        with socketserver.TCPServer(("", PORT), ProfessionalHandler) as httpd:
            print("✅ SERVIDOR INICIADO CORRECTAMENTE")
            print("🌐 Abriendo navegador...")
            print("🛑 Presiona Ctrl+C para detener")
            print()
            
            # Abrir navegador
            webbrowser.open(f'http://localhost:{PORT}')
            
            # Servir indefinidamente
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n✅ Servidor detenido correctamente")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
