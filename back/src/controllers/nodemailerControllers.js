const nodemailer = require("nodemailer");

function enviarCorreo(name, email) {
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
        <p>Gracias por registrarte con nosotros.</p>
        <p>¡Bienvenido ${name} a El Predio!</p>
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

function sendResetPassword(email, resetPasswordUrl) {
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
    subject: "Recuperacion de contraseña",
    html: `
        <p>Darle click al enlase para recuperar la contraseña: ${resetPasswordUrl} </p>
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

function pagoaprovado(emailUser) {
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
    to: emailUser,
    subject: "Pago Aprovado",
    html: `<p>Ya tienes tu reserva separada </p>`,
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
  sendResetPassword,
  pagoaprovado,
};
