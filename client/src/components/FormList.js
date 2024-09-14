import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormList = () => {
  const [forms, setForms] = useState([]);

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

  return (
    <div>
      <h2>Available Forms</h2>
      {forms.length > 0 ? (
        <ul>
          {forms.map((form) => (
            <li key={form._id}>
              <h3>{form.title}</h3>
              <p>{form.description}</p>
              <ul>
                {form.questions.map((question, index) => (
                  <li key={index}>{question.questionText}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No forms available</p>
      )}
    </div>
  );
};

export default FormList;
