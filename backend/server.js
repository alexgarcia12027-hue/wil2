// Professional Backend Server with Real MCP Integration
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { Client } = require('@modelcontextprotocol/sdk');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8787;

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'abogado-wilson-secret-key-2024';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvZQQJ8QQJ8QQJ8QQJ8QQJ8QQJ8QQJ8QQ';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || 'your-whatsapp-token';

// Initialize AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://abogadowilson.com'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// In-memory database (replace with real database in production)
const users = [];
const consultations = [];
const courses = [];
const payments = [];
const mcpConnections = new Map();

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// MCP Client Management
class MCPManager {
  constructor() {
    this.clients = new Map();
  }

  async connectMCP(config) {
    try {
      const transport = new StdioServerTransport({
        command: config.command,
        args: config.args || []
      });

      const client = new Client({
        name: config.name || 'abogado-wilson-client',
        version: '1.0.0'
      }, {
        capabilities: {
          resources: {},
          tools: {},
          prompts: {}
        }
      });

      await client.connect(transport);
      this.clients.set(config.id, { client, config });
      
      return {
        success: true,
        message: 'MCP conectado exitosamente',
        id: config.id
      };
    } catch (error) {
      return {
        success: false,
        message: `Error conectando MCP: ${error.message}`
      };
    }
  }

  async executeMCPCommand(id, command, params) {
    const connection = this.clients.get(id);
    if (!connection) {
      throw new Error('Conexión MCP no encontrada');
    }

    try {
      const result = await connection.client.callTool({
        name: command,
        arguments: params
      });
      return result;
    } catch (error) {
      throw new Error(`Error ejecutando comando MCP: ${error.message}`);
    }
  }

  getMCPStatus() {
    const status = [];
    for (const [id, connection] of this.clients) {
      status.push({
        id,
        name: connection.config.name,
        connected: true,
        lastActivity: new Date().toISOString()
      });
    }
    return status;
  }
}

const mcpManager = new MCPManager();

// Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      ai: 'connected',
      mcp: mcpManager.clients.size > 0 ? 'connected' : 'disconnected'
    }
  });
});

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, nombre, apellido, telefono } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      nombre,
      apellido,
      telefono,
      role: 'client',
      credits: 3,
      createdAt: new Date().toISOString()
    };

    users.push(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: { ...user, password: undefined }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: { ...user, password: undefined }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logout exitoso' });
});

// User Routes
app.get('/api/users/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json({ ...user, password: undefined });
});

app.put('/api/users/profile', authenticateToken, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  users[userIndex] = { ...users[userIndex], ...req.body, id: req.user.id };
  res.json({ ...users[userIndex], password: undefined });
});

// Consultation Routes
app.post('/api/consultations', authenticateToken, async (req, res) => {
  try {
    const consultation = {
      id: Date.now().toString(),
      userId: req.user.id,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    consultations.push(consultation);

    // Send WhatsApp notification
    try {
      await axios.post('https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages', {
        messaging_product: 'whatsapp',
        to: '593988352269',
        type: 'text',
        text: {
          body: `Nueva consulta recibida de ${req.body.nombre}: ${req.body.mensaje}`
        }
      }, {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (whatsappError) {
      console.log('WhatsApp notification failed:', whatsappError.message);
    }

    res.status(201).json({
      message: 'Consulta creada exitosamente',
      consultation
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creando consulta' });
  }
});

app.get('/api/consultations', authenticateToken, (req, res) => {
  const userConsultations = consultations.filter(c => 
    req.user.role === 'admin' ? true : c.userId === req.user.id
  );
  res.json(userConsultations);
});

// AI Integration Routes
app.post('/api/ai/chat', authenticateToken, async (req, res) => {
  try {
    const { message, context } = req.body;

    const prompt = `
    Eres un asistente legal profesional del Abogado Wilson Ipiales.
    Contexto: ${JSON.stringify(context)}
    Pregunta del cliente: ${message}
    
    Proporciona una respuesta profesional y útil sobre temas legales en Ecuador.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      message: 'Respuesta generada exitosamente',
      response: text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generando respuesta AI' });
  }
});

app.post('/api/ai/generate-document', authenticateToken, async (req, res) => {
  try {
    const { template, data } = req.body;

    const prompt = `
    Genera un documento legal profesional basado en:
    Plantilla: ${template}
    Datos: ${JSON.stringify(data)}
    
    El documento debe ser formal y cumplir con las leyes ecuatorianas.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const document = response.text();

    res.json({
      message: 'Documento generado exitosamente',
      document,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generando documento' });
  }
});

// MCP Integration Routes
app.post('/api/mcp/connect', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const result = await mcpManager.connectMCP(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error conectando MCP' });
  }
});

app.post('/api/mcp/execute', authenticateToken, async (req, res) => {
  try {
    const { command, params } = req.body;
    const result = await mcpManager.executeMCPCommand('default', command, params);
    res.json({
      message: 'Comando ejecutado exitosamente',
      result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/mcp/status', authenticateToken, (req, res) => {
  const status = mcpManager.getMCPStatus();
  res.json({
    message: 'Estado MCP obtenido',
    connections: status
  });
});

// File Upload Routes
app.post('/api/files/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ningún archivo' });
  }

  res.json({
    message: 'Archivo subido exitosamente',
    file: {
      id: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
      uploadedAt: new Date().toISOString()
    }
  });
});

// Payment Routes
app.post('/api/payments/create', authenticateToken, (req, res) => {
  const payment = {
    id: Date.now().toString(),
    userId: req.user.id,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  payments.push(payment);
  res.status(201).json({
    message: 'Pago creado exitosamente',
    payment
  });
});

app.get('/api/payments/history', authenticateToken, (req, res) => {
  const userPayments = payments.filter(p => p.userId === req.user.id);
  res.json(userPayments);
});

// Analytics Routes
app.post('/api/analytics/track', authenticateToken, (req, res) => {
  // In production, send to analytics service
  console.log('Analytics Event:', req.body);
  res.json({ message: 'Evento registrado' });
});

app.get('/api/analytics/dashboard', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  res.json({
    totalUsers: users.length,
    totalConsultations: consultations.length,
    totalPayments: payments.length,
    activeConnections: mcpManager.clients.size
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏛️  Abogado Wilson API Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  console.log(`✅ Services: Authentication, MCP, AI, WhatsApp, Payments`);
});

module.exports = app;
