import React, { useState } from 'react';
import { 
  FaDollarSign, FaChartLine, FaFileInvoiceDollar, FaCreditCard, 
  FaWallet, FaReceipt, FaDownload, FaCalendarAlt, FaFilter,
  FaTrendingUp, FaTrendingDown, FaEye, FaPlus, FaEdit,
  FaPiggyBank, FaExchangeAlt, FaPercentage, FaArrowUp, FaArrowDown
} from 'react-icons/fa';

const FinanceManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [showModal, setShowModal] = useState(false);

  const [finances, setFinances] = useState({
    totalRevenue: 89750,
    totalExpenses: 34200,
    netProfit: 55550,
    pendingPayments: 12400,
    monthlyGrowth: 12.5,
    transactions: [
      {
        id: 1,
        type: 'income',
        description: 'Consulta Legal - María García',
        amount: 150,
        date: '2024-01-15',
        category: 'consultations',
        status: 'completed'
      },
      {
        id: 2,
        type: 'income',
        description: 'Curso Derecho Laboral - Carlos López',
        amount: 299,
        date: '2024-01-14',
        category: 'courses',
        status: 'completed'
      },
      {
        id: 3,
        type: 'expense',
        description: 'Licencia Software Legal',
        amount: 199,
        date: '2024-01-13',
        category: 'software',
        status: 'paid'
      },
      {
        id: 4,
        type: 'income',
        description: 'Ebook Derecho Civil - Ana Silva',
        amount: 49,
        date: '2024-01-12',
        category: 'products',
        status: 'completed'
      }
    ],
    invoices: [
      {
        id: 'INV-001',
        client: 'María García',
        amount: 150,
        date: '2024-01-15',
        dueDate: '2024-02-15',
        status: 'paid'
      },
      {
        id: 'INV-002',
        client: 'Carlos López',
        amount: 500,
        date: '2024-01-10',
        dueDate: '2024-02-10',
        status: 'pending'
      }
    ]
  });

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: <FaChartLine /> },
    { id: 'transactions', name: 'Transacciones', icon: <FaExchangeAlt /> },
    { id: 'invoices', name: 'Facturas', icon: <FaFileInvoiceDollar /> },
    { id: 'reports', name: 'Reportes', icon: <FaReceipt /> }
  ];

  const GlassCard = ({ children, className = '', hover = false }) => (
    <div className={`
      backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl shadow-xl
      ${hover ? 'hover:bg-white/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Ingresos Totales</p>
              <p className="text-3xl font-bold text-green-600">${finances.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <FaArrowUp className="text-green-500 text-sm" />
                <span className="text-sm text-green-600">+{finances.monthlyGrowth}%</span>
              </div>
            </div>
            <FaDollarSign className="text-4xl text-green-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Gastos Totales</p>
              <p className="text-3xl font-bold text-red-600">${finances.totalExpenses.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <FaArrowDown className="text-red-500 text-sm" />
                <span className="text-sm text-red-600">-5.2%</span>
              </div>
            </div>
            <FaCreditCard className="text-4xl text-red-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Ganancia Neta</p>
              <p className="text-3xl font-bold text-blue-600">${finances.netProfit.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <FaPercentage className="text-blue-500 text-sm" />
                <span className="text-sm text-blue-600">62% Margen</span>
              </div>
            </div>
            <FaPiggyBank className="text-4xl text-blue-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pagos Pendientes</p>
              <p className="text-3xl font-bold text-orange-600">${finances.pendingPayments.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <FaWallet className="text-orange-500 text-sm" />
                <span className="text-sm text-orange-600">3 facturas</span>
              </div>
            </div>
            <FaFileInvoiceDollar className="text-4xl text-orange-600 opacity-80" />
          </div>
        </GlassCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FaChartLine className="text-blue-600" />
            Ingresos por Mes
          </h3>
          <div className="h-64 bg-gradient-to-r from-blue-100/30 to-green-100/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaTrendingUp className="text-4xl text-blue-600 mb-2 mx-auto" />
              <p className="text-gray-600">Gráfico de Ingresos</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FaReceipt className="text-purple-600" />
            Ingresos por Categoría
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Consultas', amount: 35400, percentage: 60, color: 'blue' },
              { name: 'Cursos', amount: 18900, percentage: 32, color: 'green' },
              { name: 'Productos', amount: 4700, percentage: 8, color: 'purple' }
            ].map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{category.name}</span>
                  <span className="text-gray-800 font-semibold">${category.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Transactions */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Transacciones Recientes</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Ver todas
          </button>
        </div>
        <div className="space-y-3">
          {finances.transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const TransactionsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Transacciones</h2>
        <div className="flex gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Año</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FaPlus /> Nueva Transacción
          </button>
        </div>
      </div>

      <GlassCard className="p-6">
        <div className="space-y-4">
          {finances.transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date} • {transaction.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                    <FaEye />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const InvoicesTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Facturas</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <FaPlus /> Nueva Factura
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finances.invoices.map((invoice) => (
          <GlassCard key={invoice.id} hover className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">{invoice.id}</h3>
                <p className="text-sm text-gray-600">{invoice.client}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Monto:</span>
                <span className="font-semibold text-gray-800">${invoice.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="text-gray-800">{invoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vence:</span>
                <span className="text-gray-800">{invoice.dueDate}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <FaEye /> Ver
              </button>
              <button className="py-2 px-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <FaDownload />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Reportes Financieros</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <FaDownload /> Exportar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Reporte Mensual', description: 'Ingresos y gastos del mes', icon: <FaCalendarAlt />, color: 'blue' },
          { name: 'Estado de Resultados', description: 'P&L del período', icon: <FaChartLine />, color: 'green' },
          { name: 'Flujo de Caja', description: 'Movimientos de efectivo', icon: <FaWallet />, color: 'purple' },
          { name: 'Facturas Pendientes', description: 'Por cobrar y pagar', icon: <FaFileInvoiceDollar />, color: 'orange' },
          { name: 'Análisis de Clientes', description: 'Top clientes por ingresos', icon: <FaTrendingUp />, color: 'indigo' },
          { name: 'Gastos por Categoría', description: 'Desglose de gastos', icon: <FaReceipt />, color: 'red' }
        ].map((report, index) => (
          <GlassCard key={index} hover className="p-6">
            <div className={`w-12 h-12 bg-${report.color}-100 text-${report.color}-600 rounded-lg flex items-center justify-center mb-4`}>
              {report.icon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{report.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <button className={`w-full py-2 bg-${report.color}-600 text-white rounded-lg hover:bg-${report.color}-700 transition-colors`}>
              Generar Reporte
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'transactions': return <TransactionsTab />;
      case 'invoices': return <InvoicesTab />;
      case 'reports': return <ReportsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Gestión Financiera
        </h2>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Año</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <GlassCard className="p-6">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 shadow-lg transform scale-105'
                  : 'bg-white/50 text-gray-600 hover:bg-white/70'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Content */}
      {renderTabContent()}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FinanceManager;
