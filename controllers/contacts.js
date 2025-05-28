const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray()
        .then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        })

}

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); // Convert the ID from the request
        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: userId }); // Use `findOne` for a single document
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result); // Return the single contact
        } else {
            res.status(404).json({ message: 'Contact not found' }); // Handle not found
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving contact' }); // Handle errors
    }
};




// Uncomment the following code if you want to implement the getSingle function using find
// but it is not recommended for single document retrieval
// const getSingle = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
//     result.toArray()
//         .then((contacts) => {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(contacts(0));
//         })
    // .catch(() => {
    //     res.status(500).json({ message: 'Error retrieving contacts' });
    // });

// };

module.exports = {
    getAll,
    getSingle
};