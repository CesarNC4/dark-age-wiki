'use client'

import Link from 'next/link'

interface SectionCardProps {
  id: string
  name: string
  slug: string
  description: string
}

export default function SectionCard({ name, slug, description }: SectionCardProps) {
  return (
    <Link href={`/wiki/${slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <h3 style={{
          color: 'var(--text-primary)',
          fontSize: '1.125rem',
          marginBottom: '0.5rem'
        }}>
          {name}
        </h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      </div>
    </Link>
  )
}