import React, { useState } from 'react';
import axios from 'axios';
import './CreateForm.css';

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', questionType: 'text', options: [] }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', questionType: 'text', options: [] }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = {
      title: formTitle,
      description: formDescription,
      questions,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/forms', newForm);
      console.log('Form created:', response.data);
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div>
      <h2>Create New Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Form Description"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
        />
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].questionText = e.target.value;
                setQuestions(newQuestions);
              }}
              required
            />
            <select
              value={question.questionType}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].questionType = e.target.value;
                setQuestions(newQuestions);
              }}
            >
              <option value="text">Text</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default CreateForm;
