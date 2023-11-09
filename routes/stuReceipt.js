import express from "express";
import { deleteInv, getInvoiceId, getStudentById, getStudentInvoiceId, getTransactionHistInv } from "../controller/stuController.js";
import studentReceipt from "../models/createStudentReceipt.js";
import { genspecialId } from "../controller/specialId.js";
import User from "../models/userModel.js";


const router = express.Router();


router.post('/receipt/form', async (req, res ) => { 
    // const id = req.params.id
    const values = req.body;
    const {typeOfPayment, reason, studentName, classname, balance, amount, date} = values

    let stuId = '';

    const student = await User.findOne({ username: studentName, role: 'student' }).exec();

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    stuId = student._id;

     const specialId = req.session.user
    // {
    //     "typeOfPayment": "Cash",
    //     "reason": "school fees",
    //     "studentName": "Tunde",
    //     "classname": "jss3",
    //     "balance": 2320000, 
    //     "amount": 145000,
    //     "date": "2023-11-20"
    // }
    
    const invoice = new studentReceipt({
        typeOfPayment,
        reason,
        studentName,
        classname,
        balance,
        amount,
        date,
        stuId,
        specialId
    })

    invoice.save()
    .then((savedInvoice) => {
        res.json({ message: 'Invoice saved successfully', invoice: savedInvoice });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("An error occurred.");
    });
})

router.get('/receipt/invoice/:id', getInvoiceId)

router.get('/receipt/invoice/student/:id', getStudentInvoiceId)
router.get('/receipt/invoice/admin/:id', getTransactionHistInv)

router.delete('/receipt/:id', deleteInv )
  
export default router;