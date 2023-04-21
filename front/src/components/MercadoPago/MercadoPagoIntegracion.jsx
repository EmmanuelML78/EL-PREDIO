import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-f2e62d41-fa77-4a1f-be62-f5d6e62e3a4a");

// const FORM_ID = 'payment-form';

// export default function Reserva() {
//   const { id } = useParams(); // id de reserva
//   const [preferenceId, setPreferenceId] = useState(null);

//   useEffect(() => {
//     // luego de montarse el componente, le pedimos al backend el preferenceId
//     axios.post('/api/orders', { productId: id }).then((order) => {
//       setPreferenceId(order.preferenceId);
//     });
//   }, [id]);

//   useEffect(() => {
//     if (preferenceId) {
//       // con el preferenceId en mano, inyectamos el script de mercadoPago
//       const script = document.createElement('script');
//       script.type = 'text/javascript';
//       script.src =
//         'https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js';
//       script.setAttribute('data-preference-id', preferenceId);
//       const form = document.getElementById(FORM_ID);
//       form.appendChild(script);
//     }
//   }, [preferenceId]);

//   return (
//     <form id={FORM_ID} method="GET" />
//   );
// }

const FORM_ID = "payment-form";

export default function Reserva({}) {
  const { id } = useParams(); // id de reserva
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    async function getPreferenceId() {
      try {
        const order = await payReserver(id);
        setPreferenceId(order.global);
      } catch (error) {
        console.log(error);
      }
    }

    getPreferenceId();
  }, [id]);

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);

  return (
    <form id={FORM_ID} method="POST" action="/feedback">
      <div id="wallet_container"></div>

      <Wallet initialization={{ preferenceId: "<PREFERENCE_ID>" }} />
    </form>
  );
}
