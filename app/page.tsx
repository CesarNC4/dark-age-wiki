import { supabase } from '@/lib/supabase'
import SectionCard from './components/SectionCard'

export default async function Home() {
  const { data: sections } = await supabase
    .from('sections')
    .select('*')
    .order('order_index')

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <header style={{
        borderBottom: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'var(--accent)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}>
          Dark Age
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', letterSpacing: '0.1em' }}>
          Wiki del Universo
        </p>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        <h2 style={{
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Explorar
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {sections?.map((section) => (
            <SectionCard
              key={section.id}
              id={section.id}
              name={section.name}
              slug={section.slug}
              description={section.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}