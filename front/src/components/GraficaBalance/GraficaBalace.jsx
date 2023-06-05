import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getBalance } from "../../redux/actions/balanceActions";
import "./GraficaBalance.style.css";

const GraficaBalace = () => {
  const balance = useSelector((state) => state.balance.balance);
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(null);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  useEffect(() => {
    if (balance.length > 0) {
      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const currentMonthData = balance.filter((data) => {
        const date = new Date(data.createdAt);
        return (
          date.getMonth() === currentMonthIndex &&
          date.getFullYear() === currentYear
        );
      });

      setCurrentMonth(currentMonthData);
    }
  }, [balance]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Obtiene los datos del elemento seleccionado
      const cierreCaja = data.cierreCaja; // Accede al valor de cierre de caja en los datos
      const descripcion = data.descripcion; // Accede a la descripción en los datos

      return (
        <div className="custom-tooltip">
          <div className="description">
            <p className="description-label">Cierre de caja:</p>
            <p className="description-text">{cierreCaja}</p>
          </div>
          <div className="description">
            <p className="description-label">Descripción:</p>
            <p className="description-text">{descripcion}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex justify-center">
      <ResponsiveContainer width="80%" aspect={2}>
        <BarChart
          data={currentMonth}
          width={400}
          height={100}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis
            dataKey="createdAt"
            tickFormatter={(date) => {
              const dateObj = new Date(date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString("default", {
                month: "short",
              });
              return `${day} ${month}`;
            }}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="cierreCaja" fill="#6b48ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaBalace;
