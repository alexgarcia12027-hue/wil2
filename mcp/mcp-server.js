#!/usr/bin/env node

// Professional MCP Server for Abogado Wilson
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const fs = require('fs').promises;
const path = require('path');

class AbogadoWilsonMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'abogado-wilson-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
          prompts: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available resources
    this.server.setRequestHandler('resources/list', async () => {
      return {
        resources: [
          {
            uri: 'legal://documents',
            name: 'Legal Documents',
            description: 'Access to legal document templates',
            mimeType: 'application/json',
          },
          {
            uri: 'legal://cases',
            name: 'Legal Cases',
            description: 'Case management and tracking',
            mimeType: 'application/json',
          },
          {
            uri: 'legal://clients',
            name: 'Client Database',
            description: 'Client information and history',
            mimeType: 'application/json',
          },
        ],
      };
    });

    // Read resource content
    this.server.setRequestHandler('resources/read', async (request) => {
      const { uri } = request.params;

      switch (uri) {
        case 'legal://documents':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({
                  templates: [
                    {
                      id: 'contract',
                      name: 'Contrato de Servicios',
                      category: 'contratos',
                      fields: ['cliente', 'servicio', 'fecha', 'monto']
                    },
                    {
                      id: 'demand',
                      name: 'Demanda Civil',
                      category: 'litigios',
                      fields: ['demandante', 'demandado', 'causa', 'pretension']
                    },
                    {
                      id: 'power-attorney',
                      name: 'Poder Especial',
                      category: 'poderes',
                      fields: ['poderdante', 'apoderado', 'facultades']
                    }
                  ]
                }, null, 2),
              },
            ],
          };

        case 'legal://cases':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({
                  cases: [
                    {
                      id: 'case-001',
                      client: 'Juan Pérez',
                      type: 'Civil',
                      status: 'active',
                      description: 'Demanda por incumplimiento contractual',
                      nextHearing: '2024-09-15',
                      documents: ['contract.pdf', 'evidence.pdf']
                    },
                    {
                      id: 'case-002',
                      client: 'María García',
                      type: 'Laboral',
                      status: 'pending',
                      description: 'Despido intempestivo',
                      nextHearing: '2024-09-20',
                      documents: ['work-contract.pdf', 'termination.pdf']
                    }
                  ]
                }, null, 2),
              },
            ],
          };

        case 'legal://clients':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({
                  clients: [
                    {
                      id: 'client-001',
                      name: 'Juan Pérez',
                      email: 'juan@email.com',
                      phone: '+593987654321',
                      cases: ['case-001'],
                      status: 'active'
                    },
                    {
                      id: 'client-002',
                      name: 'María García',
                      email: 'maria@email.com',
                      phone: '+593987654322',
                      cases: ['case-002'],
                      status: 'active'
                    }
                  ]
                }, null, 2),
              },
            ],
          };

        default:
          throw new Error(`Resource not found: ${uri}`);
      }
    });

    // List available tools
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'generate_document',
            description: 'Generate legal documents from templates',
            inputSchema: {
              type: 'object',
              properties: {
                template: {
                  type: 'string',
                  description: 'Template ID to use',
                },
                data: {
                  type: 'object',
                  description: 'Data to fill the template',
                },
              },
              required: ['template', 'data'],
            },
          },
          {
            name: 'search_cases',
            description: 'Search legal cases by criteria',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query',
                },
                type: {
                  type: 'string',
                  description: 'Case type filter',
                },
                status: {
                  type: 'string',
                  description: 'Case status filter',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'calculate_fees',
            description: 'Calculate legal fees based on case type and complexity',
            inputSchema: {
              type: 'object',
              properties: {
                caseType: {
                  type: 'string',
                  description: 'Type of legal case',
                },
                complexity: {
                  type: 'string',
                  enum: ['simple', 'medium', 'complex'],
                  description: 'Case complexity level',
                },
                hours: {
                  type: 'number',
                  description: 'Estimated hours',
                },
              },
              required: ['caseType', 'complexity'],
            },
          },
          {
            name: 'schedule_appointment',
            description: 'Schedule client appointments',
            inputSchema: {
              type: 'object',
              properties: {
                clientId: {
                  type: 'string',
                  description: 'Client identifier',
                },
                date: {
                  type: 'string',
                  description: 'Appointment date (YYYY-MM-DD)',
                },
                time: {
                  type: 'string',
                  description: 'Appointment time (HH:MM)',
                },
                type: {
                  type: 'string',
                  description: 'Appointment type',
                },
              },
              required: ['clientId', 'date', 'time', 'type'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'generate_document':
          return await this.generateDocument(args.template, args.data);

        case 'search_cases':
          return await this.searchCases(args.query, args.type, args.status);

        case 'calculate_fees':
          return await this.calculateFees(args.caseType, args.complexity, args.hours);

        case 'schedule_appointment':
          return await this.scheduleAppointment(args.clientId, args.date, args.time, args.type);

        default:
          throw new Error(`Tool not found: ${name}`);
      }
    });

    // List available prompts
    this.server.setRequestHandler('prompts/list', async () => {
      return {
        prompts: [
          {
            name: 'legal_analysis',
            description: 'Analyze legal cases and provide recommendations',
            arguments: [
              {
                name: 'case_details',
                description: 'Details of the legal case',
                required: true,
              },
            ],
          },
          {
            name: 'contract_review',
            description: 'Review contracts and identify potential issues',
            arguments: [
              {
                name: 'contract_text',
                description: 'Contract text to review',
                required: true,
              },
            ],
          },
        ],
      };
    });

    // Handle prompt requests
    this.server.setRequestHandler('prompts/get', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'legal_analysis':
          return {
            description: 'Legal case analysis prompt',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Analiza el siguiente caso legal y proporciona recomendaciones:

Detalles del caso: ${args.case_details}

Por favor proporciona:
1. Análisis legal del caso
2. Precedentes relevantes
3. Estrategia recomendada
4. Riesgos potenciales
5. Próximos pasos

Responde como un abogado experto en derecho ecuatoriano.`,
                },
              },
            ],
          };

        case 'contract_review':
          return {
            description: 'Contract review prompt',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Revisa el siguiente contrato e identifica posibles problemas:

Texto del contrato: ${args.contract_text}

Por favor identifica:
1. Cláusulas problemáticas
2. Términos ambiguos
3. Derechos y obligaciones desequilibrados
4. Recomendaciones de mejora
5. Cumplimiento con la ley ecuatoriana

Proporciona un análisis detallado y profesional.`,
                },
              },
            ],
          };

        default:
          throw new Error(`Prompt not found: ${name}`);
      }
    });
  }

  async generateDocument(template, data) {
    const templates = {
      contract: `
CONTRATO DE SERVICIOS PROFESIONALES

Entre: ${data.cliente}
Y: Abogado Wilson Ipiales

Servicio: ${data.servicio}
Fecha: ${data.fecha}
Monto: $${data.monto}

[Contenido del contrato generado automáticamente]
      `,
      demand: `
DEMANDA CIVIL

Demandante: ${data.demandante}
Demandado: ${data.demandado}
Causa: ${data.causa}
Pretensión: ${data.pretension}

[Contenido de la demanda generado automáticamente]
      `,
      'power-attorney': `
PODER ESPECIAL

Poderdante: ${data.poderdante}
Apoderado: ${data.apoderado}
Facultades: ${data.facultades}

[Contenido del poder generado automáticamente]
      `
    };

    const document = templates[template];
    if (!document) {
      throw new Error(`Template not found: ${template}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: `Documento generado exitosamente:\n\n${document}`,
        },
      ],
    };
  }

  async searchCases(query, type, status) {
    // Simulated case search
    const allCases = [
      {
        id: 'case-001',
        client: 'Juan Pérez',
        type: 'Civil',
        status: 'active',
        description: 'Demanda por incumplimiento contractual'
      },
      {
        id: 'case-002',
        client: 'María García',
        type: 'Laboral',
        status: 'pending',
        description: 'Despido intempestivo'
      }
    ];

    let results = allCases.filter(case_ => 
      case_.description.toLowerCase().includes(query.toLowerCase()) ||
      case_.client.toLowerCase().includes(query.toLowerCase())
    );

    if (type) {
      results = results.filter(case_ => case_.type === type);
    }

    if (status) {
      results = results.filter(case_ => case_.status === status);
    }

    return {
      content: [
        {
          type: 'text',
          text: `Casos encontrados: ${results.length}\n\n${JSON.stringify(results, null, 2)}`,
        },
      ],
    };
  }

  async calculateFees(caseType, complexity, hours = 10) {
    const baseFees = {
      'Civil': 500,
      'Laboral': 400,
      'Penal': 800,
      'Comercial': 600,
      'Familia': 350
    };

    const complexityMultiplier = {
      'simple': 1.0,
      'medium': 1.5,
      'complex': 2.0
    };

    const baseRate = baseFees[caseType] || 400;
    const multiplier = complexityMultiplier[complexity] || 1.0;
    const hourlyRate = 50;

    const totalFee = (baseRate * multiplier) + (hours * hourlyRate);

    return {
      content: [
        {
          type: 'text',
          text: `Cálculo de honorarios:
Tipo de caso: ${caseType}
Complejidad: ${complexity}
Horas estimadas: ${hours}

Tarifa base: $${baseRate}
Multiplicador: ${multiplier}x
Tarifa por hora: $${hourlyRate}

Total estimado: $${totalFee}`,
        },
      ],
    };
  }

  async scheduleAppointment(clientId, date, time, type) {
    return {
      content: [
        {
          type: 'text',
          text: `Cita programada exitosamente:
Cliente: ${clientId}
Fecha: ${date}
Hora: ${time}
Tipo: ${type}

La cita ha sido registrada en el sistema.`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('🏛️  Abogado Wilson MCP Server running');
  }
}

// Start the server
const server = new AbogadoWilsonMCPServer();
server.run().catch(console.error);
