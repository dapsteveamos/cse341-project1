const express = require('express');
const router = express.Router();

// Import the contacts controller
const contactsController = require('../controllers/contacts');

// Get all contacts
router.get('/', contactsController.getAll);

// Get a single contact by ID
router.get('/:id', contactsController.getSingle);

// Create a new contact
router.post('/', contactsController.createContact);

// Update an existing contact
router.put('/:id', contactsController.updateContact);

// Delete a contact
router.delete('/:id', contactsController.deleteContact);


// Export the router
module.exports = router;