import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Subject from "../models/subModel.js";
import Mark from "../models/markModel.js";
import Exam from "../models/examModel.js";

// export const saveMark = async (req, res) => {
//   try {
//     const { examId, marks } = req.body;

//     // Fetch the exam based on the provided examId
//     const fetchedExam = await Exam.findOne({ name: examId });

//     if (!fetchedExam) {
//       return res.status(404).json({ message: "Exam not found" });
//     }

//     // Save marks to the database using the ObjectId of the fetched exam
//     const savedMarks = await Mark.create({
//       examId: fetchedExam._id,
//       marks: marks.map((mark) => ({
//         studentId: mark.studentId,
//         testscore: mark.testscore,
//         examscore: mark.examscore,
//         marksObtained: mark.marksObtained,
//         comment: mark.comment,
//       })),
//     });

//     res.status(201).json({ message: "Marks saved successfully", savedMarks });
//   } catch (error) {
//     console.error("Error saving marks:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const saveMark = async (req, res) => {
  try {
    const { examId, className, marks } = req.body;

    // Fetch the exam based on the provided examId
    const fetchedExam = await Exam.findOne({ name: examId });

    if (!fetchedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Save marks to the database using the ObjectId of the fetched exam
    const savedMarks = await Mark.create({
      examId: fetchedExam._id,
      marks: await Promise.all(
        marks.map(async (mark) => {
          const {
            studentId,
            testscore,
            examscore,
            marksObtained,
            comment,
            subjectName,
          } = mark;

          // Ensure subjectId is populated
          const subject = await Subject.findOne({ name: subjectName });

          if (!subject) {
            return res
              .status(404)
              .json({ message: `Subject not found: ${subjectName}` });
          }

          return {
            subjectId: subject._id,
            studentId,
            testscore,
            examscore,
            marksObtained,
            comment,
            subjectName,
          };
        })
      ),
    });

    res.status(201).json({ message: "Marks saved successfully", savedMarks });
  } catch (error) {
    console.error("Error saving marks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMark = async (req, res) => {
  try {
    const { examName } = req.params;

    // Fetch the exam based on the provided examName
    const fetchedExam = await Exam.findOne({ name: examName });

    if (!fetchedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Fetch the marks based on the ObjectId of the fetched exam
    const marks = await Mark.find({ examId: fetchedExam._id });

    if (marks.length === 0) {
      return res.status(404).json({ message: "Marks not found" });
    }

    // Ensure each mark has the subjectId populated
    const scores = marks.map((mark) => ({
      subjectId: mark.subjectId, // Make sure subjectId is set in your schema
      ...mark.toObject(),
    }));

    res.status(200).json({ examId: fetchedExam._id, scores });
  } catch (error) {
    console.error("Error fetching marks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Import necessary modules and models

// export const getMarkbyStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     // Fetch all marks for the given student ID, including the associated exam details
//     const marks = await Mark.find({ "marks.studentId": studentId }).populate(
//       "examId",
//       "name"
//     );

//     if (marks.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "Marks not found for the student" });
//     }

//     // Ensure each mark has the examId and subjectId populated
//     const scores = marks.map((mark) => ({
//       examId: mark.examId, // Make sure examId is set in your schema
//       subjectId: mark.subjectId, // Make sure subjectId is set in your schema
//       examName: mark.examId.name, // Include examName in the response
//       testscore: mark.marks.testscore, // Include testscore in the response
//       // Add other fields as needed
//       ...mark.toObject(),
//     }));

//     res.status(200).json({ studentId, scores });
//   } catch (error) {
//     console.error("Error fetching marks for student:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const getMarkbyStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch all marks for the given student ID, including the associated exam and subject details
    const marks = await Mark.find({ "marks.studentId": studentId })
      .populate("examId", "name")
      .populate("marks.subjectId", "name"); // Specify the path to subjectId

    if (marks.length === 0) {
      return res
        .status(404)
        .json({ message: "Marks not found for the student" });
    }

    // Ensure each mark has the examId and subjectId populated
    const scores = marks.map((mark) => {
      const examName = mark.examId ? mark.examId.name : "N/A";
      const subjectName = mark.marks[0].subjectId
        ? mark.marks[0].subjectId.name
        : "N/A";

      return {
        examId: mark.examId,
        subjectId: mark.marks[0].subjectId,
        examName,
        subjectName,
        testscore: mark.marks[0].testscore,
        // Add other fields as needed
        ...mark.toObject(),
      };
    });

    res.status(200).json({ studentId, scores });
  } catch (error) {
    console.error("Error fetching marks for student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
