const express = require('express')
const router = express.Router()

const userRoutes = require('../routes/userRouter')
const blogRoutes = require('../routes/blogRouter')
const commentRoutes = require('../routes/commentRouter')

router.use('/user', userRoutes)
router.use('/blog', blogRoutes)
router.use('/comment', commentRoutes)

module.exports = router
