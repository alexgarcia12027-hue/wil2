import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import PageBuilder from './PageBuilder';

const SiteBuilderDashboard = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showPageBuilder, setShowPageBuilder] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockPages = [
      {
        id: '1',
        title: 'Página de Inicio',
        slug: 'inicio',
        description: 'Página principal del sitio web',
        isPublished: true,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        components: []
      },
      {
        id: '2',
        title: 'Servicios Legales',
        slug: 'servicios',
        description: 'Descripción de nuestros servicios legales',
        isPublished: true,
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18',
        components: []
      },
      {
        id: '3',
        title: 'Sobre Nosotros',
        slug: 'sobre-nosotros',
        description: 'Información sobre nuestro bufete',
        isPublished: false,
        createdAt: '2024-01-12',
        updatedAt: '2024-01-19',
        components: []
      }
    ];

    const mockTemplates = [
      {
        id: 't1',
        name: 'Landing Page Profesional',
        description: 'Página de aterrizaje para servicios legales',
        preview: '/templates/professional-landing.jpg',
        components: [
          { type: 'hero', props: { title: 'Servicios Legales Profesionales', subtitle: 'Expertos en derecho con más de 10 años de experiencia' } },
          { type: 'text', props: { content: 'Ofrecemos servicios legales integrales...' } },
          { type: 'form', props: { title: 'Contacto', fields: ['name', 'email', 'phone', 'message'] } }
        ]
      },
      {
        id: 't2',
        name: 'Página de Servicios',
        description: 'Muestra todos los servicios disponibles',
        preview: '/templates/services-page.jpg',
        components: [
          { type: 'hero', props: { title: 'Nuestros Servicios', subtitle: 'Soluciones legales completas' } },
          { type: 'gallery', props: { images: [], columns: 2 } },
          { type: 'text', props: { content: 'Descripción detallada de servicios...' } }
        ]
      },
      {
        id: 't3',
        name: 'Página de Contacto',
        description: 'Formulario de contacto y información',
        preview: '/templates/contact-page.jpg',
        components: [
          { type: 'hero', props: { title: 'Contáctanos', subtitle: 'Estamos aquí para ayudarte' } },
          { type: 'form', props: { title: 'Formulario de Contacto', fields: ['name', 'email', 'phone', 'subject', 'message'] } },
          { type: 'text', props: { content: 'Información de contacto adicional...' } }
        ]
      }
    ];

    setPages(mockPages);
    setTemplates(mockTemplates);
    setLoading(false);
  }, []);

  const createNewPage = () => {
    setSelectedPage(null);
    setShowPageBuilder(true);
  };

  const editPage = (page) => {
    setSelectedPage(page);
    setShowPageBuilder(true);
  };

  const duplicatePage = (page) => {
    const newPage = {
      ...page,
      id: `${Date.now()}`,
      title: `${page.title} (Copia)`,
      slug: `${page.slug}-copia`,
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPages(prev => [...prev, newPage]);
    toast.success('Página duplicada correctamente');
  };

  const deletePage = (pageId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta página?')) {
      setPages(prev => prev.filter(p => p.id !== pageId));
      toast.success('Página eliminada correctamente');
    }
  };

  const togglePublishPage = (pageId) => {
    setPages(prev => 
      prev.map(p => 
        p.id === pageId 
          ? { ...p, isPublished: !p.isPublished, updatedAt: new Date().toISOString() }
          : p
      )
    );
    toast.success('Estado de publicación actualizado');
  };

  const createPageFromTemplate = (template) => {
    const newPage = {
      id: `${Date.now()}`,
      title: template.name,
      slug: template.name.toLowerCase().replace(/\s+/g, '-'),
      description: template.description,
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      components: template.components.map((comp, index) => ({
        ...comp,
        id: `${comp.type}-${Date.now()}-${index}`
      }))
    };
    
    setPages(prev => [...prev, newPage]);
    setSelectedPage(newPage);
    setShowPageBuilder(true);
    toast.success('Página creada desde plantilla');
  };

  if (showPageBuilder) {
    return (
      <div className="h-screen">
        <PageBuilder 
          initialPage={selectedPage}
          onBack={() => setShowPageBuilder(false)}
          onSave={(pageData) => {
            if (selectedPage) {
              // Update existing page
              setPages(prev => 
                prev.map(p => 
                  p.id === selectedPage.id 
                    ? { ...p, ...pageData, updatedAt: new Date().toISOString() }
                    : p
                )
              );
            } else {
              // Create new page
              const newPage = {
                ...pageData,
                id: `${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              setPages(prev => [...prev, newPage]);
            }
            setShowPageBuilder(false);
            toast.success('Página guardada correctamente');
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="site-builder-dashboard p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Constructor de Sitio</h1>
          <p className="text-gray-600 mt-2">Crea y gestiona las páginas de tu sitio web</p>
        </div>
        <button
          onClick={createNewPage}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Nueva Página</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Páginas</p>
              <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Publicadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {pages.filter(p => p.isPublished).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Borradores</p>
              <p className="text-2xl font-bold text-gray-900">
                {pages.filter(p => !p.isPublished).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">🎨</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Plantillas</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Plantillas Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <span className="text-6xl opacity-50">🎨</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button
                  onClick={() => createPageFromTemplate(template)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Usar Plantilla
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pages List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Páginas Existentes</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Página
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Actualización
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{page.title}</div>
                        <div className="text-sm text-gray-500">/{page.slug}</div>
                        {page.description && (
                          <div className="text-sm text-gray-400 mt-1">{page.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        page.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.isPublished ? 'Publicada' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(page.updatedAt).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => editPage(page)}
                          className="text-primary-600 hover:text-primary-900 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => duplicatePage(page)}
                          className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Duplicar"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => togglePublishPage(page.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            page.isPublished
                              ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50'
                              : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                          }`}
                          title={page.isPublished ? 'Despublicar' : 'Publicar'}
                        >
                          {page.isPublished ? '👁️‍🗨️' : '🚀'}
                        </button>
                        <button
                          onClick={() => deletePage(page.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {pages.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📄</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay páginas creadas</h3>
              <p className="text-gray-500 mb-6">Comienza creando tu primera página o usando una plantilla</p>
              <button
                onClick={createNewPage}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Crear Primera Página
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteBuilderDashboard;
