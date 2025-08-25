// Start Script for Abogado Wilson Services
const { spawn } = require('child_process');
const path = require('path');

console.log('🏛️  Iniciando servicios del Sistema Legal Profesional Abogado Wilson...');
console.log('==============================================================');

// Start Backend API Server
console.log('🚀 Iniciando Backend API Server...');
const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit'
});

backend.on('error', (error) => {
  console.error('❌ Error al iniciar Backend API Server:', error);
});

backend.on('close', (code) => {
  console.log(`Backend API Server terminado con código ${code}`);
});

// Start MCP Server
console.log('🤖 Iniciando MCP Server...');
const mcp = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'mcp-server'),
  stdio: 'inherit'
});

mcp.on('error', (error) => {
  console.error('❌ Error al iniciar MCP Server:', error);
});

mcp.on('close', (code) => {
  console.log(`MCP Server terminado con código ${code}`);
});

// Start Frontend Development Server
console.log('🌐 Iniciando Frontend Development Server...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit'
});

frontend.on('error', (error) => {
  console.error('❌ Error al iniciar Frontend Development Server:', error);
});

frontend.on('close', (code) => {
  console.log(`Frontend Development Server terminado con código ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🔄 Cerrando todos los servicios...');
  backend.kill();
  mcp.kill();
  frontend.kill();
  process.exit(0);
});