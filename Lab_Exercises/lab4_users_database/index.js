const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UsersRoutes')

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb+srv://mingyang:199537@cluster0.lha4j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(userRouter);

app.listen(8081, () => { console.log('Server is running...') });