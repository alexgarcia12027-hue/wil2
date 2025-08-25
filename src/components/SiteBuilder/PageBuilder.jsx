import React, { useState, useRef, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-hot-toast';

const PageBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [pageSettings, setPageSettings] = useState({
    title: 'Nueva Página',
    description: '',
    slug: '',
    isPublished: false
  });

  // Available component types
  const componentTypes = [
    {
      type: 'hero',
      name: 'Hero Section',
      icon: '🎯',
      defaultProps: {
        title: 'Título Principal',
        subtitle: 'Subtítulo descriptivo',
        backgroundImage: '',
        ctaText: 'Llamada a la Acción',
        ctaLink: '#'
      }
    },
    {
      type: 'text',
      name: 'Texto',
      icon: '📝',
      defaultProps: {
        content: 'Contenido de texto aquí...',
        alignment: 'left',
        fontSize: 'medium'
      }
    },
    {
      type: 'image',
      name: 'Imagen',
      icon: '🖼️',
      defaultProps: {
        src: '/placeholder-image.jpg',
        alt: 'Imagen descriptiva',
        width: '100%',
        alignment: 'center'
      }
    },
    {
      type: 'button',
      name: 'Botón',
      icon: '🔘',
      defaultProps: {
        text: 'Hacer Clic',
        link: '#',
        style: 'primary',
        size: 'medium'
      }
    },
    {
      type: 'form',
      name: 'Formulario',
      icon: '📋',
      defaultProps: {
        title: 'Formulario de Contacto',
        fields: ['name', 'email', 'message'],
        submitText: 'Enviar'
      }
    },
    {
      type: 'gallery',
      name: 'Galería',
      icon: '🖼️',
      defaultProps: {
        images: [],
        columns: 3,
        spacing: 'medium'
      }
    }
  ];

  // Add component to page
  const addComponent = useCallback((componentType) => {
    const newComponent = {
      id: `${componentType.type}-${Date.now()}`,
      type: componentType.type,
      props: { ...componentType.defaultProps }
    };
    
    setComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
    toast.success(`Componente ${componentType.name} agregado`);
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  }, [components]);

  // Update component props
  const updateComponentProps = useCallback((componentId, newProps) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, props: { ...comp.props, ...newProps } }
          : comp
      )
    );
  }, []);

  // Delete component
  const deleteComponent = useCallback((componentId) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId));
    if (selectedComponent === componentId) {
      setSelectedComponent(null);
    }
    toast.success('Componente eliminado');
  }, [selectedComponent]);

  // Save page
  const savePage = useCallback(async () => {
    try {
      const pageData = {
        ...pageSettings,
        components,
        updatedAt: new Date().toISOString()
      };
      
      // Here you would save to your backend
      console.log('Saving page:', pageData);
      toast.success('Página guardada correctamente');
    } catch (error) {
      toast.error('Error al guardar la página');
      console.error('Save error:', error);
    }
  }, [pageSettings, components]);

  // Render component in builder
  const renderComponent = (component) => {
    const { type, props } = component;
    
    switch (type) {
      case 'hero':
        return (
          <div 
            className="hero-component p-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg"
            style={{ backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined }}
          >
            <h1 className="text-4xl font-bold mb-4">{props.title}</h1>
            <p className="text-xl mb-6">{props.subtitle}</p>
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {props.ctaText}
            </button>
          </div>
        );
      
      case 'text':
        return (
          <div 
            className={`text-component p-4 text-${props.alignment} text-${props.fontSize}`}
          >
            <div dangerouslySetInnerHTML={{ __html: props.content }} />
          </div>
        );
      
      case 'image':
        return (
          <div className={`image-component p-4 text-${props.alignment}`}>
            <img 
              src={props.src} 
              alt={props.alt}
              className="max-w-full h-auto rounded-lg"
              style={{ width: props.width }}
            />
          </div>
        );
      
      case 'button':
        return (
          <div className="button-component p-4 text-center">
            <button 
              className={`btn btn-${props.style} btn-${props.size} px-6 py-3 rounded-lg font-semibold transition-colors`}
            >
              {props.text}
            </button>
          </div>
        );
      
      case 'form':
        return (
          <div className="form-component p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{props.title}</h3>
            <form className="space-y-4">
              {props.fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {field}
                  </label>
                  {field === 'message' ? (
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                    />
                  ) : (
                    <input 
                      type={field === 'email' ? 'email' : 'text'}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  )}
                </div>
              ))}
              <button 
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {props.submitText}
              </button>
            </form>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="gallery-component p-4">
            <div className={`grid grid-cols-${props.columns} gap-${props.spacing === 'small' ? '2' : props.spacing === 'large' ? '8' : '4'}`}>
              {props.images.length > 0 ? (
                props.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No hay imágenes en la galería
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return <div className="p-4 bg-gray-100 rounded">Componente desconocido: {type}</div>;
    }
  };

  return (
    <div className="page-builder h-screen flex bg-gray-50">
      {/* Sidebar - Component Library */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Constructor de Páginas</h2>
        </div>
        
        {/* Page Settings */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold mb-3">Configuración de Página</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Título de la página"
              value={pageSettings.title}
              onChange={(e) => setPageSettings(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="URL slug"
              value={pageSettings.slug}
              onChange={(e) => setPageSettings(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <textarea
              placeholder="Descripción"
              value={pageSettings.description}
              onChange={(e) => setPageSettings(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
            />
          </div>
        </div>

        {/* Component Library */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="font-semibold mb-3">Componentes Disponibles</h3>
          <div className="space-y-2">
            {componentTypes.map((componentType) => (
              <button
                key={componentType.type}
                onClick={() => addComponent(componentType)}
                className="w-full p-3 text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-3"
              >
                <span className="text-2xl">{componentType.icon}</span>
                <span className="font-medium">{componentType.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="w-full bg-secondary-600 text-white py-2 rounded-lg font-semibold hover:bg-secondary-700 transition-colors"
          >
            {previewMode ? 'Modo Edición' : 'Vista Previa'}
          </button>
          <button
            onClick={savePage}
            className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Guardar Página
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{pageSettings.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {components.length} componente{components.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setPageSettings(prev => ({ ...prev, isPublished: !prev.isPublished }))}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pageSettings.isPublished 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {pageSettings.isPublished ? 'Publicado' : 'Borrador'}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-6">
          {previewMode ? (
            // Preview Mode
            <div className="max-w-4xl mx-auto space-y-6">
              {components.map((component) => (
                <div key={component.id}>
                  {renderComponent(component)}
                </div>
              ))}
              {components.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-xl mb-2">Página vacía</p>
                  <p>Agrega componentes desde el panel lateral</p>
                </div>
              )}
            </div>
          ) : (
            // Edit Mode
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="page-components">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="max-w-4xl mx-auto space-y-6"
                  >
                    {components.map((component, index) => (
                      <Draggable key={component.id} draggableId={component.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`relative group ${
                              snapshot.isDragging ? 'opacity-50' : ''
                            } ${
                              selectedComponent === component.id ? 'ring-2 ring-primary-500' : ''
                            }`}
                            onClick={() => setSelectedComponent(component.id)}
                          >
                            {/* Drag Handle */}
                            <div
                              {...provided.dragHandleProps}
                              className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move bg-gray-600 text-white p-1 rounded text-xs"
                            >
                              ⋮⋮
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteComponent(component.id);
                              }}
                              className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white p-1 rounded text-xs hover:bg-red-700"
                            >
                              ✕
                            </button>

                            {/* Component */}
                            <div className="border-2 border-transparent hover:border-gray-300 rounded-lg transition-colors">
                              {renderComponent(component)}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {components.length === 0 && (
                      <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-xl mb-2">Página vacía</p>
                        <p>Agrega componentes desde el panel lateral</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedComponent && !previewMode && (
        <div className="w-80 bg-white shadow-lg border-l border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Propiedades del Componente</h3>
          <ComponentPropertiesPanel
            component={components.find(c => c.id === selectedComponent)}
            onUpdate={(newProps) => updateComponentProps(selectedComponent, newProps)}
          />
        </div>
      )}
    </div>
  );
};

// Component Properties Panel
const ComponentPropertiesPanel = ({ component, onUpdate }) => {
  if (!component) return null;

  const { type, props } = component;

  const handleChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  switch (type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={props.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtítulo</label>
            <textarea
              value={props.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Texto del Botón</label>
            <input
              type="text"
              value={props.ctaText}
              onChange={(e) => handleChange('ctaText', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Enlace del Botón</label>
            <input
              type="text"
              value={props.ctaLink}
              onChange={(e) => handleChange('ctaLink', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Contenido</label>
            <textarea
              value={props.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
              rows={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alineación</label>
            <select
              value={props.alignment}
              onChange={(e) => handleChange('alignment', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tamaño de Fuente</label>
            <select
              value={props.fontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            >
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL de la Imagen</label>
            <input
              type="text"
              value={props.src}
              onChange={(e) => handleChange('src', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Texto Alternativo</label>
            <input
              type="text"
              value={props.alt}
              onChange={(e) => handleChange('alt', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ancho</label>
            <input
              type="text"
              value={props.width}
              onChange={(e) => handleChange('width', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
              placeholder="100%, 300px, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alineación</label>
            <select
              value={props.alignment}
              onChange={(e) => handleChange('alignment', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
        </div>
      );

    case 'button':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Texto del Botón</label>
            <input
              type="text"
              value={props.text}
              onChange={(e) => handleChange('text', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Enlace</label>
            <input
              type="text"
              value={props.link}
              onChange={(e) => handleChange('link', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estilo</label>
            <select
              value={props.style}
              onChange={(e) => handleChange('style', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            >
              <option value="primary">Primario</option>
              <option value="secondary">Secundario</option>
              <option value="outline">Contorno</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tamaño</label>
            <select
              value={props.size}
              onChange={(e) => handleChange('size', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            >
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </div>
      );

    default:
      return <div className="text-gray-500">No hay propiedades disponibles para este componente.</div>;
  }
};

export default PageBuilder;
