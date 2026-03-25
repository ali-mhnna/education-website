import React, { useState, useEffect } from "react";

export default function UserModal({
  show,
  onClose,
  onSubmit,
  editMode,
  currentUser,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (editMode && currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        password: "",
        role: currentUser.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
      });
    }
  }, [editMode, currentUser]);

  // handleChange
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // handleFormSubmit
  async function handleFormSubmit(e) {
    e.preventDefault();
    setFormLoading(true);
    const success = await onSubmit(formData, editMode, currentUser);
    setFormLoading(false);
    if (success) {
      onClose();
    }
  }

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editMode ? "✏️ تعديل المستخدم" : "➕ إضافة مستخدم جديد"}</h2>
          <button onClick={onClose} className="close-btn">
            ✖
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="course-form">
          <div className="form-group">
            <label>الاسم *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="أحمد محمد"
            />
          </div>

          <div className="form-group">
            <label>البريد الإلكتروني *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@domain.com"
            />
          </div>

          <div className="form-group">
            <label>
              كلمة السر {editMode ? "(اتركها فارغة للإبقاء على القديمة)" : "*"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!editMode}
              placeholder="••••••"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>الصلاحية *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">طالب</option>
              <option value="instructor">مدرس</option>
              <option value="admin">مدير</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">
              إلغاء
            </button>
            <button type="submit" className="submit-btn" disabled={formLoading}>
              {formLoading
                ? "جاري الحفظ..."
                : editMode
                ? "حفظ التعديلات"
                : "إضافة المستخدم"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}