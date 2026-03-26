import React, { useState, useEffect } from "react";

export default function InstructorModal({
  show,
  onClose,
  onSubmit,
  editMode,
  currentInstructor,
}) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    specialization: "",
    rating: "",
    experience_years: "",
    avatar: "", 
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (editMode && currentInstructor) {
      setFormData({
        name: currentInstructor.name,
        bio: currentInstructor.bio,
        specialization: currentInstructor.specialization,
        rating: currentInstructor.rating,
        experience_years: currentInstructor.experience_years,
        avatar: currentInstructor.avatar || "", 
      });
    } else {
      setFormData({
        name: "",
        bio: "",
        specialization: "",
        rating: "",
        experience_years: "",
        avatar: "",
      });
    }
  }, [editMode, currentInstructor]);

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
    const success = await onSubmit(formData, editMode, currentInstructor);
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
          <h2>{editMode ? "✏️ تعديل المدرس" : "➕ إضافة مدرس جديد"}</h2>
          <button onClick={onClose} className="close-btn">
            ✖
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="instructor-form">
          <div className="form-group">
            <label>اسم المدرس *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="مثال: د. أحمد محمد"
            />
          </div>

          <div className="form-group">
            <label>التخصص *</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              placeholder="مثال: تطوير الويب"
            />
          </div>

          <div className="form-group">
            <label>النبذة *</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows="4"
              placeholder="نبذة تفصيلية عن المدرس..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>التقييم (0-5) *</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
              />
            </div>

            <div className="form-group">
              <label>سنوات الخبرة *</label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleChange}
                required
                min="0"
                placeholder="10"
              />
            </div>
          </div>

          {/* ✅ تعديل: صار input url بدل file */}
          <div className="form-group">
            <label>رابط صورة المدرس *</label>
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              required={!editMode}
              placeholder="https://example.com/image.jpg"
            />
            {editMode && currentInstructor?.avatar && (
              <div className="current-image">
                <p>الصورة الحالية:</p>
                <img
                  src={currentInstructor.avatar}
                  alt="Current"
                  style={{
                    width: "100px",
                    borderRadius: "8px",
                    marginTop: "0.5rem",
                  }}
                />
              </div>
            )}
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
                : "إضافة المدرس"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}