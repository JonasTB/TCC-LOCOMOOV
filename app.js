const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db')
const seed = require('./src/util/seeds')
require('dotenv').config;

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 3000

//connect with database
connectDB();

//seed super admin
seed.defaultAdmin();

// open connections
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.all('*', require('./src/routes/index'));

// test routes
app.get('/', (req, res) => {
    return res.send('OK! Application running.');
});

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`)});