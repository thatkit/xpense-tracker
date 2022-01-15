import passwordValidator from 'password-validator';

const schema = new passwordValidator();

schema
    .is().min(4)
    .is().max(16)
    .has().digits(1)
    .has().letters(1)
    .has().not().spaces();

export default schema;