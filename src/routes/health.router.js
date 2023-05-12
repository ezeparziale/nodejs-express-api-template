const express = require('express')
const healthController = require('../controllers/health.controller')

const router = express.Router()

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health endpoint
 *     description: Returns the health status of the API.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                   description: Represents the health status of the API.
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-05-12T12:34:56.789Z'
 *                   description: Represents the timestamp when the /health response was generated.
 *                 version:
 *                   type: string
 *                   example: 1.0
 *                   description: Represents the version of the API.
 *                 uptime:
 *                   type: number
 *                   example: 1234.56789
 *                   description: Represents the API's uptime in seconds.
 */
router.get('/', healthController.getHealthStatus)

module.exports = router
