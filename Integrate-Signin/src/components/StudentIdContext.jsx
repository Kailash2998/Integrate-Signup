import React, { createContext, useState } from 'react';

export const StudentIdContext = createContext();

const StudentIdProvider = ({ children }) => {
  const [studentIdExists, setStudentIdExists] = useState(false);

  return (
    <StudentIdContext.Provider value={{ studentIdExists, setStudentIdExists }}>
      {children}
    </StudentIdContext.Provider>
  );
};

export default StudentIdProvider;
