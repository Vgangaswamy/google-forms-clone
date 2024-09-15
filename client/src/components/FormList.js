import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FormList.css';

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
      <h3>Recent Forms</h3>
      <ul>
        {forms.length > 0 ? (
          forms.map((form) => (
            <li key={form._id}>
              <h4>{form.title}</h4>
              <p>{form.description}</p>
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
