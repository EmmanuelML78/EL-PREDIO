const axios = require("axios");
const router = require("express").Router();
const {
  getAllReservations,
  deleteReserva,
  updateReserva,
  payReserver,
  // updatePayReserva,
} = require("../controllers/ReservaControllers");
const { enviarCorreo } = require("../controllers/nodemailerControllers");
const { Reserva, Cancha, User } = require("../db");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");

// const mercadopago = require("../utils/mercadoPago");

router
  .get("/", adminMiddleware, async (req, res) => {
    try {
      const allReservations = await getAllReservations();
      res.status(200).send(allReservations);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  })
  .get("/:id", adminMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
      if (id) {
        const reserva = await Reserva.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: Cancha,
              as: "cancha",
            },
            {
              model: User,
              as: "user",
            },
          ],
        });

        if (reserva) {
          res.status(200).send(reserva);
        } else {
          res.status(500).json({ message: "Error al obtener Reserva por ID" });
        }
      } else {
        res.status(400).json({ message: "No se especificó un ID válido" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al buscar la reserva" });
    }
  })
  .post("/", authMiddleware, async (req, res) => {
    const { date, start, end, status, hasPromo, userId, canchaId, id_pago } =
      req.body;
    try {
      const reservation = await Reserva.create({
        date,
        start,
        end,
        status,
        hasPromo,
        userId,
        canchaId,
        id_pago,
      });
      res.status(201).json(reservation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear la reserva" });
    }
  })
  .get("/pagos/:preferenceId", authMiddleware, async (req, res) => {
    const preferenceId = req.params.preferenceId;
    try {
      // Hacer una llamada a la API de MercadoPago para obtener el estado de la transacción
      const mpResponse = await axios.get(
        `https:/api.mercadopago.com/v1/payments/search`,
        {
          params: {
            access_token: process.env.ACCESS_TOKEN,
            external_reference: preferenceId,
          },
        }
      );
      // Devolver la respuesta de MercadoPago
      res.json(mpResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error al obtener el estado de la transacción de MercadoPago",
      });
    }
  })
  .post("/pagos", payReserver)

  .post("/notificaciones", async (req, res) => {
    try {
      switch (req.body.type) {
        case "payment":
          const payment = await mercadopago.payment.get(req.body.data.id);
          // console.log(payment.body.external_reference);
          const idReserve = parseInt(payment.body.external_reference);
          const reserva = await Reserva.findOne({
            where: { id: idReserve },
          });

          if (payment.body.status === "approved") {
            reserva.status = "confirmed";
          } else if (payment.body.status === "pending") {
            reserva.status = "pending";
          } else {
            reserva.status = "cancelled";
          }

          await reserva.save();

          break;
        case "plan":
          const plan = await mercadopago.plan.get(req.body.data.id);
          console.log("Plan:", plan);
          break;
        case "subscription":
          const subscription = await mercadopago.subscription.get(
            req.body.data.id
          );
          console.log("Subscription:", subscription);
          break;
        case "invoice":
          const invoice = await mercadopago.invoice.get(req.body.data.id);
          console.log("Invoice:", invoice);
          break;
        case "point_integration_wh":
          // El cuerpo de la notificación es suficiente para validar la autenticidad de la notificación
          console.log("Notificación de punto de venta integrado");
          break;
        default:
          console.log("Tipo de notificación desconocido");
          break;
      }
    } catch (error) {
      console.error("Error al procesar la notificación:", error);
    }

    res.sendStatus(200);
  })

  // .post("/notificaciones", async (req, res) => {
  //   const body = req.body;
  //   // Verificar que la notificación sea válida, siguiendo las instrucciones de MercadoPago
  //   // https://www.mercadopago.com.ar/developers/es/guides/notifications/webhooks/validations
  //   // En caso de ser inválida, retornar un código de error 400 (Bad Request)

  //   // Si la notificación es válida, actualizar el estado de la reserva en tu base de datos
  //   const reservaId = body.data.id;
  //   const estado = body.type === "payment" ? body.data.status : null; // Verificar que el evento sea de tipo 'payment'
  //   console.log(estado);
  //   await updatePayReserva(reservaId, estado);

  //   // Retornar una respuesta 200 (OK) para confirmar la recepción de la notificación
  //   res.status(200).send("Notificación recibida");
  // })

  .delete("/:id", adminMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
      const deletedReserva = await deleteReserva(id);
      deletedReserva
        ? res.status(200).json({ message: "Reserva eliminada con éxito" })
        : res.status(404).json({ message: "Reserva no encontrada" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la Reserva" });
    }
  })
  .get("/success/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await changeStatusSuccess(id);
      res.redirect("http://localhost:5173/misreservas");
    } catch (error) {
      res.status(400).json(error);
    }
  });
app
  .get("/failure/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await changeStatusFailure(id);
      res.redirect("http://localhost:5173/misreservas");
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get("/pending/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await changeStatusPending(id);
      res.redirect("http://localhost:5173/misreservas");
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .put("/", adminMiddleware, async (req, res) => {
    const { id, date, start, end, status, hasPromo } = req.body;

    if (id && (date || start || end || status || hasPromo)) {
      try {
        const reservaUpdate = await updateReserva(
          id,
          date,
          start,
          end,
          status,
          hasPromo
        );
        return res.status(200).json(reservaUpdate);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: "Error al actualizar la reserva" });
      }
    } else {
      return res.status(400).json({ message: error });
    }
  });

module.exports = router;
