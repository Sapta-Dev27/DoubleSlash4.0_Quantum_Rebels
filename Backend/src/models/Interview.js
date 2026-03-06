import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        resumeURL: {
            type: String,
            required: true,
        },
        rounds: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            enum: ["Generated", "In Progress", "Not Completed"],
            default: "Not Completed"
        }
    },
    { timestamps: true }

)


const InterviewModel = mongoose.model("Interview", interviewSchema);

export default InterviewModel;


