const express = require('express')
const voteController = require('../controllers/vote.controller')
const { requireAuth } = require('../middlewares/authenticate.middleware')
const { voteSchema } = require('../schemas/vote.schema')
const validateSchema = require('../middlewares/validateSchema.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Votes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VoteInput:
 *       type: object
 *       required:
 *         - postId
 *         - dir
 *       properties:
 *         postId:
 *           type: integer
 *           description: ID of the post to vote for
 *         dir:
 *           type: integer
 *           description: Direction of the vote (-1 for downvote, 1 for upvote)
 *       example:
 *         postId: 1
 *         dir: 1
 *     VoteOutput:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           enum: [Successfully added vote, Successfully deleted vote]
 *       example:
 *         message: Successfully added vote
 */

/**
 * @swagger
 * /api/v1/votes:
 *   post:
 *     summary: Vote for a post
 *     tags: [Votes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Object containing postId and dir fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoteInput'
 *     responses:
 *       201:
 *         description: Successfully vote added or deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VoteOutput'
 *       404:
 *         description: Post not found or vote not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum: [Post not found, Vote not exits]
 *               example:
 *                 message: Post not found
 *       409:
 *         description: Vote already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Vote already exists
 *       422:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: "'postId' is required"
 *       500:
 *         description: Error voting post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error voting
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.post('/', requireAuth, validateSchema(voteSchema), voteController.createVote)

module.exports = router
