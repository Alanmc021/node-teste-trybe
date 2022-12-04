import {
    newRecipe,
    getAll,
    getById,
    excludeRecipe,
    updateRecipe,
    addImageRecipe,
    getImageId,
} from '../models/recipe.model';
import { validationRecipe } from './schema.yup';

const { ObjectId } = require('mongodb');

const create = async ({ recipeNew, req }) => {
    console.log(recipeNew);
    // const usuario = await userExists({ email });

    // if (usuario) return 'Email is already registered';
    // console.log(req.body.userId);
    const schema = validationRecipe;

    try {
        await schema.validate(req.body);
    } catch (err) {
        return ({
            erro: true,
            mensagem: err.errors,
        });
    }

    const recipe = await newRecipe({ recipeNew });

    return recipe;
};

const getByIdRecipe = async (id) => {
    const objError = {
        code: 404,
        message: 'recipe not found',
    };
    if (!ObjectId.isValid(id)) return objError;
    const recipe = await getById(id);
    if (!recipe) return objError;
    return recipe;
};

const getAllRecipe = async () => {
    const recipes = await getAll();
    return recipes;
};

const update = async (recipe) => {
    await updateRecipe(recipe);
    const { _id } = recipe;
    const getRecipe = await getById(_id);
    return {
        code: 200,
        recipe: getRecipe,
    };
};

const exclude = async (id) => excludeRecipe(id);

const addImage = async (id, path) => {
    await addImageRecipe(id, path);
    const getRecipe = await getById(id);
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
    const recipe = await getImageId(id);
    if (!recipe) return objError;
    return recipe;
};

const login = async () => null;

export {
    create,
    getAllRecipe,
    getByIdRecipe,
    exclude,
    update,
    addImage,
    getByIdImage,
    login,
};
