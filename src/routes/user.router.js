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
 * /api/v1/users/:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Get a list of all users
 */
router.get('/', requireAuth, userController.getAllUser)

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Get all users
 *     description: Get a list of all users
 */
router.get('/me', requireAuth, userController.getMe)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Get who I am
 *     description: Get info about my user
 */
router.get('/:userId', requireAuth, userController.getOneUser)

/**
 * @swagger
 * /api/v1/users/:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Create a user
 *     description: Create a new user
 */
router.post('/', requireAuth, userController.createNewUser)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Update a user
 *     description: Update a user
 */
router.put('/:userId', requireAuth, userController.updateOneUser)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     summary: Delete a user
 *     description: Delete a user
 */
router.delete('/:userId', requireAuth, userController.deleteOneUser)

module.exports = router
