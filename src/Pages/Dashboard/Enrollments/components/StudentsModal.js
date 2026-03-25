import React from "react";

export default function StudentsModal({ 
  show, 
  onClose, 
  course, 
  students, 
  loading 
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👥 طلاب كورس: {course?.title}</h2>
          <button onClick={onClose} className="close-btn">
            ✖
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>جاري التحميل...</p>
            </div>
          ) : students.length === 0 ? (
            <p className="empty-message">لا يوجد طلاب مسجلين</p>
          ) : (
            <table className="courses-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      {student.pivot?.enrolled_at
                        ? new Date(student.pivot.enrolled_at).toLocaleDateString("ar-EG")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}