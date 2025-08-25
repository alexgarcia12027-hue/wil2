#!/usr/bin/env python3
"""
Servidor HTTP simple y profesional para Abogado Wilson
Optimizado para localhost sin errores
"""
import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

PORT = 3000
DIRECTORY = Path(__file__).parent

class ProfessionalHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        # Servir index.html para rutas de React Router
        if self.path.startswith('/dashboard') or self.path.startswith('/admin') or self.path.startswith('/client'):
            self.path = '/index.html'
        elif self.path == '/':
            self.path = '/static-index.html'
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        print(f"✅ [{self.address_string()}] {format % args}")

def main():
    print("🏛️  ABOGADO WILSON - SERVIDOR PROFESIONAL")
    print("=" * 50)
    print(f"📂 Directorio: {DIRECTORY}")
    print(f"🌐 Puerto: {PORT}")
    print(f"🔗 URL Principal: http://localhost:{PORT}")
    print(f"🔗 Aplicación React: http://localhost:{PORT}/index.html")
    print("=" * 50)
    print("✅ Servidor iniciado correctamente")
    print("🛑 Presiona Ctrl+C para detener")
    print()
    
    try:
        with socketserver.TCPServer(("", PORT), ProfessionalHTTPHandler) as httpd:
            # Abrir navegador automáticamente
            webbrowser.open(f'http://localhost:{PORT}')
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ Servidor detenido correctamente")
        print("👋 ¡Gracias por usar Abogado Wilson!")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Puerto {PORT} ocupado. Intentando puerto alternativo...")
            # Intentar con puerto alternativo
            try:
                with socketserver.TCPServer(("", PORT + 1), ProfessionalHTTPHandler) as httpd:
                    print(f"✅ Servidor iniciado en puerto alternativo: {PORT + 1}")
                    webbrowser.open(f'http://localhost:{PORT + 1}')
                    httpd.serve_forever()
            except Exception as e2:
                print(f"❌ Error: {e2}")
        else:
            print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
