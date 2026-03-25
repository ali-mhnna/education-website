import React from "react";

export default function UsersTable({ users, onEdit, onDelete, currentUserId }) {
  return (
    <div className="table-container">
      <table className="courses-table">
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الصلاحية</th>
            <th>تاريخ التسجيل</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge role-${user.role}`}>
                  {user.role === "admin" && "👑 مدير"}
                  {user.role === "student" && "🎓 طالب"}
                  {user.role === "instructor" && "👨‍🏫 مدرس"}
                </span>
              </td>
              <td>{new Date(user.created_at).toLocaleDateString("ar-EG")}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(user)}
                    className="edit-btn"
                    title="تعديل"
                  >
                    ✏️
                  </button>
                  {user.id !== currentUserId && (
                    <button
                      onClick={() => onDelete(user.id, user.name)}
                      className="delete-btn"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
