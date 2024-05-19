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

const TextArea = styled.textarea`
  margin-right: 10px;
  padding: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CourseForm = ({ fetchCourses }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courses = loadFromLocalStorage('courses') || [];
    const newCourse = { id: Date.now(), title, description, modules: [] };
    saveToLocalStorage('courses', [...courses, newCourse]);
    fetchCourses();
    setTitle('');
    setDescription('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" />
      <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course Description" />
      <Button type="submit">Create Course</Button>
    </Form>
  );
};

export default CourseForm;
