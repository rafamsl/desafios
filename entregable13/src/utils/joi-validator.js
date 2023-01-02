import joi from "joi";

const product = joi.object({
  title: joi.string().min(3).max(45).required(),
  description: joi.string().min(3).max(100).required(),
  code: joi.string().min(3).max(45).required(),
  thumbnail: joi.string().min(3).max(150).required(),
  price: joi.number().required(),
  stock: joi.number().required(),
  timestamp: joi.string().required(),
});

const user = joi.object({
  email: joi.string().email({ tlds: { allow: false } }).required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  timestamp: joi.string().required(),
});

export const JOI_VALIDATOR = { product, user };