const cloudinary = require('cloudinary').v2


function isFiletypeSupported(type, supportedType) {
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const fileType = file.name.split('.').pop().toLowerCase();
    const baseFileName = file.name.split('.').slice(0, -1).join('.');
    const options = {
        folder,
        resource_type: fileType === 'pdf' ? 'raw' : 'auto',
        public_id: fileType === 'image' ? `${baseFileName}_${Date.now()}` : undefined,
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}







exports.FileUpload = async (req, res) => {
    try {
        console.log("Mai to chala hu ");
        console.log("req.files:", req.files);

        if (!req.files || !req.files.Yourfiles) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const file = req.files.Yourfiles;
        console.log(file);

        // Validation
        const supportedType = ["jpg", "pdf", "jpeg"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!isFiletypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "File type is not supported",
            });
        }

        
        const response = await uploadFileToCloudinary(file, "techravibusiness");

        res.json({
            success: true,
            message: "Image uploaded successfully",
            imageUrl: response.secure_url,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


