const { verifyToken } = require('../utils/jwt')

function requireAuth (req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token)
    if (decoded) {
      req.userId = decoded.sub
      next()
    } else {
      res.status(401).json({ message: 'Could not validate credentials' })
    }
  } else {
    res.status(401).json({ message: 'Could not validate credentials' })
  }
}

module.exports = { requireAuth }
