import React from "react";
import { useState } from "react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div>
      <h1 className="text-3xl font-bold underline">El Predio - Fútbol</h1>
      <div className="flex-1 border-2 rounded-xl m-4 p-2 border-green-900">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <div>
          <button>Ingresar con Google</button>
          <button>Ingresar con Facebook</button>
        </div>
      </div>
    </div>
  );
}
