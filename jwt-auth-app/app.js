const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

//Routes
const signupRoutes = require('./routes/signup.js');
const loginRoutes = require('./routes/login.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth/signup', signupRoutes);

app.use('/auth/login', loginRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
