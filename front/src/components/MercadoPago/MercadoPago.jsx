// import React from "react";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-f2e62d41-fa77-4a1f-be62-f5d6e62e3a4a");

const MercadoPago = () => {
  return (
    <>
      <div id="wallet_container"></div>

      <Wallet initialization={{ preferenceId: "<PREFERENCE_ID>" }} />
    </>
  );
};

export default MercadoPago;
