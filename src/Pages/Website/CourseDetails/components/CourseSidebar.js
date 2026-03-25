import React from "react";

export default function CourseSidebar({
  course,
  enrolled,
  enrollLoading,
  userRole,
  onEnroll,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <h3>📊 معلومات الكورس</h3>
        <div className="info-list">
          <div className="info-item">
            <span className="info-label">السعر:</span>
            <span className="info-value price">${course.price}</span>
          </div>
          <div className="info-item">
            <span className="info-label">التقييم:</span>
            <span className="info-value">⭐ {course.rating}</span>
          </div>
          {course.instructor && (
            <div className="info-item">
              <span className="info-label">المدرب:</span>
              <span className="info-value">{course.instructor.name}</span>
            </div>
          )}
          <div className="info-item">
            <span className="info-label">المستوى:</span>
            <span className="info-value">جميع المستويات</span>
          </div>
        </div>

        {userRole === "student" && (
          <button
            onClick={onEnroll}
            disabled={enrollLoading}
            className={
              enrolled
                ? "unenroll-btn sidebar-enroll-btn"
                : "enroll-btn sidebar-enroll-btn"
            }
          >
            {enrollLoading
              ? "جاري المعالجة..."
              : enrolled
                ? "إلغاء التسجيل ❌"
                : "سجّل الآن"}
          </button>
        )}
      </div>

      <div className="sidebar-card">
        <h3>✨ المميزات</h3>
        <ul className="features-list">
          <li>✅ وصول مدى الحياة</li>
          <li>✅ شهادة إتمام</li>
          <li>✅ دعم فني مباشر</li>
          <li>✅ تحديثات مجانية</li>
        </ul>
      </div>
    </aside>
  );
}