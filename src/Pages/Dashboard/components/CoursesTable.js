import React from "react";

export default function CoursesTable({ courses, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="courses-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>العنوان</th>
            <th>المدرب</th>
            <th>السعر</th>
            <th>التقييم</th>
            <th>مميز</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course,index) => (
            <tr key={course.id}>
             <td>{index + 1}</td>
              <td className="course-title-cell">{course.title}</td>
              <td>{course.instructor ? course.instructor.name : "-"}</td>
              <td className="price-cell">${course.price}</td>
              <td>⭐ {course.rating}</td>
              <td>
                {course.is_featured ? (
                  <span className="badge featured">نعم</span>
                ) : (
                  <span className="badge">لا</span>
                )}
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(course)}
                    className="edit-btn"
                    title="تعديل"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(course.id, course.title)}
                    className="delete-btn"
                    title="حذف"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}