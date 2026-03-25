import React, { useState, useEffect } from 'react';
import Axios, { COURSES_FEATURED } from '../../Api/Api';
import CourseCard from '../../Components/CourseCard';
import '../../Styles/Home.css';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // جلب الكورسات المميزة
    Axios.get(`${COURSES_FEATURED}`)
      .then(res => {
        console.log('Featured Courses:', res.data);
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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">مرحباً بك في منصتنا التعليمية</h1>
          <p className="hero-subtitle">
            تعلّم مهارات جديدة وطوّر نفسك مع أفضل الكورسات التعليمية
          </p>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">الكورسات المميزة</h2>
          
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