import React, { useState, useEffect } from 'react';
import Axios, { COURSES } from '../../Api/Api';
import CourseCard from '../../Components/CourseCard';
import '../../Styles/CourseCard.css';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // جلب كل الكورسات
    Axios.get(`${COURSES}`)
      .then(res => {
        console.log('All Courses:', res.data);
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError('حدث خطأ في تحميل الكورسات');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري تحميل الكورسات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">جميع الكورسات</h1>
          <p className="page-subtitle">
            اختر الكورس المناسب لك وابدأ رحلة التعلم
          </p>
          <div className="courses-count">
            <span>عدد الكورسات المتاحة: </span>
            <strong>{courses.length}</strong>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-section">
        <div className="container">
          <div className="courses-grid">
            {courses.map(course => (
              <CourseCard key={course.id} data={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}