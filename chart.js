"use strict";

let chartInstance = null; // Guardar la instancia para actualizarla

function renderChart(categoryName) {
  const category = registerData.find(cat => cat.category === categoryName);
  if (!category) {
    console.warn(`Categoría ${categoryName} no encontrada para la gráfica.`);
    return;
  }

  const labels = category.subcategories.map(sub => sub.name);
  const data = category.subcategories.map(sub => sub.amount);

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // 🛠️ Establecer dimensiones ANTES de crear el gráfico
  canvas.width = 400;
  canvas.height = 400;

  // Si ya existe un gráfico, destruirlo
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: `${categoryName} - Gastos por subcategoría`,
        data: data,
        backgroundColor: generateColors(labels.length),
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,              // ⚠️ Importante: desactivar responsive
      maintainAspectRatio: false,    // Opcional: para evitar forzar proporción
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          enabled: true
        }
      }
    }
  });
}

function generateColors(num) {
  const baseColors = [
    '#4CAF50', '#FF9800', '#2196F3', '#E91E63', '#9C27B0',
    '#FF5722', '#03A9F4', '#8BC34A', '#FFC107', '#00BCD4',
    '#673AB7', '#FFEB3B', '#CDDC39', '#009688'
  ];
  const colors = [];
  for (let i = 0; i < num; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
}
