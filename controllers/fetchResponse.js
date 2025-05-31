const Submission = require("../models/submissionSchema")

exports.fetchResponse = async (req, res) => {
    try {
        // 
        console.log("call aaya hai ")
        const formId = req.query.formId;

        console.log("form id aaya hai abhi ",formId)
        if (!formId) {
            return res.status(400).json({
                success: false,
                message: "formId is required",
            });
        }
        
        const responses = await Submission.find({ form: formId })
            .populate({
                path: "form",
                populate: {
                    path: "steps",  // populate steps inside the form
                    model: "Step",
                },
            })
            .populate({
                path: "responses.stepId", // populate stepId in each response
                model: "Step",
            });
        // const steps=response
        // const responseArray=response.populate("responses");
        // const responseArray = response.populate("responses");
        // console.log("Poupulated response",response)
        console.log("Populated response", responses)
        // if (!response) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Form not found",
        //     });
        // }
        res.status(200).json({
            success: true,
            data: responses,
            // steps:steps,
            // responseArray:responseArray
            // responseArray: responseArray

        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal Server Error"
        })
    }
}