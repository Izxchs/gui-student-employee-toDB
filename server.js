const express = require('express');
const mongoose = require('mongoose');
const emps = require('./models/Student');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// DB Connection
mongoose.connect('mongodb://localhost:27017/empdetails', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Connection Failed:', err));

// Routes
app.get('/', async (req, res) => {
  const emp = await emps.find();
  res.render('index', { emps:emp });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', async (req, res) => {
  await emps.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const emp = await emps.findById(req.params.id);
  res.render('edit', { emp });
});

app.post('/update/:id', async (req, res) => {
  await emps.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await emps.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

