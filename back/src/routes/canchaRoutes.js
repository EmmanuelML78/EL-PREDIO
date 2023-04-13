const { Router } = require("express");
const router = Router();
const { getAllcanchas } = require('../controllers/CanchaControllers')
const { Cancha } = require('../db')

router.get('/', async (req, res) => {
    try {
        let canchas = await getAllcanchas();
        res.status(200).send(canchas);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    const {name, image, price, open, close, hasPromo, availability} = req.body
    try {
        if (!name, !price, !open, !close, !availability) {
            res.status(400).json({error: 'Debe ingresar los campos (name/price/open/close/availability)'})
        }
        const newCancha= await Cancha.create({
            name,
            image,
            price,
            open,
            close,
            hasPromo,
            availability
        });
        // res.status(200).send('Cancha creada con exito');
        res.status(200).json(newCancha);
    } catch (error) {
        res.status(500).json({error:'Error al crear la cancha'})       
    }
})

module.exports = router;