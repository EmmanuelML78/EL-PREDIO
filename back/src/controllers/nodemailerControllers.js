const nodemailer = require("nodemailer");

function enviarCorreo(email, password) {
  console.log(email);
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "el_predio_arg@outlook.com",
      pass: "Elpredio123",
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
  let mailOptions = {
    from: '"⚽ El Pedrio ⚽" <el_predio_arg@outlook.com>',
    to: email,
    subject: "Confirmación de registro",
    html: `
        <h1>Registro completado</h1>
        <p>Hola,</p>
        <p>Gracias por registrarte con nosotros. Aquí está la información que proporcionaste:</p>
        <ul>
            <li>Correo electrónico: ${email}</li>
            <li>Contraseña: ${password}</li>
        </ul>
        <p>¡Bienvenido al Predio!</p>
    `,
  };
  //   console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
}

module.exports = {
  enviarCorreo,
};
