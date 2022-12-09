const rescue = require('express-rescue');
const userServices = require('../services/user');

const createUser = async (req, res) => {
    const result = await userServices.create({ req });
    if (result.erro === 409) return res.status(409).json({ message: result.message });
    if (result.erro === 400) return res.status(400).json({ message: result.message });
    return res.status(201).json(result);
};

const loginUser = async (req, res) => {
    const result = await userServices.login({ req });
    if (result.erro === 401) return res.status(401).json({ message: result.message });
    if (result.erro === 402) return res.status(401).json({ message: result.message });
    if (result.erro === 200) return res.status(200).json(result.message);
    return res.status(200).json(result);
};

const createAdmin = rescue(async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req;
    const result = await userServices.adminCreate({ id, req, userId, role });
    if (result.statusCode === 401) return res.status(401).json({ error: result.erro });
    return res.status(201).json(result);
});

module.exports = {
    createUser,
    loginUser,
    createAdmin,
};