// compare.js - Lógica de comparación de productos

/**
 * Mapeo de nombres de especificaciones para mostrar
 */
const specLabels = {
  conexion: 'Tipo de conexión',
  sonido: 'Calidad de sonido',
  peso: 'Peso',
  microfono: 'Micrófono',
  rgb: 'Iluminación RGB',
  compatibilidad: 'Compatibilidad',
  frecuencia: 'Respuesta de frecuencia',
  tipo: 'Tipo',
  switches: 'Switches',
  layout: 'Layout',
  sensor: 'Sensor',
  botones: 'Botones',
  polling: 'Polling Rate'
};

/**
 * Obtiene todas las especificaciones únicas de dos productos
 * @param {Object} product1 - Primer producto
 * @param {Object} product2 - Segundo producto
 * @returns {Array} Array de claves de especificaciones
 */
function getAllSpecs(product1, product2) {
  const specs1 = Object.keys(product1.specs || {});
  const specs2 = Object.keys(product2.specs || {});
  return [...new Set([...specs1, ...specs2])];
}

/**
 * Compara dos valores y determina cuál es mejor
 * @param {string} specKey - Clave de especificación
 * @param {string} value1 - Valor del producto 1
 * @param {string} value2 - Valor del producto 2
 * @returns {Object} Resultado de comparación
 */
function compareValues(specKey, value1, value2) {
  // Si son iguales, ninguno es mejor
  if (value1 === value2) {
    return { better: null, equal: true };
  }

  // Lógica específica por tipo de especificación
  switch (specKey) {
    case 'peso':
      // Menos peso es mejor
      const weight1 = parseFloat(value1);
      const weight2 = parseFloat(value2);
      if (!isNaN(weight1) && !isNaN(weight2)) {
        return { better: weight1 < weight2 ? 1 : 2, equal: false };
      }
      break;

    case 'precio':
      // Menor precio es mejor
      const price1 = parseFloat(value1);
      const price2 = parseFloat(value2);
      if (!isNaN(price1) && !isNaN(price2)) {
        return { better: price1 < price2 ? 1 : 2, equal: false };
      }
      break;

    case 'rgb':
      // Tener RGB es mejor
      if (value1 === 'Sí' && value2 === 'No') return { better: 1, equal: false };
      if (value2 === 'Sí' && value1 === 'No') return { better: 2, equal: false };
      break;

    case 'sensor':
      // Mayor DPI es mejor
      const dpi1 = parseInt(value1.match(/\d+/)?.[0] || 0);
      const dpi2 = parseInt(value2.match(/\d+/)?.[0] || 0);
      if (dpi1 > 0 && dpi2 > 0) {
        return { better: dpi1 > dpi2 ? 1 : 2, equal: false };
      }
      break;

    case 'polling':
      // Mayor polling rate es mejor
      const poll1 = parseInt(value1);
      const poll2 = parseInt(value2);
      if (!isNaN(poll1) && !isNaN(poll2)) {
        return { better: poll1 > poll2 ? 1 : 2, equal: false };
      }
      break;

    case 'botones':
      // Más botones es mejor
      const btn1 = parseInt(value1);
      const btn2 = parseInt(value2);
      if (!isNaN(btn1) && !isNaN(btn2)) {
        return { better: btn1 > btn2 ? 1 : 2, equal: false };
      }
      break;

    case 'microfono':
      // Cancelación de ruido es mejor que solo "Sí"
      if (value1.toLowerCase().includes('cancelación')) return { better: 1, equal: false };
      if (value2.toLowerCase().includes('cancelación')) return { better: 2, equal: false };
      if (value1 === 'Sí' && value2 === 'No') return { better: 1, equal: false };
      if (value2 === 'Sí' && value1 === 'No') return { better: 2, equal: false };
      break;
  }

  return { better: null, equal: false };
}

/**
 * Genera el resumen de diferencias entre dos productos
 * @param {Object} product1 - Primer producto
 * @param {Object} product2 - Segundo producto
 * @returns {Array} Array de diferencias
 */
function generateDifferences(product1, product2) {
  const differences = [];
  const allSpecs = getAllSpecs(product1, product2);

  // Comparar precio
  if (product1.precio !== product2.precio) {
    const cheaper = product1.precio < product2.precio ? product1 : product2;
    const diff = Math.abs(product1.precio - product2.precio);
    differences.push({
      text: `${cheaper.nombre} es $${diff} más económico`,
      product: cheaper === product1 ? 1 : 2,
      icon: '💰'
    });
  }

  // Comparar cada especificación
  allSpecs.forEach(spec => {
    const value1 = product1.specs?.[spec] || 'N/A';
    const value2 = product2.specs?.[spec] || 'N/A';
    const comparison = compareValues(spec, value1, value2);

    if (comparison.better) {
      const betterProduct = comparison.better === 1 ? product1 : product2;
      const label = specLabels[spec] || spec;

      let icon = '✨';
      let text = '';

      switch (spec) {
        case 'peso':
          icon = '⚖️';
          text = `${betterProduct.nombre} es más liviano`;
          break;
        case 'rgb':
          icon = '🌈';
          text = `${betterProduct.nombre} tiene iluminación RGB`;
          break;
        case 'sensor':
          icon = '🎯';
          text = `${betterProduct.nombre} tiene mejor sensor`;
          break;
        case 'polling':
          icon = '⚡';
          text = `${betterProduct.nombre} tiene mayor tasa de polling`;
          break;
        case 'botones':
          icon = '🔘';
          text = `${betterProduct.nombre} tiene más botones programables`;
          break;
        case 'microfono':
          icon = '🎤';
          text = `${betterProduct.nombre} tiene mejor micrófono`;
          break;
        default:
          text = `${betterProduct.nombre} tiene mejor ${label.toLowerCase()}`;
      }

      differences.push({
        text,
        product: comparison.better,
        icon
      });
    }
  });

  return differences;
}

/**
 * Genera la tabla de comparación HTML
 * @param {Object} product1 - Primer producto
 * @param {Object} product2 - Segundo producto
 * @returns {string} HTML de la tabla
 */
function generateComparisonTable(product1, product2) {
  const allSpecs = getAllSpecs(product1, product2);
  let tableHTML = '';

  allSpecs.forEach(spec => {
    const label = specLabels[spec] || spec;
    const value1 = product1.specs?.[spec] || 'N/A';
    const value2 = product2.specs?.[spec] || 'N/A';
    const comparison = compareValues(spec, value1, value2);

    const class1 = comparison.better === 1 ? 'better' : '';
    const class2 = comparison.better === 2 ? 'better' : '';

    tableHTML += `
      <tr>
        <td class="spec-name">${label}</td>
        <td class="spec-value ${class1}">${value1}</td>
        <td class="spec-value ${class2}">${value2}</td>
      </tr>
    `;
  });

  return tableHTML;
}

/**
 * Obtiene la etiqueta legible de una especificación
 * @param {string} key - Clave de especificación
 * @returns {string} Etiqueta legible
 */
function getSpecLabel(key) {
  return specLabels[key] || key;
}

export {
  getAllSpecs,
  compareValues,
  generateDifferences,
  generateComparisonTable,
  getSpecLabel
};
