const userServices = require('../services/user');

const createUser = async (req, res) => {
    const result = await userServices.create({ req });
    if (result.erro === 409) return res.status(409).json(result.message);
    if (result.erro === 400) return res.status(400).json(result.message);
    return res.status(201).json(result);
};

const loginUser = async (req, res) => {
    const result = await userServices.login({ req });   
    if (result.erro === 401) return res.status(401).json({ message: result.message });
    if (result.erro === 402) return res.status(401).json({ message: result.message });
    if (result.erro === 200) return res.status(200).json(result.message);
    return res.status(200).json(result);     
};

module.exports = {
    createUser,
    loginUser,
};