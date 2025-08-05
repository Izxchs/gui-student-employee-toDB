const express = require('express');
const mongoose = require('mongoose');
const app = express();
const studentRoute = require('./routes/studentRoute');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/students', studentRoute);
mongoose.connect('mongodb://localhost:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
