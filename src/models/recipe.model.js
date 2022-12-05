// import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

// const { ObjectId } = require('mongodb');
// import validation from './schema.yup';

// const SECRET = 'paranguaricutirimiruarum';
// { "name" : "Receita do Jacquin", "ingredients" : "Frango", "preparation" : "10 minutos no forno" }
const listRecipeById = async (id) => {
    const isValid = ObjectId.isValid(id);
    if (!isValid) return null;

    const db = await connection();
    const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return result;
};

const newRecipe = async ({ recipeNew }) => {
    const { name, ingredients, preparation, userId } = recipeNew;
    const db = await connection();
    const recipe = await db
        .collection('recipes')
        .insertOne({ name, ingredients, preparation, userId });
    const { insertedId: _id } = recipe;
    return { name, _id, ingredients, preparation, userId };
};

const getAll = async () => {
    const db = await connection();
    const allRecipes = db.collection('recipes').find({}).toArray();
    return allRecipes;
};

const getById = async (id) => {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne(new ObjectId(id));
    return recipe;
};

const excludeRecipe = async (id) => {
    const isValid = ObjectId.isValid(id);    
    if (!isValid) return null;

    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    return true;
};

const updateRecipe = async (recipe) => {
    const db = await connection();
    const { _id, name, ingredients, preparation } = recipe;
    const updatedRecipe = await db
        .collection('recipes')
        .updateOne({ _id: ObjectId(_id) }, { $set: { name, ingredients, preparation } });
    return updatedRecipe;
};

const addImageRecipe = async (id, path) => {
    const db = await connection();
    const updatedRecipe = await db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { image: `localhost:3000/${path}` } });

    return updatedRecipe;
};

const getImageId = async (id) => {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne(new ObjectId(id));
    return recipe.image;
};

const login = async () => null;

export {
    newRecipe,
    getAll,
    getById,
    excludeRecipe,
    updateRecipe,
    addImageRecipe,
    getImageId,
    login,
    listRecipeById,
};