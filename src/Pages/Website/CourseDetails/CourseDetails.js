import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../Styles/CourseDetails.css";
import useCourseDetails from "./hooks/useCourseDetails";
import CourseHero from "./components/CourseHero";
import CourseContent from "./components/CourseContent";
import CourseSidebar from "./components/CourseSidebar";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    course,
    loading,
    error,
    enrolled,
    enrollLoading,
    userRole,
    handleEnrollment,
  } = useCourseDetails(id);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري تحميل التفاصيل...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="error-container">
        <h2>😕 {error}</h2>
        <button onClick={() => navigate("/courses")} className="back-btn">
          العودة للكورسات
        </button>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <CourseHero
        course={course}
        enrolled={enrolled}
        enrollLoading={enrollLoading}
        userRole={userRole}
        onEnroll={handleEnrollment}
      />

      <section className="course-content">
        <div className="container">
          <div className="content-grid">
            <CourseContent description={course.description} />
            <CourseSidebar
              course={course}
              enrolled={enrolled}
              enrollLoading={enrollLoading}
              userRole={userRole}
              onEnroll={handleEnrollment}
            />
          </div>
        </div>
      </section>
    </div>
  );
}