// ========================================
// Metrics Module - Carga y manipulación de datos
// ========================================

const MetricsModule = (function() {
  let metricsData = null;

  // Cargar datos desde JSON
  async function loadMetrics() {
    try {
      const response = await fetch('./data/metrics.json');
      if (!response.ok) {
        throw new Error('Error al cargar métricas');
      }
      metricsData = await response.json();
      return metricsData;
    } catch (error) {
      console.error('Error cargando métricas:', error);
      return null;
    }
  }

  // Obtener datos cargados
  function getData() {
    return metricsData;
  }

  // Formatear números
  function formatNumber(num) {
    if (num === null || num === undefined) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('es-ES');
  }

  // Formatear porcentaje
  function formatPercentage(num) {
    if (num === null || num === undefined) return '0%';
    const sign = num >= 0 ? '+' : '';
    return sign + num.toFixed(1) + '%';
  }

  // Formatear moneda
  function formatCurrency(num) {
    if (num === null || num === undefined) return '$0';
    return '$' + num.toLocaleString('es-ES');
  }

  // Formatear fecha
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // Obtener clase CSS para cambio positivo/negativo
  function getChangeClass(value) {
    return value >= 0 ? 'positive' : 'negative';
  }

  // Obtener icono de flecha para cambio
  function getChangeIcon(value) {
    if (value >= 0) {
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
    </svg>`;
  }

  // Filtrar campañas por estado
  function filterCampaignsByStatus(campaigns, status) {
    if (!campaigns) return [];
    if (status === 'all') return campaigns;
    return campaigns.filter(c => c.status === status);
  }

  // Buscar campañas por nombre
  function searchCampaigns(campaigns, query) {
    if (!campaigns) return [];
    if (!query) return campaigns;
    const lowerQuery = query.toLowerCase();
    return campaigns.filter(c => 
      c.name.toLowerCase().includes(lowerQuery)
    );
  }

  // Guardar configuración
  function saveSettings(settings) {
    if (metricsData) {
      metricsData.settings = { ...metricsData.settings, ...settings };
    }
  }

  // API pública
  return {
    loadMetrics,
    getData,
    formatNumber,
    formatPercentage,
    formatCurrency,
    formatDate,
    getChangeClass,
    getChangeIcon,
    filterCampaignsByStatus,
    searchCampaigns,
    saveSettings
  };
})();

// Exportar para uso en otros módulos
window.MetricsModule = MetricsModule;
