import  express  from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 3302;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/martialarts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: String,
  email: String,
  pastInjuries: String,
  experience: String,
  height: String,
  weight: String,
  foodAllergies: String,
  medicalProblems: String,
  goals: [String],
});

const Student = mongoose.model('Student', studentSchema);

app.post('/register', async (req, res) => {
  const newStudentData = req.body;

  try {
    const newStudent = await Student.create(newStudentData);
    console.log('New registration:', newStudent);
    res.json({ message: 'Registration successful', user: newStudent });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/cancelRegistration', async (req, res) => {
  const { name } = req.body;

  try {
    const canceledStudent = await Student.findOneAndDelete({ name });
    if (canceledStudent) {
      console.log('Registration canceled:', canceledStudent);
      res.json({ message: 'Registration canceled successfully', user: canceledStudent });
    } else {
      console.log('Student not found for cancellation:', name);
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error canceling registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/registeredStudents', async (req, res) => {
  try {
    const students = await Student.find();
    console.log('Registered students:', students);
    res.json({ students });
  } catch (error) {
    console.error('Error fetching registered students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/registeredCount', async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching registered count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

mongoose.connect('mongodb://localhost:27017/martialarts', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// Create a schema for suggestions
const suggestionSchema = new mongoose.Schema({
  name: String,
  email: String,
  suggestion: String,
  grievance: String,
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// Endpoint for handling suggestion form submissions
app.post('/submitSuggestion', async (req, res) => {
  const { name, email, suggestion, grievance } = req.body;

  try {
    // Save the suggestion to the database
    const newSuggestion = new Suggestion({ name, email, suggestion, grievance });
    await newSuggestion.save();

    // Respond with a success message
    res.json({ message: 'Suggestion submitted successfully', success: true });
  } catch (error) {
    console.error('Error saving suggestion:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});