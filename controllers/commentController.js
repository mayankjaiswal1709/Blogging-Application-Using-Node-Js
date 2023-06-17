const commentSchema = require('../models/commentsSchema')

// add comment API
const addComment = async (req, res) => {
    try {
        const commentData = new commentSchema(req.body)
            if (commentData !="") {
            await commentData.save()
            return res.status(200).json({
                success: true,
                message: "comment added successfully",
                data: commentData
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "no data added"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: err.stack,
        });
    }


}

// view all comments
const getAllComment = async (req, res) => {
    const commentData = await commentSchema.find()
    try {
        if (commentData != "") {
            return res.status(200).json({
                success: true,
                commentData: commentData,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "nothing found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

//Update comment by commentID
const editCommentById = async (req, res) => {
    const { commentId } = req.params
    try {
        const commentData = await commentSchema.findByIdAndUpdate(commentId, req.body)
        if (commentData != "") {
            await commentData.save()
            return res.status(200).json({
                success: true,
                message: "comments updated successfully",
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "commentId not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Delete comment by commentID
const deleteCommentById = async (req, res) => {
    const commentData = await commentSchema.findByIdAndDelete(req.params.id)
    try {
        if (commentData !== null) {
            res.status(202).json({
                success: true,
                message: "comment delete successfully"
            })
        } else {
            res.status(401).json({
                success: false,
                message: "commentId not found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { addComment, getAllComment, editCommentById, deleteCommentById }
