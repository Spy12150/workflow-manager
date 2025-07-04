import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Task1App from './task1App';
import Task2App from './task2App';

function App() {
  return (
    <Routes>
      <Route path="/task1/*" element={<Task1App />} />
      <Route path="/task2/*" element={<Task2App />} />
      <Route path="*" element={<Navigate to="/task1" />} />
    </Routes>
  );
}

export default App;
