// import ExamQuestion from "../models/examQuestionModel.js";
// import { generateQuestions } from "../services/questionService.js";
// export const generateQuestion = async (req, res) => {
//   const {
//     title, // Title for the exam
//     className, // Class name for the exam
//     topic,
//     difficulty,
//     numberOfQuestions,
//     date,
//     subject,
//     fromTime,
//     toTime,
//     percent,
//     instruction,
//     session,
//   } = req.body; // Destructure all necessary fields from the request body

//   try {
//     // Generate questions using the generateQuestions function
//     const generatedQuestions = await generateQuestions(
//       topic,
//       difficulty,
//       numberOfQuestions
//     );

//     if (generatedQuestions && generatedQuestions.length > 0) {
//       // Create a new ExamQuestion document with data from the request body
//       const examQuestion = new ExamQuestion({
//         title, // Title from request body
//         className, // Class name from request body
//         topic, // Topic from request body
//         difficulty, // Difficulty from request body
//         date, // Date from request body
//         subject, // From time from request body
//         fromTime, // From time from request body
//         toTime, // To time from request body
//         percent, // Percentage from request body
//         instruction, // Instruction from request body
//         session, // Session from request body
//         questions: generatedQuestions.map((q) => ({
//           questionText: q.questionText || q, // Assuming q is an object with a questionText property
//           questionType: q.questionType || "short-answer", // Default to short-answer if not provided
//           options: q.options || [], // Include options if applicable
//           correctAnswer: q.correctAnswer || "", // Optional for tracking correct answers
//         })),
//         createdBy: req.user._id, // Assuming user info is from auth middleware
//       });

//       // Save the exam questions to the database
//       await examQuestion.save();

//       // Respond with the created exam question document
//       res.status(201).json({
//         message: "Exam questions generated and saved successfully",
//         examQuestion,
//       });
//     } else {
//       res.status(400).json({ error: "No questions generated" });
//     }
//   } catch (error) {
//     console.error("Error in generateQuestion:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while generating questions" });
//   }
// };

import ExamQuestion from "../models/examQuestionModel.js";
import { generateQuestions } from "../services/questionService.js";

export const generateQuestion = async (req, res) => {
  const {
    title,
    className,
    topic,
    difficulty,
    numberOfQuestions,
    date,
    subject,
    fromTime,
    toTime,
    percent,
    instruction,
    session,
    preview, // Add preview flag
  } = req.body;

  try {
    // Generate questions using the generateQuestions function
    const generatedQuestions = await generateQuestions(
      topic,
      difficulty,
      numberOfQuestions
    );

    if (generatedQuestions && generatedQuestions.length > 0) {
      if (preview) {
        // Return the generated questions for preview without saving
        return res.status(200).json({
          message: "Preview generated successfully",
          questions: generatedQuestions,
        });
      } else {
        // Proceed with creating a new ExamQuestion document if preview is not requested
        const examQuestion = new ExamQuestion({
          title,
          className,
          topic,
          difficulty,
          date,
          subject,
          fromTime,
          toTime,
          percent,
          instruction,
          session,
          questions: generatedQuestions.map((q) => ({
            questionText: q.questionText || q,
            questionType: q.questionType || "short-answer",
            options: q.options || [],
            correctAnswer: q.correctAnswer || "",
          })),
          createdBy: req.user._id,
        });

        // Save the exam questions to the database
        await examQuestion.save();

        // Respond with the created exam question document
        res.status(201).json({
          message: "Exam questions generated and saved successfully",
          examQuestion,
        });
      }
    } else {
      res.status(400).json({ error: "No questions generated" });
    }
  } catch (error) {
    console.error("Error in generateQuestion:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating questions" });
  }
};
