// Script para crear iconos PWA usando canvas
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Crear directorio de iconos si no existe
const iconsDir = path.join(__dirname, 'public', 'assets', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Función para crear un icono simple
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Texto "AW"
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AW', size / 2, size / 2);
  
  // Guardar archivo
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(iconsDir, `icon-${size}x${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`Creado: ${filename}`);
}

// Crear todos los tamaños necesarios
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
sizes.forEach(createIcon);

console.log('Todos los iconos PWA han sido creados exitosamente');
