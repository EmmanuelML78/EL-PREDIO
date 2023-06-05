// import React from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const data = [
//   { name: "María", age: 10, weight: 60 },
//   { name: "Karina", age: 25, weight: 70 },
//   { name: "Susana", age: 15, weight: 65 },
//   { name: "Pedro", age: 35, weight: 85 },
//   { name: "Felipe", age: 12, weight: 48 },
//   { name: "Laura", age: 30, weight: 69 },
//   { name: "Adrián", age: 15, weight: 78 },
// ];

// const GraficaBalace = () => {
//   return (
//     <div className="flex justify-center">
//       <ResponsiveContainer width="80%" aspect={2}>
//         <BarChart
//           data={data}
//           width={400}
//           height={100}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="4 1 2" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="weight" fill="#6b48ff" />
//           {/* <Bar dataKey="age" fill="#1ee3cf" /> */}
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default GraficaBalace;

import React, { useEffect } from "react";
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
import { format } from "date-fns"; // Importa la función format de date-fns
import { getBalance } from "../../redux/actions/balanceActions";
import "./GraficaBalance.style.css";

const GraficaBalace = () => {
  const balance = useSelector((state) => state.balance.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  const dataByMonth = balance.reduce((acc, entry) => {
    const month = format(new Date(entry.createdAt), "MMMM yyyy"); 
    const existingData = acc.find((item) => item.month === month);

    if (existingData) {
      existingData.cierreCaja += entry.cierreCaja; 
    } else {
      acc.push({
        month,
        cierreCaja: entry.cierreCaja,
      });
    }

    return acc;
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const cierreCaja = data.cierreCaja;
      const descripcion = data.descripcion;

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
          data={dataByMonth} 
          width={400}
          height={100}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="month" />
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
