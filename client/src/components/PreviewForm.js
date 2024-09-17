// PreviewForm.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const PreviewForm = () => {
  const location = useLocation();
  const { formTitle, formDescription, questions } = location.state; // Get the form data passed from the CreateForm

  return (
    <div>
      <h2>Form Preview</h2>
      <h3>{formTitle}</h3>
      <p>{formDescription}</p>

      <h4>Questions</h4>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <strong>{question.questionText}</strong>
            <p>Type: {question.questionType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewForm;
