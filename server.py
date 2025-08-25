#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuración del servidor
PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Agregar headers CORS para desarrollo
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        # Log personalizado
        print(f"[{self.address_string()}] {format % args}")

def main():
    print("🚀 Iniciando servidor HTTP para Abogado Wilson...")
    print(f"📂 Directorio: {DIRECTORY}")
    print(f"🌐 Puerto: {PORT}")
    print(f"🔗 URL: http://localhost:{PORT}")
    print("🛑 Presiona Ctrl+C para detener")
    print("-" * 50)
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ Servidor detenido correctamente")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Puerto {PORT} ya está en uso")
            print("💡 Intenta con otro puerto o cierra el proceso que lo está usando")
        else:
            print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
