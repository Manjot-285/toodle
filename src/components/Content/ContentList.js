import React, { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/Localstorage';
import ContentForm from './ContentForm';
import Content from './Content';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ContentList = ({ courseId, moduleId, fetchCourses }) => {
  const [contents, setContents] = useState([]);

  const fetchContents = () => {
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    const module = course.modules.find(module => module.id === moduleId);
    setContents(module.contents);
  };

  useEffect(() => {
    fetchContents();
  }, [fetchCourses]);

  const moveContent = (fromIndex, toIndex) => {
    const updatedContents = [...contents];
    const [movedContent] = updatedContents.splice(fromIndex, 1);
    updatedContents.splice(toIndex, 0, movedContent);
    setContents(updatedContents);
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    const module = course.modules.find(module => module.id === moduleId);
    module.contents = updatedContents;
    saveToLocalStorage('courses', courses);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ContentForm courseId={courseId} moduleId={moduleId} fetchCourses={fetchCourses} />
      <h5>Contents</h5>
      {contents.map((content, index) => (
        <Content
          key={content.id}
          content={content}
          moduleId={moduleId}
          courseId={courseId}
          index={index}
          moveContent={moveContent}
          fetchCourses={fetchCourses}
        />
      ))}
    </DndProvider>
  );
};

export default ContentList;
