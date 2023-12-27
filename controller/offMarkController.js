import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Subject from "../models/subModel.js";
import Mark from "../models/markModel.js";
import Exam from "../models/examModel.js";

export const saveMark = async (req, res) => {
  try {
    const { examId, className, marks } = req.body;

    // Fetch the exam based on the provided examId
    const fetchedExam = await Exam.findById(examId);

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
            return { error: `Subject not found: ${subjectName}` };
          }

          return {
            subjectId: subject._id,
            studentId, // Add studentId to the mark
            testscore,
            examscore,
            marksObtained,
            comment,
            subjectName,
          };
        })
      ),
    });

    // Check for errors in the marks array
    const errorMark = savedMarks.marks.find((mark) => mark.error);
    if (errorMark) {
      return res.status(404).json({ message: errorMark.error });
    }

    res.status(201).json({ message: "Marks saved successfully", savedMarks });
  } catch (error) {
    console.error("Error saving marks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// export const saveMark = async (req, res) => {
//   try {
//     const { examId, className, marks } = req.body;

//     // Fetch the exam based on the provided examId
//     const fetchedExam = await Exam.findOne({ name: examId });

//     if (!fetchedExam) {
//       return res.status(404).json({ message: "Exam not found" });
//     }

//     // Save marks to the database using the ObjectId of the fetched exam
//     const savedMarks = await Mark.create({
//       examId: fetchedExam._id,
//       marks: await Promise.all(
//         marks.map(async (mark) => {
//           const {
//             studentId,
//             testscore,
//             examscore,
//             marksObtained,
//             comment,
//             subjectName,
//           } = mark;

//           // Ensure subjectId is populated
//           const subject = await Subject.findOne({ name: subjectName });

//           if (!subject) {
//             return res
//               .status(404)
//               .json({ message: `Subject not found: ${subjectName}` });
//           }

//           return {
//             subjectId: subject._id,
//             studentId, // Add studentId to the mark
//             testscore,
//             examscore,
//             marksObtained,
//             comment,
//             subjectName,
//           };
//         })
//       ),
//     });

//     res.status(201).json({ message: "Marks saved successfully", savedMarks });
//   } catch (error) {
//     console.error("Error saving marks:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

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
// export const getMarkbyStudent = async (req, res) => {
//   try {
//     const userId = req.params.studentId; // Assuming the studentId is passed as a parameter in the URL

//     // Fetch marks for the specified student and populate the necessary fields
//     const marks = await Mark.find({ "marks.studentId": userId })
//       .populate("examId", "name")
//       .populate("marks.subjectId", "name");

//     // Ensure each mark has the examId and subjectId populated
//     const scores = marks.flatMap((mark) =>
//       mark.marks
//         .filter((m) => m.studentId.toString() === userId)
//         .map((m) => ({
//           examId: mark.examId,
//           subjectId: m.subjectId,
//           examName: mark.examId.name,
//           subjectName: m.subjectId.name,
//           testscore: m.testscore,
//           ...m.toObject(),
//         }))
//     );

//     res.status(200).json({ studentId: userId, scores });
//   } catch (error) {
//     console.error("Error fetching marks for student:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const getMarkbyStudent = async (req, res) => {
  try {
    const userId = req.params.studentId;

    const marks = await Mark.find({ "marks.studentId": userId })
      .populate("examId", "name")
      .populate("marks.subjectId", "name");

    const scores = marks.flatMap((mark) =>
      mark.marks
        .filter(
          (m) =>
            m.studentId.toString() === userId &&
            (m.testscore !== 0 || m.examscore !== 0) &&
            m.comment.trim() !== ""
        )
        .map((m) => ({
          examId: mark.examId,
          subjectId: m.subjectId,
          examName: mark.examId.name,
          subjectName: m.subjectId.name,
          testscore: m.testscore,
          ...m.toObject(),
        }))
    );

    res.status(200).json({ studentId: userId, scores });
  } catch (error) {
    console.error("Error fetching marks for student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getScores = async (req, res) => {
  try {
    const { examId, subjectId } = req.params;

    const isExamIdValid = mongoose.isValidObjectId(examId);
    const isSubjectIdValid = mongoose.isValidObjectId(subjectId);

    if (!isExamIdValid && !isSubjectIdValid) {
      return res.status(400).json({
        message: "Invalid ObjectId format for both examId and subjectId",
      });
    }

    const marks = await Mark.find({
      examId: isExamIdValid ? mongoose.Types.ObjectId(examId) : null,
      "marks.subjectId": isSubjectIdValid
        ? mongoose.Types.ObjectId(subjectId)
        : null,
    });

    if (marks.length === 0) {
      return res.status(404).json({ message: "Marks not found" });
    }

    // Populate the studentId field to get the student details
    await Mark.populate(marks, {
      path: "marks.studentId",
      select: "studentName",
    });

    // Extract relevant information for response
    const scores = marks.flatMap((mark) =>
      mark.marks.map((m) => ({
        studentId: m.studentId,
        studentName: m.studentId ? m.studentId.studentName : null,
        testscore: m.testscore,
        examscore: m.examscore,
        marksObtained: m.testscore + m.examscore,
        comment: m.comment,
      }))
    );

    res.status(200).json({ examId, subjectId, scores });
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateMark = async (req, res) => {
  try {
    const { examId, subjectId, testscore, examscore, marksObtained, comment } =
      req.body;
    const studentIdToUpdate = req.params.studentId;

    const result = await Mark.updateOne(
      {
        "marks.studentId": studentIdToUpdate,
        examId,
        "marks.subjectId": subjectId,
      },
      {
        $set: {
          "marks.$[elem].testscore": testscore,
          "marks.$[elem].examscore": examscore,
          "marks.$[elem].marksObtained": marksObtained,
          "marks.$[elem].comment": comment,
        },
      },
      {
        arrayFilters: [{ "elem.studentId": studentIdToUpdate }],
      }
    );

    console.log("Update Result:", result);
    console.log("Request Body:", req.body);

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ error: "No matching records found for update" });
    }

    const updatedDocument = await Mark.findOne({
      "marks.studentId": studentIdToUpdate,
      examId,
      "marks.subjectId": subjectId,
    });

    res
      .status(200)
      .json({ message: "Marks updated successfully", updatedDocument });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// export const updateMarks = async (req, res) => {
//   try {
//     const { examId, subjectId, updates } = req.body;

//     if (!examId || !subjectId || !updates || !Array.isArray(updates)) {
//       return res.status(400).json({ error: "Invalid request payload" });
//     }

//     const updatePromises = updates.map(async (update) => {
//       const { studentId, testscore, examscore, marksObtained, comment } =
//         update;

//       const result = await Mark.update(
//         {
//           examId,
//           "marks.subjectId": subjectId,
//           "marks.studentId": studentId,
//         },
//         {
//           $set: {
//             "marks.$[elem].testscore": testscore,
//             "marks.$[elem].examscore": examscore,
//             "marks.$[elem].marksObtained": marksObtained,
//             "marks.$[elem].comment": comment,
//           },
//         },
//         { arrayFilters: [{ "elem.studentId": studentId }] }
//       );

//       return {
//         studentId,
//         success: result.nModified > 0,
//       };
//     });

//     const results = await Promise.all(updatePromises);

//     const updatedDocuments = await Mark.find({
//       "marks.studentId": { $in: updates.map((update) => update.studentId) },
//       examId,
//       "marks.subjectId": subjectId,
//     });

//     res.status(200).json({
//       message: "Marks updated successfully",
//       results,
//       updatedDocuments,
//     });
//   } catch (error) {
//     console.error("Error updating marks:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const updateMarks = async (req, res) => {
  try {
    const { examId, subjectId, updates } = req.body;

    if (!examId || !subjectId || !updates || !Array.isArray(updates)) {
      return res.status(400).json({ error: "Invalid request payload" });
    }

    const updatePromises = updates.map(async (update) => {
      const { studentId, testscore, examscore, marksObtained, comment } =
        update;

      const result = await Mark.update(
        {
          examId,
          "marks.subjectId": subjectId,
          "marks.studentId": studentId,
        },
        {
          $set: {
            "marks.$[elem].testscore": testscore,
            "marks.$[elem].examscore": examscore,
            "marks.$[elem].marksObtained": marksObtained,
            "marks.$[elem].comment": comment,
          },
        },
        { arrayFilters: [{ "elem.studentId": studentId }] }
      );

      if (result.nModified === 0) {
        // If no documents were modified, the student doesn't have a mark yet.
        // Check if the document for the student exists, and create a new one if not.
        const studentDocument = await Mark.findOne({
          examId,
          "marks.subjectId": subjectId,
          "marks.studentId": studentId,
        });

        if (!studentDocument) {
          await Mark.update(
            { examId, "marks.subjectId": subjectId },
            {
              $push: {
                marks: {
                  studentId,
                  testscore,
                  examscore,
                  marksObtained,
                  comment,
                },
              },
            }
          );
        }
      }

      return {
        studentId,
        success: true, // Consider it a success, even if no documents were modified.
      };
    });

    const results = await Promise.all(updatePromises);

    const updatedDocuments = await Mark.find({
      "marks.studentId": { $in: updates.map((update) => update.studentId) },
      examId,
      "marks.subjectId": subjectId,
    });

    res.status(200).json({
      message: "Marks updated successfully",
      results,
      updatedDocuments,
    });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
