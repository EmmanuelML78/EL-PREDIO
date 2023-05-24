import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraficaComparativa = (getAllReservas) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico (puedes cambiarlo a 'line', 'pie', etc.)
      data: {
        labels: ['Dato 1', 'Dato 2'], // Etiquetas para el eje x
        datasets: [
          {
            label: 'Serie 1', // Nombre de la serie de datos
            data: [10, 20, 30], // Valores de la serie de datos
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
            borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
            borderWidth: 1, // Ancho del borde de las barras
          },
          // Puedes agregar más series de datos aquí
        ],
      },
      options: {
        responsive: true,
      },
    });
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default GraficaComparativa;
