import React, { useState } from 'react';
import axios from 'axios';
import './CreateForm.css';
import { useNavigate } from 'react-router-dom';

import previewIcon from './Icons/preview-icon.jpg';
import shareIcon from './Icons/share-icon.jpg';
import undoIcon from './Icons/undo-icon.jpg';
import redoIcon from './Icons/redo-icon.jpg';

const CreateForm = () => {
  const navigate = useNavigate(); 
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', questionType: 'text', options: [] }]);
  const [newOption, setNewOption] = useState(''); // To handle adding options
  const [shareableLink, setShareableLink] = useState('');
  const [undoStack, setUndoStack] = useState([]); // Stack for undo
  const [redoStack, setRedoStack] = useState([]); // Stack for redo
  
  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', questionType: 'text', options: [] }]);
    setUndoStack([...undoStack, questions]); // Add to undo stack
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push(newOption);
    setQuestions(newQuestions);
    setNewOption(''); // Clear option input field
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack.pop();
      setRedoStack([...redoStack, questions]); // Save current state for redo
      setQuestions(lastState);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastRedoState = redoStack.pop();
      setUndoStack([...undoStack, questions]); // Save current state to undo
      setQuestions(lastRedoState);
    }
  };

  const handlePreview = () => {
    navigate('/preview', {
      state: { formTitle, formDescription, questions },
    });
  };

  const handleShare = () => {
    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink);
      alert('Shareable link copied to clipboard');
    } else {
      alert('Create the form first to generate a shareable link.');
    }
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
      const formId = response.data._id;
      const shareLink = `http://localhost:3000/forms/${formId}`;
      setShareableLink(shareLink);
      alert(`Form created successfully! Shareable link: ${shareLink}`);
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div>
      <div className="form-actions">
        <button className="preview-btn" onClick={handlePreview}>
          <img src={previewIcon} alt="Preview" title="Preview" />
        </button>
        <button onClick={handleShare}>
          <img src={shareIcon} alt="Share" title="Share" />
        </button>
        <button onClick={handleUndo} disabled={undoStack.length === 0}>
          <img src={undoIcon} alt="Undo" title="Undo" />
        </button>
        <button onClick={handleRedo} disabled={redoStack.length === 0}>
          <img src={redoIcon} alt="Redo" title="Redo" />
        </button>
      </div>

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
            
            {/* Add input for options for multiple-choice and checkbox */}
            {question.questionType !== 'text' && (
              <div>
                <input
                  type="text"
                  placeholder="Add option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <button type="button" onClick={() => handleAddOption(index)}>Add Option</button>
                
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Create Form</button>
      </form>

      {shareableLink && (
        <div>
          <h4>Shareable Link:</h4>
          <p>{shareableLink}</p>
          <button onClick={handleShare}>Copy Link to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
