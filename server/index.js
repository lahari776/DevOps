const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, sequelize } = require('./models/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, event } = req.body;
    console.log('Registration data received:', { name, email, phone, event });

    const user = await User.create({ name, email, phone, event });

    console.log('User created:', user.toJSON());

    res.json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: 'Error during registration',
      error: err.message,
      stack: err.stack
    });
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected.');

    // Sync database tables (alter true to update columns)
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    app.listen(4000, () => {
      console.log('Server running on http://localhost:4000');
    });
  } catch (err) {
    console.error('DB connection or sync error:', err);
  }
})();
