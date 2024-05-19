import React, { useState } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/Localstorage';
import styled from 'styled-components';

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
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="link">Link</option>
        <option value="image">Image</option>
        <option value="pdf">PDF</option>
      </select>
      <input type={type === 'text' ? 'text' : 'url'} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Content" />
      <button type="submit">Add Content</button>
    </form>
  );
};

export default ContentForm;
