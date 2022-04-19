const express = require('express');

const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/users', usersRouter);

app.listen(3333, () => {
  console.log('Server running on port http://localhost:3333')
});