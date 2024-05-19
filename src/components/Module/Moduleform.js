import React, { useState } from 'react';
import styled from 'styled-components';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/Localstorage';

const Form = styled.form`
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ModuleForm = ({ courseId, fetchCourses }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    const newModule = { id: Date.now(), title, contents: [] };
    course.modules.push(newModule);
    saveToLocalStorage('courses', courses);
    fetchCourses();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module Title" />
      <Button type="submit">Create Module</Button>
    </Form>
  );
};

export default ModuleForm;
