import mongoose, { Schema, models } from "mongoose";

// Define the User schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    googleId: { type: String, default: null },  
      avatar: { type: String, default: null }, 
    qrCode: { type: String, required: false },
    rinnkuUrl: { type: String, required: false },
    theme: { type: String, default: "light" },
    promoCodeApplied: { type: String, required: false },
    isPremium: { type: Boolean, default: false },
    links: [
      {
        name: String,
        url: String,
        icon: String,
      },
    ],
    refreshToken: { type: String, default: null }, 
    logs: {
      type: [
        {
          country: String,
          page: String,
          createdAt: { type: Date, default: Date.now },
          ip: String,
        },
      ],
      default: [],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Auto-adds `createdAt` and `updatedAt`
);


const User = models.User || mongoose.model("User", UserSchema);
export default User;
