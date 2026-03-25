import React from "react";
import { useNavigate } from "react-router-dom";
import CourseInstructor from "./CourseInstructor";

const serverBaseUrl = 'http://127.0.0.1:8000';
export default function CourseHero({
  course,
  enrolled,
  enrollLoading,
  userRole,
  onEnroll,
}) {
  const navigate = useNavigate();

 const getImageUrl = (path) => {
    if (!path) return "/fallback-course.png";
    if (path.startsWith("http")) return path;
    return `${serverBaseUrl}${path.startsWith('/') ? '' : '/'}${path.includes('storage') ? path : 'storage/' + path}`;
  };
  const imageUrl = getImageUrl(course.image);

  return (
    <section className="course-hero">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          ← العودة
        </button>

        <div className="course-hero-content">
          <div className="course-hero-info">
            <h1 className="course-hero-title">{course.title}</h1>
            <p className="course-hero-description">{course.description}</p>

            <div className="course-meta">
              <div className="meta-item">
                <span className="meta-icon">⭐</span>
                <span className="meta-text">{course.rating} تقييم</span>
              </div>

              <div className="meta-item price-tag">
                <span className="meta-icon">💰</span>
                <span className="meta-text price">${course.price}</span>
              </div>
            </div>

            {course.instructor && (
              <CourseInstructor instructor={course.instructor} />
            )}

            {userRole === "student" && (
              <button
                onClick={onEnroll}
                disabled={enrollLoading}
                className={enrolled ? "unenroll-btn" : "enroll-btn"}
              >
                {enrollLoading
                  ? "جاري المعالجة..."
                  : enrolled
                    ? "إلغاء التسجيل ❌"
                    : "سجّل الآن في الكورس ✅"}
              </button>
            )}
          </div>

          <div className="course-hero-image">
            <img src={imageUrl} alt={course.title} />
          </div>
        </div>
      </div>
    </section>
  );
}