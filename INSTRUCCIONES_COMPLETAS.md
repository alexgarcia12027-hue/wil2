# 🚀 Guía Completa para Ejecutar Abogado Wilson en Localhost

## 📋 Opciones Disponibles

### **OPCIÓN 1: Instalación Manual de Node.js (Recomendada)**

1. **Descargar Node.js:**
   - Ve a: https://nodejs.org/
   - Descarga la versión LTS (Long Term Support)
   - Ejecuta el instalador como administrador

2. **Verificar instalación:**
   ```cmd
   node --version
   npm --version
   ```

3. **Ejecutar aplicación:**
   ```cmd
   cd C:\Users\Usuario\1
   npm install
   npm run dev
   ```

### **OPCIÓN 2: Usar Chocolatey (Gestor de paquetes)**

1. **Instalar Chocolatey:**
   - Abre PowerShell como administrador
   - Ejecuta:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. **Instalar Node.js:**
   ```cmd
   choco install nodejs
   ```

### **OPCIÓN 3: Usar Winget (Windows Package Manager)**

```cmd
winget install OpenJS.NodeJS
```

### **OPCIÓN 4: Portable Node.js**

1. Descarga Node.js portable desde: https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip
2. Extrae en `C:\nodejs`
3. Agrega `C:\nodejs` al PATH del sistema

## 🌐 URLs de Acceso

Una vez iniciado el servidor:
- **Local**: http://localhost:5173
- **Red**: http://[tu-ip]:5173

## 🔧 Comandos Útiles

```cmd
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Características de la Aplicación

- ✅ Sitio web profesional para Abg. Wilson Ipiales
- ✅ Servicios legales completos
- ✅ Formulario de contacto
- ✅ Integración WhatsApp
- ✅ Diseño responsive
- ✅ Optimizado para SEO

## 🆘 Solución de Problemas

### Error: "npm no reconocido"
- Reinicia la terminal después de instalar Node.js
- Verifica que Node.js esté en el PATH

### Error: "Puerto en uso"
- Cambia el puerto en `vite.config.js`
- O mata el proceso: `taskkill /f /im node.exe`

### Error de dependencias
```cmd
rm -rf node_modules
rm package-lock.json
npm install
```

## 📞 Contacto del Abogado

- **WhatsApp**: +593988352269
- **Especialidades**: Derecho penal, civil, tránsito, comercial, aduanas
- **Ubicación**: Ibarra, Ecuador
