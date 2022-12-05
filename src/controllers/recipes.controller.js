import {
    create,
    getAllRecipe,
    getByIdRecipe,
    exclude,
    update,
    addImage,
    getByIdImage,
} from '../services/recipe.services';

const rescue = require('express-rescue');

const createRecipe = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const recipeNew = {
        name,
        ingredients,
        preparation,
        userId: req.userId,
    };
    const result = await create({ recipeNew, req });
    if (result.erro === true) return res.status(400).json({ erro: result.mensagem });
    return res.status(201).json({ result });
});

const getAll = rescue(async (req, res) => {
    const recipes = await getAllRecipe();
    res.status(200).json(recipes);
});

const getById = rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await getByIdRecipe(id);
    if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
    res.status(200).json(recipe);
});

const deleteRecipe = rescue(async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req;
    const result = await exclude(id, userId, role);
    if (result === false) {
        return res.status(401).json({ mensagem: 'Missing auth token.' });
    }
    return res.status(204).send();
});

const updateRecipe = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { userId, role } = req;
    const recipeObj = {
        name, ingredients, preparation, _id: id,
    };
    const updatedRecipe = await update(recipeObj, userId, role, id);
    if (updatedRecipe === false) {
        return res.status(401).json({ mensagem: 'Missing auth token.' });
    }
    res.status(updatedRecipe.code).json(updatedRecipe.recipe);
});

const uploadImage = rescue(async (req, res) => {
    const { id } = req.params;
    const { path } = req.file;
    const { userId, role } = req;
    const recipeImg = await addImage(id, path, userId, role);
    if (recipeImg === false) {
        return res.status(401).json({ mensagem: 'Missing auth token.' });
    }
    res.status(recipeImg.code).json(recipeImg.recipe);
});

const getImageById = rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await getByIdImage(id);
    if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
    res.status(200).json(recipe);
});

const login = async () => null;

export {
    login,
    createRecipe,
    getById,
    getAll,
    deleteRecipe,
    updateRecipe,
    uploadImage,
    getImageById,
};