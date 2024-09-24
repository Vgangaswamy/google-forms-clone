const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const FormResponse = require('../models/FormResponse');  

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

// Route to store responses for a form
router.post('/forms/:formId/responses', async (req, res) => {
  const formId = req.params.formId;
  const { answers } = req.body;

  try {
    const response = new FormResponse({
      formId,
      answers,
      submittedAt: new Date(),
    });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'Server error' });
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

// Get all forms with their responses
router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find(); // Fetch all forms

    // Fetch responses for each form
    const formsWithResponses = await Promise.all(
      forms.map(async (form) => {
        const responses = await FormResponse.find({ formId: form._id }); // Fetch responses for this form
        return { ...form._doc, responses };  // Merge form data with responses
      })
    );

    res.status(200).send(formsWithResponses); // Send forms with their responses
  } catch (error) {
    res.status(500).send(error); // Handle errors
  }
});


module.exports = router;
