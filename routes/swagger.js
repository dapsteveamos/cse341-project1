// const router = require('express').Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi, swaggerUi.setup(swaggerDocument));



// module.exports = router;
// const mongodb = require('../data/database');
// const ObjectId = require('mongodb').ObjectId;


// const router = require('express').Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');

// Serve Swagger UI at /api-docs
// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// module.exports = router;


const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Serve Swagger UI at /app-doc
router.use('/app-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
