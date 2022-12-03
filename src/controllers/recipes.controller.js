import { create, getAllRecipe, getByIdRecipe, exclude } from '../services/recipe.services';

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
    await exclude(id);
    res.status(204).send();
});

const login = async () => null;

export { login, createRecipe, getById, getAll, deleteRecipe };