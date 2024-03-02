import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      trim: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
