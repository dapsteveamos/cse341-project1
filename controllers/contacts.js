const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find();
        const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving contacts' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const userId = new ObjectId(id);
        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: userId });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving the contact' });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        res.status(201).json({ message: 'Contact created successfully', contactId: response.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the contact', error });
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const userId = new ObjectId(id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, contact);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Contact updated successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the contact', error });
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const userId = new ObjectId(id);
        const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found or already deleted' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the contact', error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
