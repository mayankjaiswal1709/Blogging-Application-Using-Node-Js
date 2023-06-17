const express = require('express')
const router = express.Router();
const blog = require('../controllers/blogController');
const { upload } = require('../middleware/imageStorage');

router.post('/addblog', upload.single("blogImg"), blog.addBlog)
router.get('/getallbloglist', blog.getAllBlogs)
router.patch('/editblogbyid/:blogid', blog.editBlogById)
router.delete('/deleteblogbyid/:blogid', blog.deleteBlogById)
router.post('/like/:blogid/:bloglike', blog.likeAndDislike)

module.exports = router
