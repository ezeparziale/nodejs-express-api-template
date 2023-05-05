const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: oauth2
 *       flows:
 *         password:
 *           tokenUrl: '/api/v1/auth/login'
 *           tokenField: "token"
 *           passwordField: "password"
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     auth:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User email
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: User password
 *           example: mysecretpassword
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Login user and return a bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/auth'
 *         required: ["username", "password"]
 *     responses:
 *       200:
 *         description: A bearer token for user authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   description: Type of token
 *                   example: bearer
 *                 token:
 *                   type: string
 *                   description: Token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Error logging in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error login user
 */
router.post('/login', authController.loginUser)

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/auth'
 *         required: ["email", "password"]
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 userId:
 *                   type: integer
 *                   format: int64
 *                   example: 1
 *       400:
 *         description: Email and password are required
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Error creating a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating a user
 */
router.post('/register', authController.registerUser)

module.exports = router
