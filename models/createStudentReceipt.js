import mongoose from 'mongoose'
const studentReceiptSchema = mongoose.Schema(
  {
    typeOfPayment: {
      type: String,
      enum: ['Cash', 'Transfer', 'Cheque'],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    stuId: {
        type: String,
        required:true
    },
    specialId: {
        type: String,
        required:true
    }
  },
  {
    timestamps: true,
  }
)

const studentReceipt = mongoose.model('studentReceipt', studentReceiptSchema)
export default studentReceipt