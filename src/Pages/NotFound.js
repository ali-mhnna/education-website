import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-number">404</div>
        <h1>عذراً! الصفحة غير موجودة</h1>
        <p>الصفحة التي تبحث عنها غير متوفرة</p>
        
        <div className="not-found-actions">
          <button onClick={() => navigate('/')} className="home-btn">
            🏠 العودة للرئيسية
          </button>
          <button onClick={() => navigate(-1)} className="back-btn">
            ← الرجوع للخلف
          </button>
        </div>
      </div>
    </div>
  );
}