// const router = require('express').Router();

// router.use('/api-docs', require('./swagger'));

// router.get('/', (req, res) => { res.send('Hello World!'); });
// router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
//     res.send('Hello World!');
// });

// router.use('/contacts', require('./contacts'));

// module.exports = router;


const express = require('express');
const router = express.Router();

// Import individual route modules
const contactsRoutes = require('./contacts'); // Your contacts API routes
const swaggerRoutes = require('./swagger');  // Swagger documentation route

// Define a simple route for the root path
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World!');
});

// Use other routes
router.use('/contacts', contactsRoutes); // Contacts API endpoints
router.use('/', swaggerRoutes);          // Swagger documentation available at /api-doc

module.exports = router;
