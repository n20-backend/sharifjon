const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
});

router.post('/', (req, res) => {
    const newUser = req.body;
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
});

module.exports = router;