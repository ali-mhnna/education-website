import React from "react";

export default function EnrollmentTable({ courses, onViewStudents }) {
  return (
    <div className="table-container">
      <table className="courses-table">
        <thead>
          <tr>
            <th>#</th>
            <th>الكورس</th>
            <th>المدرب</th>
            <th>السعر</th>
            <th>عدد المسجلين</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td className="course-title-cell">{course.title}</td>
              <td>{course.instructor ? course.instructor.name : "-"}</td>
              <td className="price-cell">${course.price}</td>
              <td>
                <span className={`badge ${course.users_count > 0 ? "featured" : ""}`}>
                  {course.users_count || 0} طالب
                </span>
              </td>
              <td>
                <button
                  onClick={() => onViewStudents(course)}
                  className="edit-btn"
                  title="عرض الطلاب"
                  disabled={course.users_count === 0}
                >
                  👁️ عرض
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}