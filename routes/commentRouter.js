const express = require('express')
const router = express.Router();
const comment = require('../controllers/commentController')

router.post('/addcomment', comment.addComment)
router.get('/viewallcomment', comment.getAllComment)
router.delete('/deletecommentbyid/:id', comment.deleteCommentById)
router.patch('/editcommentbyid/:commentId', comment.editCommentById)

module.exports = router;