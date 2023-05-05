const Joi = require('joi')

const voteSchema = Joi.object({
  postId: Joi.number().required(),
  dir: Joi.number().valid(-1, 1).required()
})

module.exports = { voteSchema }
