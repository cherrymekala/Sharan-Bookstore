const Joi = require("joi");

module.exports.bookSchema = Joi.object({
  book: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
});
