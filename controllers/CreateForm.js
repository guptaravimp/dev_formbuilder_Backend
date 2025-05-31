const Form = require("../models/formSchema")
const { v4: uuidv4 } = require("uuid");
exports.CreateForm = async (req, res) => {
    try {

        const { image, title, description, steps, mode,status, theme } = req.body || {};
        // console.log(req.body)
        const slug = uuidv4();
        const publicUrl = `https://dev-form-builder-2.vercel.app/form/${slug}`;
        const newFormData = await Form.create({
            //    image,title, description,steps,mode,theme
            image,
            title,
            description,
            steps,
            mode,
            theme,
            status,
            slug,
            PublicUrl: publicUrl,
        })
        console.log("COntroller ko call aaya hai ")
        console.log(newFormData)
        return res.status(200).json({
            success: true,
            message: "New form created successfully",
            data: newFormData,
            publicLink: publicUrl,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}





exports.UpdateForm = async (req, res) => {
  try {
   
     console.log("Ravi Muskan")
    const { formId, image, title, description, steps, mode, theme,status,PublicUrl } = req.body;
 console.log("✅ UpdateForm controller hit with formId:", formId);
    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID is required",
      });
    }

    const existingForm = await Form.findById(formId);
    if (!existingForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    const updateData = {
      image,
      title,
      description,
      steps,
      PublicUrl,
      mode,
      theme,
      status,
      updatedAt: new Date(),
    };

    // if (!existingForm.PublicUrl) {
      const newSlug = uuidv4();
      updateData.slug = newSlug;
      updateData.PublicUrl = `https://dev-form-builder-2.vercel.app/form/${formId}`;
    // }

    const updatedForm = await Form.findByIdAndUpdate(formId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Form updated successfully",
      data: updatedForm,
      publicLink: updatedForm.PublicUrl,
    });
  } catch (error) {
    console.error("Error updating form:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



exports.GetFormData=async(req,res)=>{
  try{
    console.log("Call aayi hai Bhaiya  ")
    
    const {formId}=req.body;
     console.log("form id is  ",formId)
    const formData=await Form.findById(formId).populate("steps");;
    console.log(formData)
    if (!formData) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }
    res.status(200).json({
      success:true,
      data:formData
    })

  }catch(error){
    res.status(500).json({
      success:false,
      message:"internal Server Error"
    })
  }
}



