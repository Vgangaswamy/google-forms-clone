import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FormList.css';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null); // Track the selected form for preview
  const [copyMessage, setCopyMessage] = useState(''); // Message for pop-up

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const toggleFormPreview = (formId) => {
    setSelectedFormId((prevFormId) => (prevFormId === formId ? null : formId));
  };

  // Function to copy the sharable link to clipboard
  const copyShareableLink = (formId) => {
    const formLink = `http://localhost:3000/forms/${formId}`;
    navigator.clipboard.writeText(formLink);
    setCopyMessage('Sharable link copied to clipboard');
    
    // Show the pop-up for 2 seconds, then hide it
    setTimeout(() => {
      setCopyMessage('');
    }, 2000);
  };

  // Function to copy the full form details to clipboard
  const copyFullForm = (form) => {
    const formDetails = `
      Title: ${form.title}\n
      Description: ${form.description}\n
      Questions:\n
      ${form.questions.map((question, index) => `
        Q${index + 1}: ${question.questionText}
        Type: ${question.questionType}
        Options: ${question.options.join(', ') || 'N/A'}
      `).join('\n')}
    `;

    navigator.clipboard.writeText(formDetails);
    setCopyMessage('Form details copied to clipboard');
    
    // Show the pop-up for 2 seconds, then hide it
    setTimeout(() => {
      setCopyMessage('');
    }, 2000);
  };

  return (
    <div>
      <h3>Recent Forms</h3>

      {/* Display copy message pop-up */}
      {copyMessage && <div className="copy-message">{copyMessage}</div>}

      <ul className="form-list">
        {forms.length > 0 ? (
          forms.map((form) => (
            <li key={form._id} className="form-item">
              <div
                className="form-header"
                onClick={() => toggleFormPreview(form._id)}
              >
                <h4>{form.title}</h4>
                <p>{form.description}</p>
              </div>

              {/* Conditionally display the form preview if selected */}
              {selectedFormId === form._id && (
                <div className="form-preview">
                  <h5>Form Preview</h5>
                  {form.questions.map((question, index) => (
                    <div key={index} className="form-question">
                      <strong>Q{index + 1}: {question.questionText}</strong>
                      {question.questionType === 'text' && <p>Answer: (Text Input)</p>}
                      {question.questionType === 'multiple-choice' && (
                        <p>Options: {question.options.join(', ')}</p>
                      )}
                      {question.questionType === 'checkbox' && (
                        <p>Options: {question.options.join(', ')}</p>
                      )}
                    </div>
                  ))}

                  {/* Display responses if available */}
                  {form.responses && form.responses.length > 0 ? (
                    <div className="form-responses">
                      <h5>User Responses:</h5>
                      <ul>
                        {form.responses.map((response, index) => (
                          <li key={index}>
                            <strong>Submitted At:</strong> {new Date(response.submittedAt).toLocaleString()}
                            <ul>
                              {Object.keys(response.answers).map((questionId) => (
                                <li key={questionId}>
                                  <strong>Answer:</strong> {response.answers[questionId]}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No responses yet.</p>
                  )}
                </div>
              )}

              {/* Copy and Share buttons */}
              <div className="form-actions">
                <button onClick={() => copyFullForm(form)}>Copy Form</button>
                <button onClick={() => copyShareableLink(form._id)}>Share Link</button>
              </div>
            </li>
          ))
        ) : (
          <p>No recent forms available.</p>
        )}
      </ul>
    </div>
  );
};

export default FormList;
