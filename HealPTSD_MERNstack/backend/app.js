const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')

mongoose.connect('mongodb+srv://ds06630:Ds_2644300@cluster0.jepj9ky.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(cors());

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
//for user routes
app.use('/api', userRoute);
app.use('/api/admin', adminRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`)
});
