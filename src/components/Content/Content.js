import React, { useState } from 'react';
import styled from 'styled-components';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/Localstorage';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ContentContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const ContentText = styled.p`
  margin: 0;
`;

const ContentLink = styled.a`
  margin: 0;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

const ContentImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ContentPDF = styled.a`
  margin: 0;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
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

const Content = ({ content, moduleId, courseId, index, moveContent, fetchCourses }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CONTENT',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CONTENT',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveContent(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleDelete = () => {
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    const module = course.modules.find(module => module.id === moduleId);
    module.contents = module.contents.filter(cont => cont.id !== content.id);
    saveToLocalStorage('courses', courses);
    fetchCourses();
  };

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content.value);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    const module = course.modules.find(module => module.id === moduleId);
    const cont = module.contents.find(cont => cont.id === content.id);
    cont.value = value;
    saveToLocalStorage('courses', courses);
    setEditing(false);
    fetchCourses();
  };

  return (
    <ContentContainer ref={(node) => dragRef(dropRef(node))} isDragging={isDragging}>
      {editing ? (
        <div>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {content.type === 'text' && <ContentText>{content.value}</ContentText>}
          {content.type === 'link' && <ContentLink href={content.value}>{content.value}</ContentLink>}
          {content.type === 'image' && <ContentImage src={content.value} alt="content" />}
          {content.type === 'pdf' && <ContentPDF href={content.value}>Download PDF</ContentPDF>}
          <ButtonGroup>
            <IconButton onClick={handleEdit}><FaEdit /></IconButton>
            <IconButton onClick={handleDelete}><FaTrash /></IconButton>
          </ButtonGroup>
        </div>
      )}
    </ContentContainer>
  );
};

export default Content;
