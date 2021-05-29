const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(12).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).max(12).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).max(12).required(),
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
