import React from "react";


const fallbackAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Crect width='50' height='50' fill='%23e8e8e8'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3E%F0%9F%91%A4%3C/text%3E%3C/svg%3E";

export default function InstructorsTable({ instructors, onEdit, onDelete }) {
  

  const serverBaseUrl = process.env.REACT_APP_API_URL 
    ? process.env.REACT_APP_API_URL.replace('/api', '') 
    : 'http://127.0.0.1:8000';

  return (
    <div className="table-container">
      <table className="instructors-table">
        <thead>
          <tr>
            <th>الصورة</th>
            <th>الاسم</th>
            <th>التخصص</th>
            <th>التقييم</th>
            <th>الخبرة</th>
            <th>الكورسات</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => {
          
            const avatarUrl = instructor.avatar 
              ? (instructor.avatar.startsWith('http') 
                  ? instructor.avatar 
                  : `${serverBaseUrl}${instructor.avatar}`)
              : fallbackAvatar;

            return (
              <tr key={instructor.id}>
                <td>
                  <div className="instructor-avatar-table">
                    <img
                      src={avatarUrl}
                      alt={instructor.name}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = fallbackAvatar;
                      }}
                    />
                  </div>
                </td>
                <td className="instructor-name-cell">{instructor.name}</td>
                <td>{instructor.specialization}</td>
                <td>⭐ {instructor.rating}</td>
                <td>{instructor.experience_years} سنوات</td>
                <td className="courses-count-cell">
                  {instructor.courses_count || 0}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(instructor)}
                      className="edit-btn"
                      title="تعديل"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(instructor.id, instructor.name)}
                      className="delete-btn"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}