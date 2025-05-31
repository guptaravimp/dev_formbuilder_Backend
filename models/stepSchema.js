const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true
  },

  label: {
    type: String,
    default: "Add label"
  },
  type: {
    type: String,
    enum: ['text', 'textarea', 'radio', 'checkbox', 'date', 'file'],
    default: "radio"
  },
  placeholder: String,
  required: { type: Boolean, default: false },
  options: [String],
  
  validation: {
    minLength: Number,
    maxLength: Number,
    pattern: String
  },
  defaultValue: mongoose.Schema.Types.Mixed,
  order: { type: Number, default: 0 },
  helpText: String
});


module.exports = mongoose.model("Step", stepSchema);
