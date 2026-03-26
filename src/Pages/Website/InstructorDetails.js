import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios, { INSTRUCTOR_BY_ID } from "../../Api/Api";
import CourseCard from "../../Components/CourseCard";
import "../../Styles/InstructorDetails.css";

export default function InstructorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get(`${INSTRUCTOR_BY_ID}/${id}`)
      .then((res) => {
        setInstructor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("المدرس غير موجود");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (error || !instructor) {
    return (
      <div className="error-container">
        <h2>😕 {error}</h2>
        <button onClick={() => navigate("/instructors")} className="back-btn">
          العودة للمدرسين
        </button>
      </div>
    );
  }

  return (
    <div className="instructor-details-page">
      {/* Hero Section */}
      <section className="instructor-hero">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-link">
            ← العودة
          </button>

          <div className="instructor-hero-content">
            <div className="instructor-avatar-placeholder">
              {/* عرض أول حرف من اسم المدرس بدلاً من الصورة */}
              <span>{instructor.name.charAt(0)}</span>
            </div>

            <div className="instructor-hero-info">
              <h1 className="instructor-title">{instructor.name}</h1>
              <p className="instructor-spec">📚 {instructor.specialization}</p>

              <div className="instructor-stats">
                <div className="stat-box">
                  <span className="stat-icon">⭐</span>
                  <div>
                    <span className="stat-value">{instructor.rating}</span>
                    <span className="stat-label">التقييم</span>
                  </div>
                </div>

                <div className="stat-box">
                  <span className="stat-icon">💼</span>
                  <div>
                    <span className="stat-value">
                      {instructor.experience_years}
                    </span>
                    <span className="stat-label">سنوات الخبرة</span>
                  </div>
                </div>

                <div className="stat-box">
                  <span className="stat-icon">📚</span>
                  <div>
                    <span className="stat-value">
                      {instructor.courses?.length || 0}
                    </span>
                    <span className="stat-label">كورس</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="instructor-bio-section">
        <div className="container">
          <div className="bio-card">
            <h2>📝 نبذة عن المدرس</h2>
            <p>{instructor.bio}</p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="instructor-courses-section">
        <div className="container">
          <h2 className="section-title">
            الكورسات ({instructor.courses?.length || 0})
          </h2>

          {instructor.courses && instructor.courses.length > 0 ? (
            <div className="courses-grid">
              {instructor.courses.map((course) => (
                <CourseCard key={course.id} data={course} />
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <p>لا توجد كورسات لهذا المدرس حالياً</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
