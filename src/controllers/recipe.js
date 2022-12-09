const rescue = require('express-rescue');
const services = require('../services/recipe');

const createRecipe = rescue(async (req, res) => {
    const result = await services.create(req);
    if (result.erro === 400) return res.status(400).json({ message: result.message });
    return res.status(201).json({ result });
});

const getAll = rescue(async (req, res) => {
    const recipes = await services.getAllRecipe();
    res.status(200).json(recipes);
});

const getById = rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await services.getByIdRecipe(id);
    if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
    res.status(200).json(recipe);
});

const updateRecipe = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { userId, role } = req;
    const recipeObj = {
        name, ingredients, preparation, _id: id,
    };

    const updatedRecipe = await services.update(recipeObj, userId, role, id);
    if (updatedRecipe.erro === 401) return res.status(401).json({ message: updatedRecipe.message });
    res.status(200).json(updatedRecipe);
});
const deleteRecipe = rescue(async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req;
    const result = await services.exclude(id, userId, role);
    if (result.erro === 401) return res.status(401).json({ message: result.message });
    return res.status(204).send();
});

const uploadImage = rescue(async (req, res) => {
    const { id } = req.params;
    const { path } = req.file;
    const { userId, role } = req;
    const recipeImg = await services.addImage(id, path, userId, role);
    if (recipeImg === false) {
        return res.status(401).json({ mensagem: 'Missing auth token.' });
    }
    res.status(recipeImg.code).json(recipeImg.recipe);
});

const getImageById = rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await services.getByIdImage(id);
    if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
    res.status(200).json(recipe);
});

module.exports = {
    createRecipe,
    getAll,
    getById,
    updateRecipe,
    deleteRecipe,
    uploadImage,
    getImageById,
};