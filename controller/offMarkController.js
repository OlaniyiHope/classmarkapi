import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

import Mark from "../models/markModel.js";
import Exam from "../models/examModel.js";

// export const saveMark = async (req, res) => {
//   try {
//     const { examId, marks } = req.body;

//     // Perform any additional validation if needed

//     // Save marks to the database
//     const savedMarks = [];

//     for (const mark of marks) {
//       const { studentId, examscore, marksObtained, comment } = mark;

//       const newMark = await Mark.create({
//         examId,
//         marks: {
//           studentId,
//           examscore,
//           marksObtained,
//           comment,
//         },
//       });

//       savedMarks.push(newMark);
//     }

//     res.status(201).json({ message: "Marks saved successfully", savedMarks });
//   } catch (error) {
//     console.error("Error saving marks:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const saveMark = async (req, res) => {
  try {
    const { examId, marks } = req.body;

    // Perform any additional validation if needed

    // Save marks to the database
    const savedMarks = await Mark.create({
      examId,
      marks: marks.map((mark) => ({
        studentId: mark.studentId,
        examscore: mark.examscore,
        marksObtained: mark.marksObtained,
        comment: mark.comment,
      })),
    });

    res.status(201).json({ message: "Marks saved successfully", savedMarks });
  } catch (error) {
    console.error("Error saving marks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getMark = async (req, res) => {
//   try {
//     const { examId } = req.params;

//     console.log("Received examId:", examId);

//     // Convert examId string to ObjectId
//     const examObjectId = ObjectId(examId);

//     // Fetch the exam based on the ObjectId
//     const fetchedExam = await Exam.findById(examObjectId);

//     console.log("Fetched exam:", fetchedExam);

//     if (!fetchedExam) {
//       console.log("Exam not found");
//       return res.status(404).json({ message: "Exam not found" });
//     }

//     // Fetch marks based on the ObjectId
//     const marks = await Mark.find({ examId: examObjectId });

//     console.log("Fetched marks:", marks);

//     // Process marks and send the response
//     // ...
//   } catch (error) {
//     console.error("Error fetching marks:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const getMark = async (req, res) => {
  try {
    const { examId } = req.params;

    console.log("Received examId:", examId);

    // Fetch the exam based on the examId string
    const fetchedExam = await Exam.findById(examId);

    console.log("Fetched exam:", fetchedExam);

    if (!fetchedExam) {
      console.log("Exam not found");
      return res.status(404).json({ message: "Exam not found" });
    }

    // Populate the marks from the referenced Exam document
    await fetchedExam.populate("marks").execPopulate();

    console.log("Fetched marks:", fetchedExam.marks);

    // Process marks and send the response
    // ...

    res.status(200).json({ exam: fetchedExam, scores: fetchedExam.marks });
  } catch (error) {
    console.error("Error fetching marks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
