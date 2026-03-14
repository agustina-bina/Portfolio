// ========================================
// Dashboard Module - Lógica principal del panel
// ========================================

const DashboardModule = (function() {
  let currentSection = 'campaigns';
  let currentFilter = 'all';
  let currentSearch = '';
  let currentNetwork = 'all';
  let currentChannel = 'all';
  let currentDateRange = 'last_30_days';

  const sectionTitles = {
    campaigns: 'Campañas',
    social: 'Redes Sociales',
    conversions: 'Conversiones',
    reports: 'Reportes',
    settings: 'Ajustes'
  };

  const statusLabels = {
    active: 'Activa',
    completed: 'Completada',
    paused: 'Pausada',
    scheduled: 'Programada'
  };

  // ========================================
  // Inicialización
  // ========================================

  async function init() {
    const data = await MetricsModule.loadMetrics();
    
    if (!data) {
      showError('No se pudieron cargar los datos del dashboard');
      return;
    }

    setupNavigation();
    updateCurrentDate();
    renderSection(currentSection);
  }

  // ========================================
  // Navegación
  // ========================================

  function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.dataset.section;
        if (section && section !== currentSection) {
          navItems.forEach(n => n.classList.remove('active'));
          this.classList.add('active');
          currentSection = section;
          ChartsModule.destroyAll();
          renderSection(section);
        }
      });
    });

    // Modal close
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
      closeModal.addEventListener('click', closeModalHandler);
    }

    const modalOverlay = document.getElementById('campaignModal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
          closeModalHandler();
        }
      });
    }
  }

  function renderSection(section) {
    document.getElementById('sectionTitle').textContent = sectionTitles[section];
    const container = document.getElementById('contentContainer');
    
    switch(section) {
      case 'campaigns':
        renderCampaignsSection(container);
        break;
      case 'social':
        renderSocialSection(container);
        break;
      case 'conversions':
        renderConversionsSection(container);
        break;
      case 'reports':
        renderReportsSection(container);
        break;
      case 'settings':
        renderSettingsSection(container);
        break;
    }
  }

  // ========================================
  // 1. CAMPAÑAS
  // ========================================

  function renderCampaignsSection(container) {
    const data = MetricsModule.getData();
    const campaigns = data.campaigns;

    container.innerHTML = `
      <!-- Métricas -->
      <section class="metrics-grid">
        ${renderCampaignMetrics(campaigns.summary)}
      </section>

      <!-- Gráfico de rendimiento -->
      <section class="charts-grid">
        <div class="chart-card" style="grid-column: span 2;">
          <div class="chart-header">
            <h3 class="chart-title">Rendimiento de Campañas</h3>
          </div>
          <div class="chart-container">
            <canvas id="campaignPerformanceChart"></canvas>
          </div>
        </div>
      </section>

      <!-- Tabla de campañas -->
      <section class="table-card">
        <div class="table-header">
          <h3 class="table-title">Campañas</h3>
          <div class="table-actions">
            <div class="search-box">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input type="text" id="campaignSearch" placeholder="Buscar campaña...">
            </div>
            <button class="filter-btn" id="filterBtn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
              <span>Todas</span>
            </button>
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Campaña</th>
              <th>Presupuesto</th>
              <th>Clics</th>
              <th>Conversiones</th>
              <th>CTR</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="campaignsTableBody">
            ${renderCampaignsTable(campaigns.list)}
          </tbody>
        </table>
      </section>
    `;

    // Inicializar gráfico
    ChartsModule.createDualLineChart('campaignPerformanceChart', campaigns.performance);

    // Event listeners
    setupCampaignEvents(campaigns.list);
  }

  function renderCampaignMetrics(summary) {
    const metrics = [
      { icon: 'eye', label: 'Impresiones', value: summary.impressions, change: summary.impressions_change, type: 'primary' },
      { icon: 'cursor', label: 'Clics', value: summary.clicks, change: summary.clicks_change, type: 'secondary' },
      { icon: 'percent', label: 'CTR', value: summary.ctr + '%', change: summary.ctr_change, type: 'primary', isRaw: true },
      { icon: 'check', label: 'Conversiones', value: summary.conversions, change: summary.conversions_change, type: 'secondary' },
      { icon: 'dollar', label: 'Gasto Total', value: MetricsModule.formatCurrency(summary.total_spend), change: summary.spend_change, type: 'primary', isRaw: true }
    ];

    return metrics.map(m => `
      <div class="metric-card">
        <div class="metric-header">
          <div class="metric-icon ${m.type}">${getMetricIcon(m.icon)}</div>
          <div class="metric-change ${MetricsModule.getChangeClass(m.change)}">
            ${MetricsModule.getChangeIcon(m.change)}
            ${MetricsModule.formatPercentage(m.change)}
          </div>
        </div>
        <div class="metric-value">${m.isRaw ? m.value : MetricsModule.formatNumber(m.value)}</div>
        <div class="metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  function renderCampaignsTable(campaigns) {
    let filtered = MetricsModule.filterCampaignsByStatus(campaigns, currentFilter);
    filtered = MetricsModule.searchCampaigns(filtered, currentSearch);

    return filtered.map(c => `
      <tr>
        <td class="campaign-name">${c.name}</td>
        <td>${MetricsModule.formatCurrency(c.budget)}</td>
        <td>${MetricsModule.formatNumber(c.clicks)}</td>
        <td>${MetricsModule.formatNumber(c.conversions)}</td>
        <td>${c.ctr}%</td>
        <td><span class="status-badge ${c.status}"><span class="status-dot"></span>${statusLabels[c.status]}</span></td>
        <td class="action-buttons">
          <button class="btn-secondary btn-sm" data-action="details" data-id="${c.id}">Ver detalles</button>
          <button class="btn-secondary btn-sm btn-danger" data-action="pause" data-id="${c.id}">${c.status === 'paused' ? 'Reanudar' : 'Pausar'}</button>
        </td>
      </tr>
    `).join('');
  }

  function setupCampaignEvents(campaigns) {
    // Búsqueda
    const searchInput = document.getElementById('campaignSearch');
    if (searchInput) {
      searchInput.addEventListener('input', debounce(function(e) {
        currentSearch = e.target.value;
        document.getElementById('campaignsTableBody').innerHTML = renderCampaignsTable(campaigns);
        setupTableActions(campaigns);
      }, 300));
    }

    // Filtro
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
      filterBtn.addEventListener('click', function() {
        const statuses = ['all', 'active', 'completed', 'paused', 'scheduled'];
        const labels = { all: 'Todas', active: 'Activas', completed: 'Completadas', paused: 'Pausadas', scheduled: 'Programadas' };
        let idx = statuses.indexOf(currentFilter);
        idx = (idx + 1) % statuses.length;
        currentFilter = statuses[idx];
        this.querySelector('span').textContent = labels[currentFilter];
        document.getElementById('campaignsTableBody').innerHTML = renderCampaignsTable(campaigns);
        setupTableActions(campaigns);
      });
    }

    setupTableActions(campaigns);
  }

  function setupTableActions(campaigns) {
    document.querySelectorAll('[data-action="details"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        const campaign = campaigns.find(c => c.id === id);
        if (campaign) showCampaignModal(campaign);
      });
    });

    document.querySelectorAll('[data-action="pause"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        const campaign = campaigns.find(c => c.id === id);
        if (campaign) {
          campaign.status = campaign.status === 'paused' ? 'active' : 'paused';
          document.getElementById('campaignsTableBody').innerHTML = renderCampaignsTable(campaigns);
          setupTableActions(campaigns);
        }
      });
    });
  }

  function showCampaignModal(campaign) {
    const modal = document.getElementById('campaignModal');
    document.getElementById('modalCampaignName').textContent = campaign.name;
    
    document.getElementById('modalMetrics').innerHTML = `
      <div class="modal-metric">
        <div class="modal-metric-value">${MetricsModule.formatNumber(campaign.clicks)}</div>
        <div class="modal-metric-label">Clics Totales</div>
      </div>
      <div class="modal-metric">
        <div class="modal-metric-value">${MetricsModule.formatNumber(campaign.conversions)}</div>
        <div class="modal-metric-label">Conversiones</div>
      </div>
      <div class="modal-metric">
        <div class="modal-metric-value">${MetricsModule.formatCurrency(campaign.spent)}</div>
        <div class="modal-metric-label">Presupuesto Gastado</div>
      </div>
    `;

    modal.classList.add('active');
    
    setTimeout(() => {
      ChartsModule.createDualLineChart('modalChart', campaign.daily_data);
    }, 100);
  }

  function closeModalHandler() {
    const modal = document.getElementById('campaignModal');
    modal.classList.remove('active');
    ChartsModule.destroyChart('modalChart');
  }

  // ========================================
  // 2. REDES SOCIALES
  // ========================================

  function renderSocialSection(container) {
    const data = MetricsModule.getData();
    const social = data.social_media;
    const networkData = social.networks[currentNetwork];

    container.innerHTML = `
      <!-- Métricas -->
      <section class="metrics-grid four-cols">
        ${renderSocialMetrics(social.summary)}
      </section>

      <!-- Gráficos -->
      <section class="charts-grid equal">
        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">Crecimiento de Seguidores</h3>
            <div class="select-wrapper">
              <select class="custom-select" id="networkSelector">
                <option value="all" ${currentNetwork === 'all' ? 'selected' : ''}>Todas</option>
                <option value="instagram" ${currentNetwork === 'instagram' ? 'selected' : ''}>Instagram</option>
                <option value="tiktok" ${currentNetwork === 'tiktok' ? 'selected' : ''}>TikTok</option>
                <option value="youtube" ${currentNetwork === 'youtube' ? 'selected' : ''}>YouTube</option>
                <option value="facebook" ${currentNetwork === 'facebook' ? 'selected' : ''}>Facebook</option>
              </select>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="socialGrowthChart"></canvas>
          </div>
        </div>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">Distribución por Red</h3>
          </div>
          <div class="chart-container">
            <canvas id="socialDistributionChart"></canvas>
          </div>
        </div>
      </section>
    `;

    // Inicializar gráficos
    ChartsModule.createLineChart('socialGrowthChart', networkData.growth, 'Seguidores');
    ChartsModule.createDoughnutChart('socialDistributionChart', social.distribution);

    // Event listener para selector
    document.getElementById('networkSelector').addEventListener('change', function() {
      currentNetwork = this.value;
      const newData = social.networks[currentNetwork];
      ChartsModule.updateLineChart('socialGrowthChart', newData.growth);
    });
  }

  function renderSocialMetrics(summary) {
    const metrics = [
      { icon: 'users', label: 'Seguidores Totales', value: summary.total_followers, change: summary.followers_change, type: 'primary' },
      { icon: 'trending', label: 'Crecimiento Mensual', value: summary.monthly_growth, change: summary.growth_change, type: 'secondary' },
      { icon: 'heart', label: 'Engagement', value: summary.engagement + '%', change: summary.engagement_change, type: 'primary', isRaw: true },
      { icon: 'eye', label: 'Alcance', value: summary.reach, change: summary.reach_change, type: 'secondary' }
    ];

    return metrics.map(m => `
      <div class="metric-card">
        <div class="metric-header">
          <div class="metric-icon ${m.type}">${getMetricIcon(m.icon)}</div>
          <div class="metric-change ${MetricsModule.getChangeClass(m.change)}">
            ${MetricsModule.getChangeIcon(m.change)}
            ${MetricsModule.formatPercentage(m.change)}
          </div>
        </div>
        <div class="metric-value">${m.isRaw ? m.value : MetricsModule.formatNumber(m.value)}</div>
        <div class="metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  // ========================================
  // 3. CONVERSIONES
  // ========================================

  function renderConversionsSection(container) {
    const data = MetricsModule.getData();
    const conversions = data.conversions;
    const channelData = conversions.by_channel[currentChannel];

    container.innerHTML = `
      <!-- Métricas -->
      <section class="metrics-grid four-cols">
        ${renderConversionMetrics(conversions.summary)}
      </section>

      <!-- Embudo y gráfico -->
      <section class="charts-grid equal">
        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">Embudo de Conversión</h3>
          </div>
          <div class="funnel-container" id="funnelContainer">
            ${renderFunnel(channelData.funnel)}
          </div>
        </div>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">Conversiones por Canal</h3>
            <div class="select-wrapper">
              <select class="custom-select" id="channelSelector">
                <option value="all" ${currentChannel === 'all' ? 'selected' : ''}>Todos</option>
                <option value="google_ads" ${currentChannel === 'google_ads' ? 'selected' : ''}>Google Ads</option>
                <option value="instagram_ads" ${currentChannel === 'instagram_ads' ? 'selected' : ''}>Instagram Ads</option>
                <option value="email_marketing" ${currentChannel === 'email_marketing' ? 'selected' : ''}>Email Marketing</option>
                <option value="organic" ${currentChannel === 'organic' ? 'selected' : ''}>Orgánico</option>
              </select>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="conversionChart"></canvas>
          </div>
        </div>
      </section>

      <!-- Tabla de conversiones -->
      <section class="table-card">
        <div class="table-header">
          <h3 class="table-title">Historial de Conversiones</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Canal</th>
              <th>Conversiones</th>
              <th>Ingresos</th>
            </tr>
          </thead>
          <tbody id="conversionsTableBody">
            ${renderConversionsTable(channelData.table)}
          </tbody>
        </table>
      </section>
    `;

    // Gráfico de barras simulado con datos del canal
    const chartData = {
      labels: ['Google Ads', 'Instagram', 'Email', 'Orgánico'],
      clicks: [125, 98, 72, 47],
      conversions: [52, 41, 30, 19]
    };
    ChartsModule.createBarChart('conversionChart', chartData);

    // Event listener para selector
    document.getElementById('channelSelector').addEventListener('change', function() {
      currentChannel = this.value;
      const newChannelData = conversions.by_channel[currentChannel];
      document.getElementById('funnelContainer').innerHTML = renderFunnel(newChannelData.funnel);
      document.getElementById('conversionsTableBody').innerHTML = renderConversionsTable(newChannelData.table);
    });
  }

  function renderConversionMetrics(summary) {
    const metrics = [
      { icon: 'cart', label: 'Ventas Generadas', value: summary.sales, change: summary.sales_change, type: 'primary' },
      { icon: 'percent', label: 'Tasa de Conversión', value: summary.conversion_rate + '%', change: summary.rate_change, type: 'secondary', isRaw: true },
      { icon: 'dollar', label: 'Ingresos Totales', value: MetricsModule.formatCurrency(summary.total_revenue), change: summary.revenue_change, type: 'primary', isRaw: true },
      { icon: 'user', label: 'Valor Promedio', value: MetricsModule.formatCurrency(summary.avg_value), change: summary.avg_change, type: 'secondary', isRaw: true }
    ];

    return metrics.map(m => `
      <div class="metric-card">
        <div class="metric-header">
          <div class="metric-icon ${m.type}">${getMetricIcon(m.icon)}</div>
          <div class="metric-change ${MetricsModule.getChangeClass(m.change)}">
            ${MetricsModule.getChangeIcon(m.change)}
            ${MetricsModule.formatPercentage(m.change)}
          </div>
        </div>
        <div class="metric-value">${m.isRaw ? m.value : MetricsModule.formatNumber(m.value)}</div>
        <div class="metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  function renderFunnel(funnel) {
    const stages = [
      { label: 'Visitantes', value: funnel.visitors },
      { label: 'Clics', value: funnel.clicks },
      { label: 'Leads', value: funnel.leads },
      { label: 'Compras', value: funnel.purchases }
    ];

    return stages.map(s => `
      <div class="funnel-stage">
        <div class="funnel-bar">
          <span class="funnel-label">${s.label}</span>
          <span class="funnel-value">${MetricsModule.formatNumber(s.value)}</span>
        </div>
      </div>
    `).join('');
  }

  function renderConversionsTable(table) {
    return table.map(row => `
      <tr>
        <td>${MetricsModule.formatDate(row.date)}</td>
        <td>${row.channel}</td>
        <td>${MetricsModule.formatNumber(row.conversions)}</td>
        <td>${MetricsModule.formatCurrency(row.revenue)}</td>
      </tr>
    `).join('');
  }

  // ========================================
  // 4. REPORTES
  // ========================================

  function renderReportsSection(container) {
    const data = MetricsModule.getData();
    const reports = data.reports;

    container.innerHTML = `
      <!-- Selector de rango -->
      <div class="date-buttons">
        <button class="date-btn ${currentDateRange === 'today' ? 'active' : ''}" data-range="today">Hoy</button>
        <button class="date-btn ${currentDateRange === 'last_7_days' ? 'active' : ''}" data-range="last_7_days">Últimos 7 días</button>
        <button class="date-btn ${currentDateRange === 'last_30_days' ? 'active' : ''}" data-range="last_30_days">Últimos 30 días</button>
        <button class="date-btn ${currentDateRange === 'custom' ? 'active' : ''}" data-range="custom">Personalizado</button>
      </div>

      <!-- Resumen del reporte -->
      <section class="metrics-grid four-cols" id="reportMetrics">
        ${renderReportMetrics(reports[currentDateRange])}
      </section>

      <!-- Acciones de exportación -->
      <section class="table-card">
        <div class="table-header">
          <h3 class="table-title">Exportar Reporte</h3>
        </div>
        <p style="color: rgba(66, 43, 35, 0.6); margin-bottom: 20px;">Descarga el reporte en el formato que prefieras.</p>
        <div class="export-buttons">
          <button class="btn-primary" id="exportPDF">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Descargar PDF
          </button>
          <button class="btn-secondary" id="exportCSV">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Descargar CSV
          </button>
        </div>
      </section>
    `;

    // Event listeners
    document.querySelectorAll('.date-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentDateRange = this.dataset.range;
        document.getElementById('reportMetrics').innerHTML = renderReportMetrics(reports[currentDateRange]);
      });
    });

    document.getElementById('exportPDF').addEventListener('click', () => exportReport('pdf'));
    document.getElementById('exportCSV').addEventListener('click', () => exportReport('csv'));
  }

  function renderReportMetrics(reportData) {
    const metrics = [
      { icon: 'eye', label: 'Impresiones', value: reportData.impressions, type: 'primary' },
      { icon: 'cursor', label: 'Clics', value: reportData.clicks, type: 'secondary' },
      { icon: 'check', label: 'Conversiones', value: reportData.conversions, type: 'primary' },
      { icon: 'dollar', label: 'Ingresos', value: MetricsModule.formatCurrency(reportData.revenue), type: 'secondary', isRaw: true }
    ];

    return metrics.map(m => `
      <div class="metric-card">
        <div class="metric-header">
          <div class="metric-icon ${m.type}">${getMetricIcon(m.icon)}</div>
        </div>
        <div class="metric-value">${m.isRaw ? m.value : MetricsModule.formatNumber(m.value)}</div>
        <div class="metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  function exportReport(format) {
    const data = MetricsModule.getData();
    const reportData = data.reports[currentDateRange];
    
    if (format === 'csv') {
      const csv = `Métrica,Valor\nImpresiones,${reportData.impressions}\nClics,${reportData.clicks}\nConversiones,${reportData.conversions}\nIngresos,${reportData.revenue}`;
      downloadFile(csv, 'reporte.csv', 'text/csv');
    } else {
      const json = JSON.stringify(reportData, null, 2);
      downloadFile(json, 'reporte.json', 'application/json');
    }
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ========================================
  // 5. AJUSTES
  // ========================================

  function renderSettingsSection(container) {
    const data = MetricsModule.getData();
    const settings = data.settings;

    container.innerHTML = `
      <div class="settings-grid">
        <!-- Información de cuenta -->
        <div class="settings-card">
          <h3>Información de la Cuenta</h3>
          <div class="form-group">
            <label for="accountName">Nombre de la cuenta</label>
            <input type="text" id="accountName" value="${settings.account.name}">
          </div>
          <div class="form-group">
            <label for="accountEmail">Email</label>
            <input type="email" id="accountEmail" value="${settings.account.email}">
          </div>
          <div class="form-group">
            <label for="accountCompany">Empresa</label>
            <input type="text" id="accountCompany" value="${settings.account.company}">
          </div>
          <button class="btn-primary" id="saveAccount" style="margin-top: 8px;">Guardar cambios</button>
        </div>

        <!-- Preferencias -->
        <div class="settings-card">
          <h3>Preferencias del Panel</h3>
          <div class="form-group">
            <label for="themeSelect">Tema</label>
            <select id="themeSelect">
              <option value="light" ${settings.preferences.theme === 'light' ? 'selected' : ''}>Claro</option>
              <option value="dark" ${settings.preferences.theme === 'dark' ? 'selected' : ''}>Oscuro</option>
            </select>
          </div>
          <div class="form-group">
            <label for="currencySelect">Moneda</label>
            <select id="currencySelect">
              <option value="USD" ${settings.preferences.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
              <option value="EUR" ${settings.preferences.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
              <option value="MXN" ${settings.preferences.currency === 'MXN' ? 'selected' : ''}>MXN ($)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="languageSelect">Idioma</label>
            <select id="languageSelect">
              <option value="es" ${settings.preferences.language === 'es' ? 'selected' : ''}>Español</option>
              <option value="en" ${settings.preferences.language === 'en' ? 'selected' : ''}>English</option>
            </select>
          </div>
        </div>

        <!-- Notificaciones -->
        <div class="settings-card" style="grid-column: span 2;">
          <h3>Notificaciones</h3>
          <div class="toggle-group">
            <span class="toggle-label">Alertas de campañas</span>
            <label class="toggle-switch">
              <input type="checkbox" id="campaignAlerts" ${settings.notifications.campaign_alerts ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-group">
            <span class="toggle-label">Alertas de conversiones</span>
            <label class="toggle-switch">
              <input type="checkbox" id="conversionAlerts" ${settings.notifications.conversion_alerts ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-group">
            <span class="toggle-label">Reportes automáticos</span>
            <label class="toggle-switch">
              <input type="checkbox" id="autoReports" ${settings.notifications.auto_reports ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    `;

    // Event listener para guardar
    document.getElementById('saveAccount').addEventListener('click', function() {
      const newSettings = {
        account: {
          name: document.getElementById('accountName').value,
          email: document.getElementById('accountEmail').value,
          company: document.getElementById('accountCompany').value
        }
      };
      MetricsModule.saveSettings(newSettings);
      alert('Cambios guardados correctamente');
    });
  }

  // ========================================
  // Utilidades
  // ========================================

  function getMetricIcon(type) {
    const icons = {
      eye: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
      cursor: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>`,
      percent: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>`,
      check: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      dollar: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
      trending: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`,
      heart: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
      cart: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
      user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`
    };
    return icons[type] || icons.eye;
  }

  function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      dateElement.textContent = now.toLocaleDateString('es-ES', options);
    }
  }

  function showError(message) {
    const container = document.getElementById('contentContainer');
    if (container) {
      container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 50vh; flex-direction: column; gap: 16px;">
          <svg style="width: 64px; height: 64px; color: #dba1a2;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <h2 style="color: #422b23; font-size: 1.5rem;">${message}</h2>
          <button onclick="location.reload()" class="btn-primary">Reintentar</button>
        </div>
      `;
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // API pública
  return {
    init
  };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  DashboardModule.init();
});

// Exportar para uso global
window.DashboardModule = DashboardModule;
