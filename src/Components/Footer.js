import React from 'react';
import '../Styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <h2>المنصة التعليمية 📚</h2>
              <p>تعلّم، تطوّر، وحقق أحلامك معنا</p>
            </div>

            <div className="footer-info">
              <p>منصة تعليمية متكاملة تقدم أفضل الكورسات في مختلف المجالات</p>
              <div className="social-icons">
                <span>📘</span>
                <span>🐦</span>
                <span>📷</span>
                <span>💼</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 المنصة التعليمية - جميع الحقوق محفوظة</p>
            <p className="footer-tagline">صُنع بـ ❤️ من أجل التعليم</p>
          </div>
        </div>
      </div>
    </footer>
  );
}