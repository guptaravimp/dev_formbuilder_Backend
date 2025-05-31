const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "https://res.cloudinary.com/dx0ooqk4w/image/upload/v1748348871/hypergrobanner_vase7v.jpg"
  },
  title: {
    type: String,
    default: "Untitled"
  },
  PublicUrl: {
    type: String,
    default: null
  },

  description: {
    type: String,
    default:"Form Description"
  },
  steps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Step"  // ✅ must match model name, not schema variable name
  }],
  mode: {
    type: String,
    enum: ['desktop', 'tablet', 'mobile'],
    default: 'desktop'
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'dark'
  },
  status:{
    type:String,
    enum:['published','draft'],
    default:'draft'
  },
 
  slug: {
    type: String,
    unique: true,
    default: () => uuidv4(),  // or generate a slug from title if you prefer
  },
},{ timestamps: true });

module.exports = mongoose.model("Form", formSchema);  // ✅ Better to name model "Form"
