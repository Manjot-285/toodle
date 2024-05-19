import React, { useState } from 'react';
import styled from 'styled-components';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/Localstorage';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ModuleContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
`;

const Title = styled.h5`
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1.2em;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

const Module = ({ module, courseId, index, moveModule, fetchCourses }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'MODULE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'MODULE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveModule(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleDelete = () => {
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    course.modules = course.modules.filter(mod => mod.id !== module.id);
    saveToLocalStorage('courses', courses);
    fetchCourses();
  };

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(module.title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    const mod = course.modules.find(mod => mod.id === module.id);
    mod.title = title;
    saveToLocalStorage('courses', courses);
    setEditing(false);
    fetchCourses();
  };

  return (
    <ModuleContainer ref={(node) => dragRef(dropRef(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {editing ? (
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Title>{module.title}</Title>
          <ButtonGroup>
            <IconButton onClick={handleEdit}><FaEdit /></IconButton>
            <IconButton onClick={handleDelete}><FaTrash /></IconButton>
          </ButtonGroup>
        </div>
      )}
    </ModuleContainer>
  );
};

export default Module;
