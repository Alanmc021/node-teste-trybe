const yup = require('yup');

const schema = yup.object().shape({
    password:
        yup.string('Erro: Necessário preencher o campo senha!')
            .required('Erro: Necessário preencher o campo senha!')
            .min(6, 'Erro: A senha deve ter no mínimo 6 caracteres!'),
    email:
        yup.string('Erro: Necessário preencher o campo e-mail!')
            .required('Erro: Necessário preencher o campo e-mail!')
            .email('Erro: Necessário preencher o campo com e-mail válido!'),
    name:
        yup.string('Erro: Necessário preencher o campo nome!')
            .required('Erro: Necessário preencher o campo nome!'),
});

export default schema;