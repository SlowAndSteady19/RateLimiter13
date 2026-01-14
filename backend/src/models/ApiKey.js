import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    rateLimit: {
      type: Number,
      default: 10
    }
  },
  {
    timestamps: true
  }
);

const ApiKey = mongoose.model("ApiKey", apiKeySchema);

export default ApiKey;
