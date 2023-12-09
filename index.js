 import express from 'express';
 import bodyParser from 'body-parser';
 import cors from 'cors';

// const app = express();

// app.use(express.json());

// app.get("/",(request,response)=>{
//         response.send("Hello welcome to base url")
// });

// app.get("/login",(request,response)=>{
//     response.send("Hello welcome to login")
// });

// app.get("/sum/:a/:b",(request,response)=>{
//     var x=parseInt(request.params.a);
//     var y=parseInt(request.params.b);
//     var z=x+y;
//     response.send({sum:z});
// });

// app.post("/add",(request,response)=>{
//     var a=request.body.x;
//     var b=request.body.y;
//     var c =a+b;
//     response.send({sum:c});
// });



// app.listen(5490,()=>{
//     console.log("Server has Started")
// });




const app = express();
const port = 3385;

app.use(bodyParser.json());
app.use(cors());

const registeredUsers = [];

app.post('/register', (req, res) => {
  const {
    name,
    age,
    email,
    pastInjuries,
    experience,
    height,
    weight,
    foodAllergies,
    medicalProblems,
    goals,
  } = req.body;

  

  // Basic validation
  if (!name ) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match.' });
//   }

  // Check if the email is already registered
//   if (users.some(user => user.email === email)) {
//     return res.status(400).json({ message: 'Email is already registered.' });
//   }

  const newUser = {
    name,
    age,
    email,
    pastInjuries,
    experience,
    height,
    weight,
    foodAllergies,
    medicalProblems,
    goals,
  };
  registeredUsers.push(newUser);

  res.status(201).json({ message: 'User registered successfully.', registeredUsers: newUser });
});

app.post('/register', (req, res) => {
    const { name } = req.body;
  
    // Find the user by name and remove them from the registeredUsers array
    const userIndex = registeredUsers.findIndex(user => user.name === name);
  
    if (userIndex !== -1) {
      const canceledUser = registeredUsers.splice(userIndex, 1)[0]; // Remove the user and get the removed user
      res.json({ message: 'Registration canceled successfully.', canceledUser });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});