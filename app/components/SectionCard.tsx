'use client'

import Link from 'next/link'

interface SectionCardProps {
  id: string
  name: string
  slug: string
  description: string
  order_index: number
}

export default function SectionCard({ name, slug, description, order_index }: SectionCardProps) {
  return (
    <Link href={`/wiki/${slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          padding: '1.75rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--border-hover)'
          e.currentTarget.style.borderLeftColor = 'var(--accent-light)'
          e.currentTarget.style.backgroundColor = '#1a1714'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.borderLeftColor = 'var(--accent)'
          e.currentTarget.style.backgroundColor = 'var(--bg-card)'
        }}
      >
        {/* Número de clasificación */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--gold)',
          letterSpacing: '0.15em',
          display: 'block',
          marginBottom: '0.5rem'
        }}>
          ARCHIVO — {String(order_index).padStart(2, '0')}
        </span>

        <h3 style={{
          fontFamily: 'var(--font-title)',
          color: 'var(--text-primary)',
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '0.6rem',
          letterSpacing: '0.02em'
        }}>
          {name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          {description}
        </p>

        {/* Detalle decorativo esquina */}
        <span style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--border-hover)',
          letterSpacing: '0.1em'
        }}>
          ████
        </span>
      </div>
    </Link>
  )
}