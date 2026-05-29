import Joi from 'joi';

export const videoUploadSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),
  description: Joi.string().trim().max(1000).required(),
  duration: Joi.number().min(1).required(),
  thumbnail: Joi.string().uri().optional(),
  isPublic: Joi.boolean().optional().default(true),
});
