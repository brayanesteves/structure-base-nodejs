require('dotenv').config();
const dotenv                = require('dotenv');
const express               = require('express');
const cors                  = require('cors');
const app                   = express();
const path                  = require('path');
const { dbConnect_MongoDB } = require('./config/mongo');
const cookieParser          = require('cookie-parser');

const PORT = process.env.PORT || 3000;
/**
 * Template
 */
app.set('view engine', 'ejs');
app.use(express.static('app'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

dotenv.config({ path: './env/.env' })
// Cookies
//app.use(cookieParser);


/**
 * Load automatic files directory './routes'
 */
app.use('/api/0.0.1', require('./app/routes'));

// Call 'views'
app.set('views','./app/views');
app.use('/', require('./app/routes/views'));

switch(process.env.SWITCH_DB) {
    case "mongodb":
        dbConnect_MongoDB();
        break;
    
    case "mysql":
        break;
    
    default:
        break;
}

app.listen(PORT, () => {
    console.log('API ready for port: ', PORT);
});