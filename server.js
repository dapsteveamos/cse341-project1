// const express = require('express');
// const bodyParser = require('body-parser');
// Import the MongoDB connection module

// const mongodb = require('./data/database');
// const app = express();

// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Z-key');

//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });
// app.use('/', require('./routes'));




// mongodb.initDb((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         app.listen(port, () => { console.log(`Database listening and node Running on port ${port}`) });
//     }
// });


const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Import routes
app.use('/', require('./routes'));

// Initialize the database and start the server
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database listening and Node running on port ${port}`);
        });
    }
});





