const Form = require("../models/formSchema")

exports.GetAllForms = async (req, res) => {
  try {
    const allForms = await Form.find().populate("steps"); 
    res.status(200).json({
      success: true,
      message: "All forms fetched successfully",
      data: allForms
    });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
