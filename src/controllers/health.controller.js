const path = require('path')
const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json')
const packageJson = require(packageJsonPath)

const getHealthStatus = async (req, res) => {
  const response = {
    status: 'OK',
    timestamp: new Date(),
    version: packageJson.version,
    uptime: process.uptime()
  }

  res.status(200).json(response)
}

module.exports = { getHealthStatus }
