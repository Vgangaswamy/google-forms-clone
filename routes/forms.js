const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Create a new form
router.post('/forms', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all forms
router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).send(forms);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
