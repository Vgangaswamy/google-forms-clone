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

// Route to fetch form by ID
router.get('/forms/:formId', async (req, res) => {
  const formId = req.params.formId;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).send('Form not found');
    }
    res.json(form);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Route to update a form by ID
router.put('/forms/:formId', async (req, res) => {
  const formId = req.params.formId;
  try {
    const updatedForm = await Form.findByIdAndUpdate(formId, req.body, { new: true });
    if (!updatedForm) {
      return res.status(404).send('Form not found');
    }
    res.json(updatedForm);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Route to delete a form by ID
router.delete('/forms/:formId', async (req, res) => {
  const formId = req.params.formId;
  try {
    const deletedForm = await Form.findByIdAndDelete(formId);
    if (!deletedForm) {
      return res.status(404).send('Form not found');
    }
    res.json({ message: 'Form deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
