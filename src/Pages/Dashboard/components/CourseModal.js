import React, { useState, useEffect } from "react";

export default function CourseModal({
  show,
  onClose,
  onSubmit,
  editMode,
  currentCourse,
  instructors,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    image: "",
    instructor_id: "",
    is_featured: false,
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (editMode && currentCourse) {
      setFormData({
        title: currentCourse.title,
        description: currentCourse.description,
        price: currentCourse.price,
        rating: currentCourse.rating,
        image: currentCourse.image,
        instructor_id: currentCourse.instructor?.id || "",
        is_featured: currentCourse.is_featured || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        rating: "",
        image: "",
        instructor_id: "",
        is_featured: false,
      });
    }
  }, [editMode, currentCourse]);
     
    // handleChange
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  // handleSubmit
  async function handleSubmit(e) {
    e.preventDefault();
    setFormLoading(true);
    const success = await onSubmit(formData, editMode, currentCourse);
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
          <h2>{editMode ? "✏️ تعديل الكورس" : "➕ إضافة كورس جديد"}</h2>
          <button onClick={onClose} className="close-btn">
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-row">
            <div className="form-group">
              <label>عنوان الكورس *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="مثال: تطوير تطبيقات الويب"
              />
            </div>

            <div className="form-group">
              <label>المدرب *</label>
              <select
                name="instructor_id"
                value={formData.instructor_id}
                onChange={handleChange}
                required
              >
                <option value="">اختر المدرب</option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name} - {instructor.specialization}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>الوصف *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="وصف تفصيلي عن الكورس..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>السعر ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="99.99"
              />
            </div>

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
          </div>

          <div className="form-group">
            <label>رابط الصورة *</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
              />
              <span>كورس مميز (يظهر في الصفحة الرئيسية)</span>
            </label>
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
                : "إضافة الكورس"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}