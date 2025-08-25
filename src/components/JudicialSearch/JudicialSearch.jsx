import React, { useState } from 'react';
import { FaSearch, FaFileAlt, FaGavel, FaUser, FaMapMarkerAlt, FaClock, FaEye } from 'react-icons/fa';

const JudicialSearch = () => {
  const [searchType, setSearchType] = useState('numero');
  const [searchValue, setSearchValue] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    { type: 'Número de Causa', value: '17294-2023-00123', date: '2024-01-20' },
    { type: 'Actor', value: 'Juan Pérez vs María González', date: '2024-01-18' },
    { type: 'Demandado', value: 'Comercial ABC S.A.', date: '2024-01-15' },
    { type: 'Judicatura', value: 'Tribunal Civil Imbabura', date: '2024-01-12' }
  ]);

  const provinces = [
    'Imbabura', 'Pichincha', 'Guayas', 'Azuay', 'Manabí', 'Loja', 
    'Tungurahua', 'El Oro', 'Chimborazo', 'Esmeraldas', 'Cotopaxi',
    'Los Ríos', 'Cañar', 'Bolívar', 'Carchi', 'Pastaza', 'Morona Santiago',
    'Napo', 'Zamora Chinchipe', 'Sucumbíos', 'Orellana', 'Santa Elena',
    'Santo Domingo', 'Galápagos'
  ];

  const searchTypes = [
    { value: 'numero', label: 'Número de Causa', icon: <FaFileAlt /> },
    { value: 'actor', label: 'Actor', icon: <FaUser /> },
    { value: 'demandado', label: 'Demandado', icon: <FaUser /> },
    { value: 'judicatura', label: 'Judicatura', icon: <FaGavel /> }
  ];

  const mockResults = [
    {
      id: 1,
      numero: '17294-2023-00123',
      actor: 'Juan Carlos Pérez Morales',
      demandado: 'María Elena González Vásquez',
      judicatura: 'Unidad Judicial Civil Imbabura',
      materia: 'Civil - Cobro de Dinero',
      estado: 'En Trámite',
      fechaIngreso: '2023-03-15',
      ultimaActuacion: '2024-01-15',
      valorCuantia: '$15,500.00'
    },
    {
      id: 2,
      numero: '17295-2023-00124',
      actor: 'Comercial ABC S.A.',
      demandado: 'Roberto Sandoval Torres',
      judicatura: 'Unidad Judicial Comercial Imbabura',
      materia: 'Comercial - Incumplimiento de Contrato',
      estado: 'Sentencia Ejecutoriada',
      fechaIngreso: '2023-04-20',
      ultimaActuacion: '2024-01-10',
      valorCuantia: '$45,200.00'
    }
  ];

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
      
      // Add to recent searches
      const newSearch = {
        type: searchTypes.find(t => t.value === searchType)?.label,
        value: searchValue,
        date: new Date().toISOString().split('T')[0]
      };
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 3)]);
    }, 2000);
  };

  const clearSearch = () => {
    setSearchValue('');
    setSearchResults([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Consulta de Procesos Judiciales
        </h1>
        <p className="text-lg text-gray-600">
          Busque información actualizada sobre procesos judiciales en Ecuador. 
          Acceda a datos de causas por número, actor, demandado o judicatura.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Search Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Búsqueda
            </label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {searchTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Province */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provincia
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Provincia</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* Search Value */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor de Búsqueda
            </label>
            <div className="flex">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Ingrese ${searchTypes.find(t => t.value === searchType)?.label.toLowerCase()}`}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200 flex items-center"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    Buscar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={clearSearch}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Limpiar
          </button>
          
          {/* Search Tips */}
          <div className="text-sm text-gray-500">
            <strong>Consejos:</strong> Use el formato completo para números de causa (ej. 17294-2023-00123)
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Resultados de Búsqueda ({searchResults.length})
          </h2>
          
          <div className="space-y-6">
            {searchResults.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Causa No. {result.numero}
                    </h3>
                    <p className="text-gray-600">{result.materia}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.estado === 'En Trámite' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {result.estado}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Actor:</span>
                    <p className="text-gray-600">{result.actor}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Demandado:</span>
                    <p className="text-gray-600">{result.demandado}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Judicatura:</span>
                    <p className="text-gray-600">{result.judicatura}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Cuantía:</span>
                    <p className="text-gray-600 font-semibold">{result.valorCuantia}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fecha Ingreso:</span>
                    <p className="text-gray-600">{result.fechaIngreso}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Última Actuación:</span>
                    <p className="text-gray-600">{result.ultimaActuacion}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                    <FaEye className="mr-2" />
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Búsquedas Recientes
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentSearches.map((search, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-2">
                <FaClock className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">{search.date}</span>
              </div>
              <h4 className="font-medium text-gray-900">{search.type}</h4>
              <p className="text-gray-600 text-sm truncate">{search.value}</p>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Consejos de búsqueda</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Para buscar por número de causa, use el formato completo (ej. 17294-2023-00123)</li>
            <li>• Al buscar por nombre, incluya al menos un apellido completo</li>
            <li>• Seleccione la provincia correcta para obtener resultados más precisos</li>
            <li>• Use palabras clave específicas para mejores resultados</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JudicialSearch;
