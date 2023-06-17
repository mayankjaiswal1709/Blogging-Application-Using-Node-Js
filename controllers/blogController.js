const fs = require("fs")
const blogSchema = require('../models/blogSchema')

// Add new blog
const addBlog = async (req, res) => {
    try {
        const blogData = new blogSchema(req.body);
        if (blogData != "") {
            blogData.blogImg = `/uploads/${(req.file.filename)}`;
            await blogData.save();
            return res.status(409).json({
                success: true,
                message: "Congratulation!! your blog created Successfully",
                blogData: blogData,
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "no blog created try again",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.stack,
        });
    }
};

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
    const { blogid, bloglike } = req.params
    try {
        const myBlogLike = await blogSchema.findById(blogid).select('blogLike')
        if (bloglike === 'true') {
            let likes = myBlogLike.bloglike
            likes++
            await blogSchema.findOneAndUpdate(myBlogLike._id, { $set: { bloglike: likes } }, { new: true })
            res.status(200).json({
                success: true,
                message: "liked successfully",
                like: likes
            })
        } else {
            let likes = myBlogLike.bloglike
            likes--
            await blogSchema.findOneAndUpdate(myBlogLike._id, { $set: { bloglike: likes } }, { new: true })
            res.status(200).json({
                success: true,
                message: "disliked successfully"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.stack
        })
    }
}

// Update blog by blogID
const editBlogById = async (req, res) => {
    const { blogid } = req.params
    const blogData = await blogSchema.findByIdAndUpdate(blogid, req.body, { new: true })
    try {
        if (blogData) {
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
    const { blogid } = req.params
    const blogData = await blogSchema.findByIdAndDelete(blogid)
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
module.exports = { addBlog, getAllBlogs, likeAndDislike, editBlogById, deleteBlogById }
