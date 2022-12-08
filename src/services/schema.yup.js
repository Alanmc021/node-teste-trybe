const yup = require('yup');

const validationFrase = 'Invalid entries.Try again.';

const validationUser = yup.object().shape({
    password:
        yup.string(validationFrase)
            .required(validationFrase)
            .min(4, 'Erro: A senha deve ter no mínimo 4 caracteres!'),
    email:
        yup.string(validationFrase)
            .required(validationFrase)
            .email(validationFrase),
    name:
        yup.string(validationFrase)
            .required(validationFrase),
    role:
        yup.string(validationFrase)
            .required(validationFrase),
});

const validationLogin = yup.object().shape({
    password:
        yup.string(validationFrase)
            .required(validationFrase),             
    email:
        yup.string(validationFrase)
            .required(validationFrase),           

});

const validationRecipe = yup.object().shape({
    preparation:
        yup.string(validationFrase)
            .required(validationFrase),
    ingredients:
        yup.string(validationFrase)
            .required(validationFrase),
    name:
        yup.string(validationFrase)
            .required(validationFrase),
});

export { validationUser, validationRecipe, validationLogin };