const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { isURL } = validator;

const urlValidator = (value) => {
  const result = isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL does not match the rules');
};

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateCardCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidator),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidator),
  }),
});
