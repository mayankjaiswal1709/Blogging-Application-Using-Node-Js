const blogSchema = require('../models/blogSchema')

// Add new blog
const addNewBlog = async (req, res) => {
    const blogData = new blogSchema(req.body)
    try {
        if (blogData != null) {
            await blogData.save();
            return res.status(409).json({
                success: true,
                message: "Blog added successfully",
                blogDetails: blogData
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "no blog added"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// view all blogs
const getAllBlogs = async (req, res) => {
    const blogData = await blogSchema.find()
    try {
        if (blogData != "") {
            return res.status(200).json({
                success: true,
                blogData: blogData
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "no such blog found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// like and dislike on blog API
const likeAndDislike = async (req, res) => {
    const { blogId, blogLike } = req.params
    try {
        const myBlogLike = await blogSchema.findById(blogId).select('blogLike')
        if (blogLike === 'true') {
            let likes = myBlogLike.bloglike
            likes++
            await blogSchema.findOneAndUpdate(myBlogLike._id, { $set: { blogLikes: likes } }, { new: true })
            res.status(200).json({
                success: true,
                message: "liked successfully"
            })
        } else {
            let likes = myBlogLike.bloglike
            likes--
            await blogSchema.findOneAndUpdate(myBlogLike._id, { $set: { blogLikes: likes } }, { new: true })
            res.status(200).json({
                success: true,
                message: "disliked successfully"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// Update blog by blogID
const editBlogById = async (req, res) => {
    const { blogId } = req.params
    const blogData = await blogSchema.findByIdAndUpdate(blogId, req.body)
    try {
        if (blogData != "") {
            await blogData.save();
            return res.status(200).json({
                success: true,
                message: "blog edited successfully",
                updatedBlog: blogData
            })
        } else {
            return res.status(409).json({
                success: false,
                message: "no such id found"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

//delete blog by blogID
const deleteBlogById = async (req, res) => {
    const { blogId } = req.params
    const blogData = await blogSchema.findByIdAndDelete(blogId)
    try {
        if (blogData != null) {
            return res.status(200).json({
                success: true,
                message: "blog deleted successfully",
                deletedBlog: blogData
            })
        } else {
            return res.status(409).json({
                success: false,
                message: "no such id found"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}
module.exports = { addNewBlog, getAllBlogs, likeAndDislike, editBlogById, deleteBlogById }
