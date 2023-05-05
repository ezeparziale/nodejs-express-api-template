const express = require('express')
const postController = require('../controllers/post.controller')
const { requireAuth } = require('../middlewares/authenticate.middleware')
const { postCreateSchema, postEditSchema } = require('../schemas/post.schema')
const validateSchema = require('../middlewares/validateSchema.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Title of post
 *           example: 1
 *         title:
 *           type: string
 *           description: Content of post
 *           example: My title post
 *         content:
 *           type: string
 *           description: Content of post
 *           example: My content post
 *         published:
 *           type: boolean
 *           description: Specifies whether the post has been published or not
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time that the post was created
 *           example: "2023-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time that the post was last updated
 *           example: "2023-01-01T00:00:00Z"
 *     PostCreate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of post
 *           example: My title post
 *         content:
 *           type: string
 *           description: Content of post
 *           example: My content post
 *         published:
 *           type: boolean
 *           description: Specifies whether the post has been published or not
 *           example: true
 *       required: ["title", "content"]
 *     PostUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of post
 *           example: Updated post
 *         content:
 *           type: string
 *           description: Content of post
 *           example: This is the updated content of my post
 *         published:
 *           type: boolean
 *           description: Specifies whether the post has been published or not
 *           example: true
 *       required: ["title", "content", "published"]
 */

/**
 * @swagger
 * /api/v1/posts/:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Posts]
 *     summary: Get all posts
 *     description: Get a list of all posts.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minium: 1
 *         required: false
 *         description: The page number of posts to return
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           mininum: 1
 *         required: false
 *         description: The maximum number of posts to return
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error getting all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving posts
 */
router.get('/', requireAuth, postController.getAllPost)

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Posts]
 *     summary: Get a post
 *     description: Get a post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: A post object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error getting a post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving the post
 */
router.get('/:postId', requireAuth, postController.getOnePost)

/**
 * @swagger
 * /api/v1/posts/:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags: [Posts]
 *     summary: Create a post
 *     description: Create a new post
 *     parameters:
 *       - in: body
 *         title: title os post
 *         schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid JSON
 *       500:
 *         description: Error updating post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating post
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.post('/', requireAuth, validateSchema(postCreateSchema), postController.createNewPost)

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags: [Posts]
 *     summary: Update a post
 *     description: Update a post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       description: Post object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post updated
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid JSON
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error updating post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating post
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.put('/:postId', requireAuth, validateSchema(postEditSchema), postController.updateOnePost)

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags: [Posts]
 *     summary: Delete a post
 *     description: Delete a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to delete
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error deleting post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting post
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.delete('/:postId', requireAuth, postController.deleteOnePost)

module.exports = router
