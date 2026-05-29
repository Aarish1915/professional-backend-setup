import Joi from 'joi';

export const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().trim().email().required(),
  username: Joi.string().trim().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});
