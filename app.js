require('dotenv').config();
const express               = require('express');
const cors                  = require('cors');
const app                   = express();
const { dbConnect_MongoDB } = require('./config/mongo');

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

/**
 * Load automatic files directory './routes'
 */
app.use('/api/0.0.1', require('./app/routes'));

dbConnect_MongoDB();
app.listen(PORT, () => {
    console.log('API ready for port: ', PORT);
});