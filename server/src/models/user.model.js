const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      //   lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      enum: [
        "ADMIN_ROLE",
        "MANUFACTURER_ROLE",
        "RECYCLER_ROLE",
        "RAGPICKER_ROLE",
        "CITIZEN_ROLE",
      ],
      required: true,
    },
    scans: { type: Number, default: 0 },
    rewards: { type: String, default: "0" }, // stored as string (wei)
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
