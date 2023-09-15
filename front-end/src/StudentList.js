import React from 'react';
import Student from './Student'; // Import the Student component

const StudentList = () => {
  const students = [
    { name: 'John Doe', id: '001', enrollmentStatus: 'Enrolled' },
    { name: 'Jane Smith', id: '002', enrollmentStatus: 'Not Enrolled' },
    // Add more students as needed
  ];

  return (
    <div>
      <h2>Student Information</h2>
      {students.map((student, index) => (
        <Student key={index} {...student} />
      ))}
    </div>
  );
};

export default StudentList;
