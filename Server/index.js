require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const requireAuth = require('./middleware/requireAuth');

const app = express();
const connectDB = require('./config/db');

// Connect to Database
connectDB();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

const loginRoutes = require('./routes/login');
app.use('/api', loginRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const newsRoutes = require('./routes/newsRoutes');
app.use('/api/news', newsRoutes);

const memberRoutes = require('./routes/memberRoutes');
app.use('/api/members', memberRoutes);
app.listen(5000, () => console.log('Server on http://localhost:5000'));

// add session timeout