const stepSchema = require("../models/stepSchema");
const formSchema = require("../models/formSchema");

exports.CreateSteps = async (req, res) => {
  // console.log("form id aaaya hai ",formId)
  try {
    const { formId, label, type, Placeholder, required, options, validation } = req.body;
    console.log("form id aaaya hai ", formId);
    // Create step
    console.log(formId)
    const newStepdata = await stepSchema.create({
      formId,
      label,
      type,
      Placeholder,
      required,
      options,
      validation
    });

    // Add step ID to the form's steps array
    await formSchema.findByIdAndUpdate(
      formId,
      {
        $push: {
          steps: newStepdata._id
        }
      },
      { new: true }
    );
    // console.log(newStepdata)
    res.status(200).json({
      success: true,
      message: "Step created and added to form successfully",
      data: newStepdata
    });

  } catch (error) {
    console.error("CreateSteps error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



exports.updateStep = async (req, res) => {
  try {
    const { stepId, label, type, Placeholder, required, options, validation } = req.body;

    if (!stepId) {
      return res.status(400).json({
        success: false,
        message: "Step ID is required for update",
      });
    }

    const updatedStep = await stepSchema.findByIdAndUpdate(
      stepId,
      {
        label,
        type,
        Placeholder,
        required,
        options,
        validation,
      },
      { new: true, runValidators: true }
    );

    if (!updatedStep) {
      return res.status(404).json({
        success: false,
        message: "Step not found",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Step updated successfully",
      data: updatedStep,
    });

  } catch (error) {
    console.error("Update step error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
