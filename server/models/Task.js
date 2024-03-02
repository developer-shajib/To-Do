import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    assignee: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    category: {
      type: String,
      trim: true
    },
    priority: {
      type: String,
      enum: ['Normal', 'Mid', 'High'],
      default: 'Normal'
    },
    taskStatus: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'],
      default: 'To Do'
    },
    date: {
      type: Date,
      trim: true
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

export default mongoose.model('Task', taskSchema);
