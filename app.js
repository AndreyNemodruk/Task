const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json({ extended: true }));
app.use('/api', require('./routes/contact.routes'));
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(__dirname + '/client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () =>
      console.log(`app has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
