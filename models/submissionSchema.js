const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true
  },
  responses: [
    {
      stepId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Step",
      },
      answer: mongoose.Schema.Types.Mixed  // flexible: can be string, number, array, object etc.
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Submission", submissionSchema);
