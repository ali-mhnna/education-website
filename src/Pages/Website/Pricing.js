import React, { useState } from 'react';
import '../../Styles/Pricing.css';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: 'الباقة الأساسية',
      price: 29.99,
      period: 'شهرياً',
      description: 'مثالية للمبتدئين',
      features: [
        'الوصول لـ 5 كورسات',
        'دعم عبر البريد الإلكتروني',
        'شهادة إتمام',
        'تحديثات شهرية',
      ],
      popular: false,
      color: '#667eea'
    },
    {
      id: 2,
      name: 'الباقة المتقدمة',
      price: 49.99,
      period: 'شهرياً',
      description: 'الأكثر شعبية',
      features: [
        'الوصول لـ 20 كورساً',
        'دعم فني على مدار الساعة',
        'شهادات معتمدة',
        'تحديثات أسبوعية',
        'مشاريع عملية',
        'وصول للمجتمع الخاص',
      ],
      popular: true,
      color: '#764ba2'
    },
    {
      id: 3,
      name: 'الباقة الاحترافية',
      price: 99.99,
      period: 'شهرياً',
      description: 'للمحترفين',
      features: [
        'وصول غير محدود لجميع الكورسات',
        'دعم مخصص 1-على-1',
        'شهادات احترافية معتمدة',
        'تحديثات يومية',
        'مشاريع متقدمة',
        'استشارات مهنية',
        'وصول مدى الحياة',
        'محتوى حصري',
      ],
      popular: false,
      color: '#f093fb'
    }
  ];

  // handleSubscribe
  function handleSubscribe(plan) {
    setSelectedPlan(plan);
    
    // محاكاة عملية الدفع
    setTimeout(() => {
      alert(`تم الاشتراك في ${plan.name} بنجاح! 🎉\n(هذه عملية وهمية)`);
      setSelectedPlan(null);
    }, 1500);
  }

  return (
    <div className="pricing-page">
      {/* Page Header */}
      <section className="pricing-header">
        <div className="container">
          <h1 className="pricing-title">اختر الباقة المناسبة لك</h1>
          <p className="pricing-subtitle">
            جميع الباقات تشمل ضمان استرجاع المال خلال 30 يوماً
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map(plan => (
              <div 
                key={plan.id} 
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                style={{ '--card-color': plan.color }}
              >
                {plan.popular && (
                  <div className="popular-badge">الأكثر شعبية ⭐</div>
                )}

                <div className="card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  
                  <div className="plan-price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                </div>

                <div className="card-body">
                  <ul className="features-list">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-footer">
                  <button 
                    onClick={() => handleSubscribe(plan)}
                    className="subscribe-btn"
                    disabled={selectedPlan?.id === plan.id}
                  >
                    {selectedPlan?.id === plan.id ? (
                      <>
                        <span className="loading-spinner"></span>
                        جاري المعالجة...
                      </>
                    ) : (
                      'اشترك الآن'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-title">الأسئلة الشائعة</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>هل يمكنني إلغاء الاشتراك في أي وقت؟</h3>
              <p>نعم، يمكنك إلغاء اشتراكك في أي وقت دون أي رسوم إضافية.</p>
            </div>

            <div className="faq-item">
              <h3>هل الشهادات معتمدة؟</h3>
              <p>نعم، جميع الشهادات معتمدة ومعترف بها دولياً.</p>
            </div>

            <div className="faq-item">
              <h3>هل يمكنني تغيير الباقة لاحقاً؟</h3>
              <p>بالتأكيد! يمكنك الترقية أو التخفيض في أي وقت.</p>
            </div>

            <div className="faq-item">
              <h3>ما هي طرق الدفع المتاحة؟</h3>
              <p>نقبل جميع البطاقات الائتمانية، PayPal، والتحويل البنكي.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}