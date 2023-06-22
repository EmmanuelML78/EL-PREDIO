import React, { useEffect, useRef, useState } from "react";
import { getAllReservas } from "../../redux/actions/reservaActions";
import { useDispatch, useSelector } from "react-redux";

const GraficaComparativa = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const reservas = useSelector((state) => state.reservas.reservas);
  // console.log("reservas", reservas);

  useEffect(() => {
    const fetchReservas = () => {
      dispatch(getAllReservas());
    };
    fetchReservas();
  }, [dispatch]);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    if (!Array.isArray(reservas) || reservas.length === 0) {
      // No hay datos de reserva válidos, no se puede dibujar el gráfico
      return;
    }

    // Obtener las reservas de la cancha 1 y de la cancha 2
    const cancha1Count = reservas.filter(
      (reserva) => reserva.canchaId === 1
    ).length;
    const cancha2Count = reservas.filter(
      (reserva) => reserva.canchaId === 2
    ).length;

    // Datos del gráfico
    const data = [cancha1Count, cancha2Count];
    const labels = ["Cancha 1", "Cancha 2"];

    // Configuración de estilo
    const chartRadius = Math.min(canvas.width, canvas.height) / 2 - 20;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const startAngle = 0;

    // Calcular el valor total de los datos
    const totalValue = data.reduce((a, b) => a + b, 0);

    // Dibujar los segmentos
    let currentAngle = startAngle;
    for (let i = 0; i < data.length; i++) {
      const segmentAngle = (data[i] / totalValue) * 2 * Math.PI;
      const endAngle = currentAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, chartRadius, currentAngle, endAngle);
      ctx.closePath();

      // Generar un color aleatorio para cada segmento
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      ctx.fillStyle = randomColor;
      ctx.fill();

      // Agregar etiquetas dentro del gráfico
      const labelAngle = currentAngle + segmentAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (chartRadius / 2);
      const labelY = centerY + Math.sin(labelAngle) * (chartRadius / 2);
      ctx.fillStyle = "#ffffff"; // Color de las etiquetas
      ctx.font = "16px Arial"; // Fuente y tamaño de las etiquetas
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[i], labelX, labelY);

      currentAngle = endAngle;
    }
  }, [reservas]);

  return (
    <div className="flex justify-center items-center mt-4">
      <canvas ref={chartRef} width={400} height={400}></canvas>
    </div>
  );
};

export default GraficaComparativa;
