const express = require('express')
const userController = require('../controllers/user.controller')
const { requireAuth } = require('../middlewares/authenticate.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user's ID.
 *         email:
 *           type: string
 *           description: The user's email address.
 *       example:
 *         id: 1
 *         email: johndoe@example.com
 *     UserUpdateInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The updated email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The updated password of the user.
 *       required: [email, password]
 */

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Get all users.
 *     description: Retrieve a list of all users with pagination support.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         required: false
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           minimum: 1
 *         required: false
 *         description: The maximum number of users to retrieve per page
 *     responses:
 *       200:
 *         description: List of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error occurred while fetching users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching users
 */
router.get('/', requireAuth, userController.getAllUser)

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Get current user information.
 *     description: Returns the information of the currently authenticated user in the application.
 *     responses:
 *       200:
 *         description: Current user information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Current user information not found.
 *       500:
 *         description: Internal server error occurred while retrieving the user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 */
router.get('/me', requireAuth, requireAuth, userController.getMe)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Get a single user.
 *     description: Retrieve a single user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error occurred while retrieving the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving the user
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.get('/:userId', requireAuth, userController.getOneUser)

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Create a new user.
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: johndoe@example.dom
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: mysecretpassword
 *             required: [email, password]
 *     responses:
 *       201:
 *         description: User created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 id:
 *                   type: integer
 *                   description: The ID of the created user.
 *       500:
 *         description: Error occurred while creating the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating user
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.post('/', requireAuth, userController.createNewUser)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Update a user.
 *     description: Update an existing user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error occurred while updating the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating user
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.put('/:userId', requireAuth, userController.updateOneUser)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Delete a user.
 *     description: Delete an existing user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error occurred while deleting the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting user
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.delete('/:userId', requireAuth, userController.deleteOneUser)

module.exports = router
