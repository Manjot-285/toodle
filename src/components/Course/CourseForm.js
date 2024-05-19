import React, { useState } from 'react';
import styled from 'styled-components';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/Localstorage';

const Form = styled.form`
  margin-bottom: 20px;
`;

const Select = styled.select`
  margin-right: 10px;
  padding: 5px;
  font-size: 1em;
`;

const Input = styled.input`
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

const ContentForm = ({ courseId, moduleId, fetchCourses }) => {
  const [type, setType] = useState('text');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    const module = course.modules.find(module => module.id === moduleId);
    const newContent = { id: Date.now(), type, value };
    module.contents.push(newContent);
    saveToLocalStorage('courses', courses);
    fetchCourses();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="link">Link</option>
        <option value="image">Image</option>
        <option value="pdf">PDF</option>
      </Select>
      <Input type={type === 'text' ? 'text' : 'url'} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Content" />
      <Button type="submit">Add Content</Button>
    </Form>
  );
};

export default ContentForm;
