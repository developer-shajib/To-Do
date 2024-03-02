import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    assignee: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    todo: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Task'
    },
    inProgress: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Task'
    },
    completed: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Task'
    },
    status: {
      type: Boolean,
      default: true
    },
    trash: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Project', projectSchema);
