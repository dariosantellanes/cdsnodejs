import Joi from 'joi';

const schema = Joi.object({
    external_id: Joi.number().integer().required(),
    popularity: Joi.number().optional().allow(''),
    vote_average: Joi.number().optional().allow(''),
    video: Joi.boolean().optional(),
    vote_count: Joi.number().integer().optional().allow(''),
    release_date: Joi.string().optional().allow(''),
    original_language: Joi.string().optional().allow(''),
    original_title: Joi.string().optional().allow(''),
    adult: Joi.boolean().optional(),
    title: Joi.string().optional().allow(''),
    overview: Joi.string().optional().allow(''),
    suggestionScore: Joi.number().integer().optional().allow('')
});

module.exports = function (data) {
    return schema.validate(data, { abortEarly: false });
};