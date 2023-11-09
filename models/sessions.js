import mongoose from 'mongoose'
const sessionsSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

const sessions = mongoose.model('sessions', sessionsSchema)
export default sessions