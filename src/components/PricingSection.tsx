interface Plan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
  badge?: string
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for trying AssetForge Labs',
    features: [
      '✅ Up to 50MB per package',
      '✅ Basic ZIP packaging',
      '✅ 13 Platform templates',
      '✅ README auto-generated',
      '❌ Batch processing',
      '❌ Unlimited file size',
      '❌ Premium SEO keywords',
      '❌ White-label branding',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '₹1,250',
    period: 'per month',
    description: 'For serious digital creators',
    features: [
      '✅ Unlimited file size',
      '✅ All 13 SEO templates',
      '✅ Premium 2026 keywords',
      '✅ Batch processing',
      '✅ White-label branding',
      '✅ Priority support',
      '✅ New features first',
      '✅ Commercial license',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Lifetime',
    price: '₹8,250',
    period: 'one-time',
    description: 'Pay once, use forever',
    features: [
      '✅ Everything in Pro',
      '✅ Lifetime updates',
      '✅ No recurring charges',
      '✅ Priority support',
      '✅ Early beta access',
      '✅ Founding member badge',
      '✅ Commercial license',
    ],
    cta: 'Get Lifetime Access',
    highlighted: false,
    badge: 'Best Value',
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" style={{ padding: '80px 24px', maxWidth: '960px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '99px',
          padding: '6px 16px',
          fontSize: '13px',
          color: '#6366f1',
          marginBottom: '16px'
        }}>
          💰 Simple, transparent pricing (INR)
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px' }}>
          Start free. Scale when ready.
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>
          Prices shown in INR. International cards supported.
        </p>
      </div>

      {/* Plans Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              background: plan.highlighted ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
              border: plan.highlighted ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '28px 24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: plan.highlighted ? '#6366f1' : '#8b5cf6',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 14px',
                  borderRadius: '99px',
                }}>
                  {plan.badge}
                </div>
              )}

              <p style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', marginBottom: '8px' }}>
                {plan.name}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '42px', fontWeight: '700' }}>{plan.price}</span>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>/{plan.period}</span>
              </div>

              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                {plan.description}
              </p>

              {/* Dynamic Call-To-Action Element Injection */}
              <div style={{ marginBottom: '24px', minHeight: '46px' }}>
                {plan.name === 'Free' && (
                  <button
                    onClick={() => {
                      document.getElementById('root')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'transparent',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    {plan.cta}
                  </button>
                )}

                {plan.name === 'Pro' && (
                  <div 
                    ref={(el) => {
                      if (el && el.children.length === 0) {
                        const script = document.createElement('script');
                        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
                        script.setAttribute('data-payment_button_id', 'pl_SrdzcfF70rngVM');
                        script.async = true;
                        el.appendChild(script);
                      }
                    }}
                  />
                )}

                {plan.name === 'Lifetime' && (
                  <div 
                    ref={(el) => {
                      if (el && el.children.length === 0) {
                        const script = document.createElement('script');
                        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
                        script.setAttribute('data-payment_button_id', 'pl_SreBlUiTbV7Tvs');
                        script.async = true;
                        el.appendChild(script);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* Plan Feature Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {plan.features.map((f) => (
                <p key={f} style={{ fontSize: '13px', margin: 0, color: f.startsWith('❌') ? '#475569' : '#cbd5e1' }}>
                  {f}
                </p>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}