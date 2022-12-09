const { ObjectId } = require('mongodb');
const model = require('../models/recipe.model');
const validation = require('./schema.yup');

const create = async (req) => {
    const { name, ingredients, preparation } = req.body;
    const recipeNew = {
        name,
        ingredients,
        preparation,
        role: req.role,
        userId: req.userId,
    };
 
    const schema = validation.validationRecipe;

    try {
        await schema.validate(req.body);
    } catch (err) {
        return ({ erro: 400, message: 'Invalid entries. Try again.' });
    }

    const recipe = await model.newRecipe({ recipeNew });

    return recipe;
};

const getAllRecipe = async () => {
    const recipes = await model.getAll();
    return recipes;
};

const getByIdRecipe = async (id) => {
    const objError = {
        code: 404,
        message: 'recipe not found',
    };
    if (!ObjectId.isValid(id)) return objError;
    const recipe = await model.getById(id);
    if (!recipe) return objError;
    return recipe;
};

const update = async (recipe, userId, role, id) => {     
    const check = await model.listRecipeById(id);
    if (check.userId !== userId && role !== 'admin') {
        return ({ erro: 401, message: 'missing auth token' });
    }
    await model.updateRecipe(recipe);
    const { _id } = recipe;
    const getRecipe = await model.getById(_id);
    return getRecipe;
};

const exclude = async (id, userId, role) => {
    const check = await model.listRecipeById(id);
    if (check.userId !== userId && role !== 'admin') {
        return ({ erro: 401, message: 'missing auth token' });
    }

    const result = await model.excludeRecipe(id);
    return result;
};

const addImage = async (id, path, userId, role) => {
    const check = await model.listRecipeById(id);
    if (check.userId !== userId && role !== 'admin') {
        return false;
    }
    await model.addImageRecipe(id, path);
    const getRecipe = await model.getById(id);
    return {
        code: 200,
        recipe: getRecipe,
    };
};

const getByIdImage = async (id) => {
    const objError = {
        code: 404,
        message: 'recipe not found',
    };
    if (!ObjectId.isValid(id)) return objError;
    const recipe = await model.getImageId(id);
    if (!recipe) return objError;
    return recipe;
};

module.exports = {
    create,
    getAllRecipe,
    getByIdRecipe,
    update,
    exclude,
    addImage,
    getByIdImage,
};