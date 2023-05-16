const express = require('express')
const router = express.Router();
const blog = require('../controllers/blogController')

router.post('/addblog', blog.addNewBlog)
router.get('/getallbloglist', blog.getAllBlogs)
router.patch('/editblogbyid/:blogId', blog.editBlogById)
router.delete('/deleteblogbyid/:blogId', blog.deleteBlogById)
router.post('/likeanddislike/:blogId/:blogLike', blog.likeAndDislike)

module.exports = router
