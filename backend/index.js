let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected sucessfully ')
    },
    error => {
        console.log('Could not connected to database : ' + error)
    }
)

// Set up express js port
const bookRoute = require('./routes/book.route')
const index = express();
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({
    extended: false
}));
index.use(cors());
index.use(express.static(path.join(__dirname, 'dist/backend')));
index.use('/', express.static(path.join(__dirname, 'dist/frontend')));
index.use('/api', bookRoute)

// Create port
const port = process.env.PORT || 4000;
const server = index.listen(port, () => {
    console.log('Connected to port ' + port)
})

// error handler
index.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
