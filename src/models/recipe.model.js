// import jwt from 'jsonwebtoken';
// import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const { ObjectId } = require('mongodb');
// import validation from './schema.yup';

// const SECRET = 'paranguaricutirimiruarum';
// { "name" : "Receita do Jacquin", "ingredients" : "Frango", "preparation" : "10 minutos no forno" }

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
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const login = async () => null;

export { newRecipe, getAll, getById, excludeRecipe, login };