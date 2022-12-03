const yup = require('yup');

const schema = yup.object().shape({
    password:
        yup.string('All fields must be filled')
            .required('All fields must be filled')
            .min(6, 'Erro: A senha deve ter no mínimo 6 caracteres!'),
    email:
        yup.string('Invalid entries . Try again.')
            .required('All fields must be filled')
            .email('Invalid entries. Try again.'),
});

export default schema;