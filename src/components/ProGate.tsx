interface Props {
  feature: string
  onUpgrade: () => void
}

export default function ProGate({ feature, onUpgrade }: Props) {
  return (
    <div style={{
      marginTop: '16px',
      borderRadius: '12px',
      border: '1px solid rgba(99,102,241,0.3)',
      background: 'rgba(10,10,15,0.85)',
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '24px' }}>🔒</div>
      <p style={{ fontWeight: '600', fontSize: '14px', color: '#f8fafc', lineHeight: '1.5' }}>
        {feature}
      </p>
      <p style={{ fontSize: '12px', color: '#94a3b8' }}>
        Upgrade to Pro to unlock unlimited power
      </p>
      <button
        onClick={onUpgrade}
        style={{
          marginTop: '4px',
          padding: '9px 22px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          fontSize: '13px',
          fontWeight: '600',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 0 16px rgba(99,102,241,0.4)',
          whiteSpace: 'nowrap',
        }}
      >
        ⚡ Upgrade to Pro — $15/mo
      </button>
    </div>
  )
}