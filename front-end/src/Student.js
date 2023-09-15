import React from 'react';

const Student = ({ name, id, enrollmentStatus }) => {
  return (
    <div>
      <h3>Name: {name}</h3>
      <p>Student ID: {id}</p>
      <p>Enrollment Status: {enrollmentStatus}</p>
    </div>
  );
};

export default Student;
