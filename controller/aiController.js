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

import { generateLessonNoteContent } from "../services/lessonNoteService.js";
import LessonNote from "../models/lessonNoteModel.js";
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

// import { generateLessonNote } from "../services/lessonNoteService.js";

// export const generateLessonNoteHandler = async (req, res) => {
//   const { topic, className, subject } = req.body;

//   try {
//     // Generate lesson note using a service
//     const lessonNote = await generateLessonNot(topic, className, subject);

//     if (lessonNote) {
//       res.status(200).json({
//         message: "Lesson note generated successfully",
//         lessonNote,
//       });
//     } else {
//       res.status(400).json({ error: "No lesson note generated" });
//     }
//   } catch (error) {
//     console.error("Error in generateLessonNoteHandler:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while generating the lesson note" });
//   }
// };

export const generateLessonNote = async (req, res) => {
  const {
    topic,
    className,
    subject,
    date,
    session,
    preview, // Add preview flag
  } = req.body;

  try {
    // Generate the lesson note content using the service
    const lessonNoteContent = await generateLessonNoteContent(
      topic,
      className,
      subject
    );

    if (!lessonNoteContent) {
      return res
        .status(400)
        .json({ error: "No lesson note content generated" });
    }

    if (preview) {
      // Return the generated content for preview without saving
      return res.status(200).json({
        message: "Preview generated successfully",
        lessonNoteContent,
      });
    }

    // Create a new LessonNote document if preview is not requested
    const lessonNote = new LessonNote({
      topic,
      className,
      subject,
      date,
      session,
      content: lessonNoteContent,
      createdBy: req.user._id,
    });

    // Save the lesson note to the database
    await lessonNote.save();

    res.status(201).json({
      message: "Lesson note generated and saved successfully",
      lessonNote,
    });
  } catch (error) {
    console.error("Error in generateLessonNote:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the lesson note" });
  }
};
