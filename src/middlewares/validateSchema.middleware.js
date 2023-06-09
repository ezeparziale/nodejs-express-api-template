const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
      return res.status(422).json({ error: error.details[0].message })
    }
    req.validatedData = value
    next()
  }
}

module.exports = validateSchema
