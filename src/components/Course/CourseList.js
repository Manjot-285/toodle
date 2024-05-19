import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadFromLocalStorage } from '../../utils/Localstorage';
import ModuleList from '../Module/ModuleList';
import CourseForm from './CourseForm';

const CourseContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
`;

const Title = styled.h3`
  margin: 0 0 10px;
`;

const Description = styled.p`
  margin: 0 0 20px;
`;

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = () => {
    const coursesData = loadFromLocalStorage('courses');
    setCourses(coursesData || []);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <CourseForm fetchCourses={fetchCourses} />
      <h2>Courses</h2>
      {courses.map((course) => (
        <CourseContainer key={course.id}>
          <Title>{course.title}</Title>
          <Description>{course.description}</Description>
          <ModuleList courseId={course.id} modules={course.modules} fetchCourses={fetchCourses} />
        </CourseContainer>
      ))}
    </div>
  );
};

export default CourseList;
