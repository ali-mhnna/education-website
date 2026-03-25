import React from "react";

export default function CourseContent({ description }) {
  return (
    <div className="main-content">
      <div className="content-card">
        <h2>📚 عن الكورس</h2>
        <p>{description}</p>
      </div>

      <div className="content-card">
        <h2>🎯 ماذا ستتعلم؟</h2>
        <ul className="learning-list">
          <li>فهم شامل للموضوع من الصفر</li>
          <li>تطبيق عملي على مشاريع حقيقية</li>
          <li>أفضل الممارسات والأدوات الحديثة</li>
          <li>شهادة إتمام معتمدة</li>
        </ul>
      </div>

      <div className="content-card">
        <h2>👥 لمن هذا الكورس؟</h2>
        <ul className="audience-list">
          <li>المبتدئين الذين يرغبون بالبدء من الصفر</li>
          <li>المطورين الذين يريدون تطوير مهاراتهم</li>
          <li>الطلاب والخريجين الجدد</li>
        </ul>
      </div>
    </div>
  );
}