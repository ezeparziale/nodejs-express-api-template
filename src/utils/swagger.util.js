const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Template API NodeJS+Express',
      version: '1.0.0',
      description: 'Test API'
    }
  },
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = { swaggerUi, swaggerSpec }
