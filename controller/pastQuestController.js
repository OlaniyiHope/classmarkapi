import multer from "multer"; // Import Multer for handling file uploads
import XLSX from "xlsx"; // Import the XLSX library for reading Excel files
import pastQuests from "../models/pastQuests.js"; // Import the pastQuests model

const upload = multer({ dest: 'uploads/' }); // Configure Multer to save uploaded files in the 'uploads/' directory

// Controller function for uploading and processing the Excel file
export const addPastQuestions = async (req, res) => {
  try {
    const file = req.file; // Get the uploaded file from the request

    if (!file) { // Check if a file was uploaded
      return res.status(400).send("No file uploaded."); // Send a 400 response if no file was uploaded
    }

    // Use XLSX to read the file
    const workbook = XLSX.readFile(file.path); // Read the uploaded Excel file
    const sheet_name_list = workbook.SheetNames; // Get the names of the sheets in the workbook
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); // Convert the first sheet to JSON

    // Transform the data into the format expected by your MongoDB model
    const subjects = {}; // Create an object to hold subjects

    // Collect existing records for comparison
    const existingQuestions = await pastQuests.find().lean(); // Get existing questions from the database

    // Convert existing questions to a lookup for faster checks
    const existingLookup = {};
    existingQuestions.forEach(subject => {
      subject.subSubjects.forEach(sub => {
        sub.questions.forEach(question => {
          existingLookup[`${subject.subjectName}_${sub.title}_${question.title}`] = true; // Create a unique key for each question
        });
      });
    });

    jsonData.forEach(row => { // Loop through each row in the JSON data
      const { subjectName, class: className, subSubjectTitle, questionTitle, options, correctAnswer } = row; // Destructure the row to get fields

      // Skip duplicates
      const questionKey = `${subjectName}_${subSubjectTitle}_${questionTitle}`; // Create a unique key for the current question
      if (existingLookup[questionKey]) {
        console.log(`Duplicate question skipped: ${questionKey}`);
        return; // Skip if this question already exists
      }

      // Initialize the subject if it doesn't exist
      if (!subjects[subjectName]) {
        subjects[subjectName] = { subjectName, class: className, subSubjects: [] }; // Create a new subject object including class
      } else {
        subjects[subjectName].class = className; // Update class if subject already exists
      }

      // Find the sub-subject if it exists, otherwise create it
      let subSubject = subjects[subjectName].subSubjects.find(sub => sub.title === subSubjectTitle);
      if (!subSubject) { // If sub-subject doesn't exist
        subSubject = { title: subSubjectTitle, questions: [] }; // Create a new sub-subject
        subjects[subjectName].subSubjects.push(subSubject); // Add sub-subject to the subject
      }

      // Add the question to the sub-subject
      subSubject.questions.push({
        title: questionTitle,
        options: options.split(','), // Split options by commas to create an array
        correctAnswer
      });
    });

    // Convert subjects object into an array for bulk insertion
    const pathQuestions = Object.values(subjects); // Convert the subjects object to an array for MongoDB insertion

    // Insert into MongoDB
    await pastQuests.insertMany(pathQuestions); // Insert the formatted data into the MongoDB collection

    res.send("Data successfully uploaded and inserted into the database!"); // Send a success response
  } catch (error) { // Catch any errors
    console.error("Error:", error); // Log the error
    res.status(500).send("Error processing the file"); // Send a 500 response if an error occurs
  }
};

// Controller function to view past questions
export const viewPastQuests = async (req, res) => {
  try {
    const questions = await pastQuests.find(); // Retrieve all past questions from the database
    res.json(questions); // Return the questions in JSON format
  } catch (error) {
    console.error("Error:", error); // Log the error
    res.status(500).send("Error retrieving questions"); // Send a 500 response if an error occurs
  }
};
