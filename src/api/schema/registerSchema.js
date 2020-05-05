import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = function (data) {
    return schema.validate(data, {abortEarly: false});
};