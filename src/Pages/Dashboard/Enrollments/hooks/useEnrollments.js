import { useState, useEffect, useCallback } from "react";
import Axios, { ADMIN_ENROLLMENTS, ADMIN_COURSE_STUDENTS } from "../../../../Api/Api";

export default function useEnrollments() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  
  const loadCourses = useCallback(() => {
    setLoading(true);
    Axios.get(`${ADMIN_ENROLLMENTS}`) 
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  async function loadStudents(courseId) {
    setStudentsLoading(true);
    try {
   
      const res = await Axios.get(`${ADMIN_COURSE_STUDENTS}/${courseId}/students`);
      setStudents(res.data.students);
    } catch (err) {
      console.error(err);
    } finally {
      setStudentsLoading(false);
    }
  }

  function clearStudents() {
    setStudents([]);
  }

  return {
    courses,
    loading,
    students,
    studentsLoading,
    loadStudents,
    clearStudents,
  };
}