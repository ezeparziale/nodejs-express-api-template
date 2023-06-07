const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const path = require('path')
const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json')
const packageJson = require(packageJsonPath)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Template API NodeJS+Express',
      version: packageJson.version,
      description: 'Test API'
    }
  },
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = { swaggerUi, swaggerSpec }
