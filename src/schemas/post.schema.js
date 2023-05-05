const Joi = require('joi')

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
}).options({ allowUnknown: false })

const postCreateSchema = postSchema.keys({
  published: Joi.boolean().default(false)
})

const postEditSchema = postSchema.keys({
  published: Joi.boolean().required()
})

module.exports = { postCreateSchema, postEditSchema }
