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
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying AssetForge',
    features: [
      '✅ Up to 50MB per package',
      '✅ Basic ZIP packaging',
      '✅ 4 SEO templates',
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
    price: '$15',
    period: 'per month',
    description: 'For serious digital creators',
    features: [
      '✅ Unlimited file size',
      '✅ All 8 SEO templates',
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
    price: '$99',
    period: 'one-time',
    description: 'Pay once, use forever',
    features: [
      '✅ Everything in Pro',
      '✅ Lifetime updates',
      '✅ No recurring charges',
      '✅ Priority support',
      '✅ Early beta access',
      '✅ Founding member badge',
      '✅ Private Discord access',
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '99px', padding: '6px 16px', fontSize: '13px', color: '#6366f1', marginBottom: '16px' }}>
          💰 Simple, transparent pricing
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px' }}>
          Start free. Scale when ready.
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>
          No hidden fees. Cancel anytime. Your files always stay on your device.
        </p>
      </div>

      {/* Plans Grid */}
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
              transition: 'transform 0.2s ease',
            }}
          >
            {/* Badge */}
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
                whiteSpace: 'nowrap',
              }}>
                {plan.badge}
              </div>
            )}

            {/* Plan Name */}
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {plan.name}
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '42px', fontWeight: '700', color: '#f8fafc' }}>{plan.price}</span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>/{plan.period}</span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>{plan.description}</p>

            {/* CTA Button */}
            <button
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: plan.highlighted ? 'none' : '1px solid rgba(255,255,255,0.15)',
                background: plan.highlighted ? '#6366f1' : 'transparent',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '24px',
                boxShadow: plan.highlighted ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {plan.cta}
            </button>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {plan.features.map((feature) => (
                <p key={feature} style={{
                  fontSize: '13px',
                  color: feature.startsWith('❌') ? '#475569' : '#cbd5e1',
                  lineHeight: '1.4',
                }}>
                  {feature}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
        {[
          { icon: '🔒', text: 'No card required for Free' },
          { icon: '⚡', text: 'Instant access' },
          { icon: '🔄', text: 'Cancel anytime' },
          { icon: '🌍', text: 'AssetForge Labs — trusted worldwide' },
        ].map((badge) => (
          <div key={badge.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
            <span>{badge.icon}</span>
            <span>{badge.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}