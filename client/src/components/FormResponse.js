import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './formResponse.css';

const FormResponse = () => {
  const { formId } = useParams(); // Extract formId from the URL
  const [form, setForm] = useState(null); // Store the form data
  const [answers, setAnswers] = useState({}); // Store the user's answers

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
        setForm(response.data); // Set the form data
        console.log('Fetched form:', response.data); // Log the fetched form
      } catch (error) {
        console.error('Error fetching form:', error); // Log any errors
      }
    };

    if (formId) {
      fetchForm(); 
    }
  }, [formId]); 

  
  const handleInputChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/forms/${formId}/responses`, { answers });
      alert('Responses submitted successfully');
    } catch (error) {
      console.error('Error submitting responses:', error); // Log any errors during submission
    }
  };

  // Display loading message while the form is being fetched
  if (!form) return <div>Loading form...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.title}</h2>
      <p>{form.description}</p>
      {form.questions.map((question) => (
        <div key={question._id} className="question-block">
          <label>{question.questionText}</label>

          {/* Handle different input types based on the question type */}
          {question.questionType === 'text' && (
            <input
              type="text"
              placeholder="Your answer"
              onChange={(e) => handleInputChange(question._id, e.target.value)}
            />
          )}

          {question.questionType === 'multiple-choice' && (
            <div className="multiple-choice-options">
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={option}
                    onChange={(e) => handleInputChange(question._id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {question.questionType === 'checkbox' && (
            <div className="checkbox-options">
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name={`question-${question._id}`}
                    value={option}
                    onChange={(e) => {
                      const updatedAnswers = answers[question._id] || [];
                      if (e.target.checked) {
                        updatedAnswers.push(option); // Add option if checked
                      } else {
                        const optionIndex = updatedAnswers.indexOf(option);
                        updatedAnswers.splice(optionIndex, 1); // Remove option if unchecked
                      }
                      handleInputChange(question._id, updatedAnswers);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {/* Add other question types as needed */}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormResponse;
