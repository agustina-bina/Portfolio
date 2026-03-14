// ========================================
// Charts Module - Generación de gráficos con Chart.js
// ========================================

const ChartsModule = (function() {
  // Paleta de colores del dashboard
  const colors = {
    primary: '#dba1a2',
    secondary: '#c2c6b9',
    accent: '#efd8d6',
    dark: '#422b23',
    light: '#f7f3ed',
    gradient1: 'rgba(219, 161, 162, 0.8)',
    gradient2: 'rgba(219, 161, 162, 0.1)',
    grid: 'rgba(66, 43, 35, 0.08)'
  };

  let charts = {};

  // Configuración base para todos los gráficos
  const baseConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: colors.dark,
        titleColor: colors.light,
        bodyColor: colors.light,
        borderColor: colors.primary,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          size: 13,
          weight: '600'
        },
        bodyFont: {
          size: 12
        }
      }
    }
  };

  // Crear gráfico de líneas
  function createLineChart(canvasId, data, label = 'Datos') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    if (charts[canvasId]) {
      charts[canvasId].destroy();
    }

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, colors.gradient1);
    gradient.addColorStop(1, colors.gradient2);

    charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: label,
          data: data.data,
          borderColor: colors.primary,
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors.primary,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        ...baseConfig,
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(66, 43, 35, 0.5)',
              font: {
                size: 12
              }
            }
          },
          y: {
            grid: {
              color: colors.grid,
              drawBorder: false
            },
            ticks: {
              color: 'rgba(66, 43, 35, 0.5)',
              font: {
                size: 12
              },
              callback: function(value) {
                return MetricsModule.formatNumber(value);
              }
            }
          }
        }
      }
    });

    return charts[canvasId];
  }

  // Crear gráfico de líneas con dos datasets
  function createDualLineChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    if (charts[canvasId]) {
      charts[canvasId].destroy();
    }

    charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Clics',
            data: data.clicks,
            borderColor: colors.primary,
            backgroundColor: 'transparent',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: colors.primary,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Conversiones',
            data: data.conversions,
            borderColor: colors.secondary,
            backgroundColor: 'transparent',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: colors.secondary,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        ...baseConfig,
        plugins: {
          ...baseConfig.plugins,
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: colors.dark,
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(66, 43, 35, 0.5)',
              font: {
                size: 12
              }
            }
          },
          y: {
            grid: {
              color: colors.grid,
              drawBorder: false
            },
            ticks: {
              color: 'rgba(66, 43, 35, 0.5)',
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    return charts[canvasId];
  }

  // Crear gráfico circular
  function createDoughnutChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    if (charts[canvasId]) {
      charts[canvasId].destroy();
    }

    const chartColors = [
      colors.primary,
      colors.secondary,
      colors.accent,
      colors.dark
    ];

    charts[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          backgroundColor: chartColors,
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 8
        }]
      },
      options: {
        ...baseConfig,
        cutout: '65%',
        plugins: {
          ...baseConfig.plugins,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: colors.dark,
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    return charts[canvasId];
  }

  // Crear gráfico de barras
  function createBarChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    if (charts[canvasId]) {
      charts[canvasId].destroy();
    }

    charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Clics',
            data: data.clicks,
            backgroundColor: colors.primary,
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Conversiones',
            data: data.conversions,
            backgroundColor: colors.secondary,
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        ...baseConfig,
        plugins: {
          ...baseConfig.plugins,
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: colors.dark,
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(66, 43, 35, 0.5)',
              font: {
                size: 11
              }
            }
          },
          y: {
            grid: {
              color: colors.grid,
              drawBorder: false
            },
            ticks: {
              color: 'rgba(66, 43, 35, 0.5)',
              font: {
                size: 12
              },
              callback: function(value) {
                return MetricsModule.formatNumber(value);
              }
            }
          }
        }
      }
    });

    return charts[canvasId];
  }

  // Actualizar gráfico de líneas
  function updateLineChart(canvasId, data) {
    if (!charts[canvasId]) return;

    charts[canvasId].data.labels = data.labels;
    charts[canvasId].data.datasets[0].data = data.data;
    charts[canvasId].update('active');
  }

  // Destruir un gráfico específico
  function destroyChart(canvasId) {
    if (charts[canvasId]) {
      charts[canvasId].destroy();
      delete charts[canvasId];
    }
  }

  // Destruir todos los gráficos
  function destroyAll() {
    Object.keys(charts).forEach(key => {
      if (charts[key]) {
        charts[key].destroy();
        delete charts[key];
      }
    });
  }

  // API pública
  return {
    createLineChart,
    createDualLineChart,
    createDoughnutChart,
    createBarChart,
    updateLineChart,
    destroyChart,
    destroyAll,
    colors
  };
})();

// Exportar para uso en otros módulos
window.ChartsModule = ChartsModule;
