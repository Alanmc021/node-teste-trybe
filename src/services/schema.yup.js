const yup = require('yup');

const validationUser = yup.object().shape({
    password:
        yup.string('Erro: Necessário preencher o campo senha!')
            .required('Erro: Necessário preencher o campo senha!')
            .min(6, 'Erro: A senha deve ter no mínimo 6 caracteres!'),
    email:
        yup.string('Invalid entries . Try again.')
            .required('Invalid entries.Try again.')
            .email('Invalid entries.  Try again.'),
    name:
        yup.string('Invalid entries. Try again .')
            .required('Invalid entries. Try again .'),
});

const validationRecipe = yup.object().shape({
    preparation:
        yup.string('Erro: Necessário preencher preparation!')
            .required('Erro: Necessário preencher preparation!'),            
    ingredients:
        yup.string('Invalid entries . Try again.')
            .required('Invalid entries. Try again.'),           
    name:
        yup.string('Invalid entries. Try again.')
            .required('Invalid entries. Try again.'),
});

export { validationUser, validationRecipe };