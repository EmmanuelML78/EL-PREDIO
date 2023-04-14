const { Cancha } = require('../db')

const getAllcanchas = async (canchaId) => {
    try {
        if (canchaId ){
            return await Cancha.findByPk(canchaId)
        }else{
            return await Cancha.findAll({ }); 
        } 
    } catch (error) {
        return []
    }
    
}

module.exports = {
    getAllcanchas,
}
