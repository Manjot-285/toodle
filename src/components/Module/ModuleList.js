import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/Localstorage';
import ModuleForm from './Moduleform';
import Module from './Module';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ModuleSection = styled.div`
  margin-top: 20px;
`;

const ModuleList = ({ courseId, fetchCourses }) => {
  const [modules, setModules] = useState([]);

  const fetchModules = () => {
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    setModules(course.modules);
  };

  useEffect(() => {
    fetchModules();
  }, [fetchCourses]);

  const moveModule = (fromIndex, toIndex) => {
    const updatedModules = [...modules];
    const [movedModule] = updatedModules.splice(fromIndex, 1);
    updatedModules.splice(toIndex, 0, movedModule);
    setModules(updatedModules);
    const courses = loadFromLocalStorage('courses');
    const course = courses.find(course => course.id === courseId);
    course.modules = updatedModules;
    saveToLocalStorage('courses', courses);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ModuleSection>
        <ModuleForm courseId={courseId} fetchCourses={fetchCourses} />
        <h5>Modules</h5>
        {modules.map((module, index) => (
          <Module
            key={module.id}
            module={module}
            courseId={courseId}
            index={index}
            moveModule={moveModule}
            fetchCourses={fetchCourses}
          />
        ))}
      </ModuleSection>
    </DndProvider>
  );
};

export default ModuleList;
