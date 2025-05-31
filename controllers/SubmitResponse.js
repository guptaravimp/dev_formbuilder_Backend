const Submission = require("../models/submissionSchema")

exports.SubmitResponse = async (req, res) => {
    try {
        const {form,responses}=req.body;
        if(!form ){
            res.status(404).json({
                success:false,
                message:"Form Is missing"
            })
        }
        const NewResponse=await Submission.create({
            form,responses
        })
        console.log("New response of form is ",NewResponse)
        res.status(200).json({
            success:true,
            response:NewResponse
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal Server Error"
        })
    }
}