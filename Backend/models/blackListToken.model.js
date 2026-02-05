import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createAt : {
      type: Date,
      default: Date.now,
      expires: 86400, // 24 hours in seconds     
    }
  },
  { timestamps: true }
);

export default mongoose.model("BlackListToken", blackListTokenSchema);

