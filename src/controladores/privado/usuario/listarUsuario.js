
const {internServerErrorMsg} = require("../../../alerts/alerts")

const getUser = async (req, res) => {
    try {
        return  res.status(200).json(req.usuario)
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: internServerErrorMsg()})
    }
}

module.exports = getUser ;