import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaChartLine, FaClock, FaServer, FaEye, FaRefresh, FaBell, FaDownload } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { externalApiService, dataService, analyticsService } from '../../services/apiService';

const APIMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState({});
  const [apiMetrics, setApiMetrics] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [uptime, setUptime] = useState({});

  const apiEndpoints = [
    {
      id: 'gemini',
      name: 'Google Gemini AI',
      url: 'https://generativelanguage.googleapis.com',
      type: 'AI',
      critical: true,
      description: 'Servicio de IA para consultas legales'
    },
    {
      id: 'mcp',
      name: 'Model Context Protocol',
      url: 'https://api.mcp.dev',
      type: 'Protocol',
      critical: true,
      description: 'Protocolo de contexto para modelos'
    },
    {
      id: 'apifast',
      name: 'APIFast Service',
      url: 'https://api.apifast.com',
      type: 'Service',
      critical: false,
      description: 'Servicios externos rápidos'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business API',
      url: 'https://graph.facebook.com',
      type: 'Messaging',
      critical: false,
      description: 'API de mensajería WhatsApp'
    },
    {
      id: 'stripe',
      name: 'Stripe Payments',
      url: 'https://api.stripe.com',
      type: 'Payment',
      critical: true,
      description: 'Procesamiento de pagos'
    },
    {
      id: 'paypal',
      name: 'PayPal API',
      url: 'https://api.paypal.com',
      type: 'Payment',
      critical: true,
      description: 'Pagos con PayPal'
    }
  ];

  useEffect(() => {
    loadInitialData();
    const interval = setInterval(checkAllAPIs, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        checkAllAPIs(),
        loadMetrics(),
        loadAlerts(),
        loadLogs(),
        loadUptimeData()
      ]);
    } catch (error) {
      console.error('Error loading monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAllAPIs = async () => {
    setRefreshing(true);
    const statusResults = {};
    
    for (const endpoint of apiEndpoints) {
      try {
        const startTime = Date.now();
        const result = await checkAPIHealth(endpoint);
        const responseTime = Date.now() - startTime;
        
        statusResults[endpoint.id] = {
          ...result,
          responseTime,
          lastChecked: new Date().toISOString()
        };
        
        // Log the check
        await logAPICheck(endpoint.id, result.status, responseTime);
        
      } catch (error) {
        statusResults[endpoint.id] = {
          status: 'error',
          message: error.message,
          responseTime: null,
          lastChecked: new Date().toISOString()
        };
      }
    }
    
    setApiStatus(statusResults);
    setRefreshing(false);
    
    // Check for alerts
    checkForAlerts(statusResults);
  };

  const checkAPIHealth = async (endpoint) => {
    try {
      const response = await externalApiService.verifyApiStatus(endpoint.id);
      
      if (response.status === 'success') {
        return {
          status: 'healthy',
          message: 'API funcionando correctamente',
          details: response.data
        };
      } else {
        return {
          status: 'warning',
          message: response.message || 'API con problemas menores',
          details: response.data
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'API no disponible',
        details: null
      };
    }
  };

  const logAPICheck = async (apiId, status, responseTime) => {
    try {
      const logEntry = {
        apiId,
        status,
        responseTime,
        timestamp: new Date().toISOString(),
        details: apiStatus[apiId]?.details || null
      };
      
      await dataService.create('api_logs', logEntry);
      
      // Track analytics
      await analyticsService.trackEvent('api_check', {
        apiId,
        status,
        responseTime,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error logging API check:', error);
    }
  };

  const checkForAlerts = (statusResults) => {
    const newAlerts = [];
    
    Object.entries(statusResults).forEach(([apiId, result]) => {
      const endpoint = apiEndpoints.find(e => e.id === apiId);
      
      if (result.status === 'error' && endpoint.critical) {
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'critical',
          apiId,
          apiName: endpoint.name,
          message: `API crítica ${endpoint.name} no disponible`,
          timestamp: new Date().toISOString()
        });
      } else if (result.status === 'warning') {
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'warning',
          apiId,
          apiName: endpoint.name,
          message: `API ${endpoint.name} con problemas de rendimiento`,
          timestamp: new Date().toISOString()
        });
      } else if (result.responseTime > 5000) {
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'performance',
          apiId,
          apiName: endpoint.name,
          message: `API ${endpoint.name} con tiempo de respuesta alto (${result.responseTime}ms)`,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 50));
      
      // Show toast for critical alerts
      newAlerts.forEach(alert => {
        if (alert.type === 'critical') {
          toast.error(alert.message);
        } else if (alert.type === 'warning') {
          toast.error(alert.message);
        }
      });
    }
  };

  const loadMetrics = async () => {
    try {
      const response = await dataService.getAll('api_metrics');
      if (response.data) {
        setApiMetrics(response.data);
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  const loadAlerts = async () => {
    try {
      const response = await dataService.getAll('api_alerts?limit=50');
      if (response.data) {
        setAlerts(response.data);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  };

  const loadLogs = async () => {
    try {
      const response = await dataService.getAll('api_logs?limit=100');
      if (response.data) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error('Error loading logs:', error);
    }
  };

  const loadUptimeData = async () => {
    try {
      const response = await dataService.getAll('api_uptime');
      if (response.data) {
        setUptime(response.data);
      }
    } catch (error) {
      console.error('Error loading uptime data:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return FaCheckCircle;
      case 'warning': return FaExclamationTriangle;
      case 'error': return FaTimesCircle;
      default: return FaClock;
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const exportLogs = async () => {
    try {
      const response = await dataService.getAll('api_logs?format=csv');
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `api_logs_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Logs exportados exitosamente');
    } catch (error) {
      console.error('Error exporting logs:', error);
      toast.error('Error al exportar logs');
    }
  };

  const OverviewTab = () => {
    const healthyCount = Object.values(apiStatus).filter(s => s.status === 'healthy').length;
    const warningCount = Object.values(apiStatus).filter(s => s.status === 'warning').length;
    const errorCount = Object.values(apiStatus).filter(s => s.status === 'error').length;
    const totalAPIs = apiEndpoints.length;

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">APIs Saludables</p>
                <p className="text-3xl font-bold text-green-600">{healthyCount}</p>
              </div>
              <FaCheckCircle className="text-green-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Con Advertencias</p>
                <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
              </div>
              <FaExclamationTriangle className="text-yellow-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Con Errores</p>
                <p className="text-3xl font-bold text-red-600">{errorCount}</p>
              </div>
              <FaTimesCircle className="text-red-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime Promedio</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round((healthyCount / totalAPIs) * 100)}%
                </p>
              </div>
              <FaServer className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* API Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiEndpoints.map(endpoint => {
            const status = apiStatus[endpoint.id];
            const StatusIcon = getStatusIcon(status?.status);
            
            return (
              <div key={endpoint.id} className={`border-2 rounded-xl p-6 ${getStatusBg(status?.status)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`text-xl ${getStatusColor(status?.status)}`} />
                    <div>
                      <h3 className="font-bold text-gray-900">{endpoint.name}</h3>
                      <p className="text-sm text-gray-600">{endpoint.type}</p>
                    </div>
                  </div>
                  {endpoint.critical && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      Crítico
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{endpoint.description}</p>
                
                {status && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estado:</span>
                      <span className={`font-medium ${getStatusColor(status.status)}`}>
                        {status.message}
                      </span>
                    </div>
                    {status.responseTime && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tiempo respuesta:</span>
                        <span className="font-medium">{status.responseTime}ms</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Última verificación:</span>
                      <span className="font-medium">
                        {new Date(status.lastChecked).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Recent Alerts */}
        {alerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Alertas Recientes</h3>
            <div className="space-y-3">
              {alerts.slice(0, 5).map(alert => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'bg-red-50 border-red-400' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const LogsTab = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold">Logs de API</h3>
        <button
          onClick={exportLogs}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaDownload /> Exportar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">API</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiempo Respuesta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detalles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map(log => {
              const endpoint = apiEndpoints.find(e => e.id === log.apiId);
              const StatusIcon = getStatusIcon(log.status);
              
              return (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {endpoint?.name || log.apiId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`text-sm ${getStatusColor(log.status)}`} />
                      <span className={`text-sm ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.responseTime ? `${log.responseTime}ms` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.details ? 'Ver detalles' : 'Sin detalles'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Monitoreo de APIs</h1>
          <p className="text-gray-600">Supervisión en tiempo real del estado de las APIs</p>
        </div>
        <button
          onClick={checkAllAPIs}
          disabled={refreshing}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <FaRefresh className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Verificando...' : 'Verificar Ahora'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Resumen', icon: FaEye },
            { id: 'logs', name: 'Logs', icon: FaServer },
            { id: 'alerts', name: 'Alertas', icon: FaBell },
            { id: 'metrics', name: 'Métricas', icon: FaChartLine }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'logs' && <LogsTab />}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Sistema de Alertas</h3>
          <p className="text-gray-600">Configuración de alertas en desarrollo...</p>
        </div>
      )}
      {activeTab === 'metrics' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Métricas de Rendimiento</h3>
          <p className="text-gray-600">Dashboard de métricas en desarrollo...</p>
        </div>
      )}
    </div>
  );
};

export default APIMonitoring;
