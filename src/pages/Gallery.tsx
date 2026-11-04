import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Room from '../components/Room'
import Modal from '../components/Modal'
import { collections, designs, projects, type Design } from '../content'
import { config } from '../config'
import { useApp } from '../store'

export function DesignArt({ d, className }: { d: Design; className?: string }) {
  return <img src={d.image} alt={`${d.title} — fashion design illustration`} className={className} loading="lazy" decoding="async" />
}

type Repo = { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; pushed_at: string }

function useRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [err, setErr] = useState(false)
  useEffect(() => {
    const key = 'sexy.repos'
    try { const c = JSON.parse(sessionStorage.getItem(key) || 'null'); if (c && Date.now() - c.t < 600000) { setRepos(c.v); return } } catch { /* */ }
    const ac = new AbortController()
    fetch(`https://api.github.com/users/${config.github}/repos?sort=pushed&per_page=12`, { signal: ac.signal })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then((v: Repo[]) => { const f = v.filter(x => x.name); setRepos(f); try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: f })) } catch { /* */ } })
      .catch(() => { if (!ac.signal.aborted) setErr(true) })
    return () => ac.abort()
  }, [])
  return { repos, err }
}

export default function Gallery() {
  const { slug } = useParams()
  const nav = useNavigate()
  const { unlock, blip } = useApp()
  const [tab, setTab] = useState<'fashion' | 'code'>('fashion')
  const [col, setCol] = useState('football-kits')
  const [book, setBook] = useState<{ list: Design[]; i: number } | null>(null)
  const { repos, err } = useRepos()
  const open = slug ? designs.find(d => d.slug === slug) : undefined
  const close = useCallback(() => nav('/gallery', { preventScrollReset: true }), [nav])
  useEffect(() => { if (open) { setTab('fashion'); setCol(open.collection) } }, [open])
  const current = collections.find(c => c.slug === col)!
  const pieces = designs.filter(d => d.collection === col)

  return (
    <Room id="gallery" title={open ? open.title : 'Gallery'} description={open ? open.blurb : 'Football kit and street wear collections designed in Adobe Illustrator, plus full-stack projects built with Solidity, JavaScript and React.'}>
      <section className="gallery">
        <p className="eyebrow">The Gallery</p>
        <h1>Collections &amp; code</h1>
        <div className="tabs" role="tablist" aria-label="Gallery tracks">
          <button role="tab" aria-selected={tab === 'fashion'} onClick={() => { setTab('fashion'); blip(500) }}>👕 Collections</button>
          <button role="tab" aria-selected={tab === 'code'} onClick={() => { setTab('code'); blip(560) }}>💻 Code</button>
          {tab === 'fashion' && current.status === 'live' && <button className="btn small" onClick={() => { setBook({ list: pieces, i: 0 }); unlock('lookbook') }}>📖 Open lookbook</button>}
        </div>

        {tab === 'fashion' ? (
          <>
            <ul className="collections" aria-label="Collections">
              {collections.map(c => (
                <li key={c.slug}>
                  <button className={`col ${c.status}`} aria-pressed={col === c.slug} onClick={() => { setCol(c.slug); blip(440) }}>
                    <span className="emoji" aria-hidden="true">{c.emoji}</span>
                    <b>{c.title}</b>
                    <small>{c.status === 'live' ? `${designs.filter(d => d.collection === c.slug).length} pieces` : 'Coming soon'}</small>
                  </button>
                </li>
              ))}
            </ul>
            <p className="col-blurb">{current.blurb}</p>

            {current.status === 'live' ? (
              <ul className="line" aria-label={`${current.title} designs`}>
                {pieces.map((d, i) => (
                  <li key={d.slug} style={{ ['--i' as string]: i, ['--a' as string]: d.accent }}>
                    <span className="peg" aria-hidden="true" />
                    <button className="card swing" onClick={() => nav(`/gallery/${d.slug}`, { preventScrollReset: true })} aria-label={`${d.title}, open details`}>
                      <DesignArt d={d} className="art" />
                      <span className="cap">{d.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="soon" role="status">
                <svg viewBox="0 0 120 60" aria-hidden="true"><path d="M5 30 H115" /></svg>
                <h2>{current.emoji} {current.title} — in the atelier</h2>
                <p>This collection is being designed right now. Check back soon, or <a href="/contact">tell me what you'd like to see</a>.</p>
              </div>
            )}
          </>
        ) : (
          <ul className="repos" aria-label="Code projects">
            {projects.map(p => (
              <li key={p.slug} className="repo big">
                <h2>{p.title}</h2><p>{p.summary}</p>
                <p className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</p>
                {p.repo && <a className="btn small" href={p.repo} target="_blank" rel="noreferrer">Open project ↗</a>}
              </li>
            ))}
            {!repos && !err && <li className="repo skeleton" aria-busy="true">Loading latest repositories…</li>}
            {err && <li className="repo">Couldn't reach GitHub right now. <a href={`https://github.com/${config.github}`} target="_blank" rel="noreferrer">Open my GitHub ↗</a></li>}
            {repos?.map((r, i) => (
              <li key={r.name} className="repo" style={{ ['--i' as string]: i }}>
                <h3>{r.name}</h3>
                <p>{r.description || 'No description yet.'}</p>
                <p className="tags">{r.language && <span>{r.language}</span>}<span>★ {r.stargazers_count}</span><span>updated {new Date(r.pushed_at).toLocaleDateString()}</span></p>
                <a href={r.html_url} target="_blank" rel="noreferrer">Open project ↗</a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {open && (
        <Modal title={open.title} onClose={close} wide>
          <div className="detail">
            <DesignArt d={open} className="art-lg" />
            <div>
              <p className="eyebrow">{collections.find(c => c.slug === open.collection)?.title} · Adobe Illustrator</p>
              <h2>{open.title}</h2>
              <p>{open.blurb}</p>
              <p className="tags">{open.tags.map(t => <span key={t}>{t}</span>)}</p>
              <p className="row">
                <button className="btn" onClick={() => { const list = designs.filter(d => d.collection === open.collection); close(); setBook({ list, i: list.indexOf(open) }); unlock('lookbook') }}>View in lookbook</button>
                <button className="btn ghost" onClick={() => nav(`/studio?design=${open.slug}`)}>Try colourways</button>
              </p>
            </div>
          </div>
        </Modal>
      )}
      {book !== null && <Lookbook list={book.list} start={book.i} onClose={() => setBook(null)} />}
    </Room>
  )
}

function Lookbook({ list, start, onClose }: { list: Design[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const d = list[i]
  const prev = () => setI(x => (x + list.length - 1) % list.length)
  const next = () => setI(x => (x + 1) % list.length)
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next() }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])
  const [x0, setX0] = useState<number | null>(null)
  return (
    <Modal title="Lookbook" onClose={onClose} wide>
      <div className="lookbook" style={{ ['--a' as string]: d.accent }}
        onPointerDown={e => setX0(e.clientX)} onPointerUp={e => { if (x0 !== null && Math.abs(e.clientX - x0) > 50) (e.clientX < x0 ? next : prev)(); setX0(null) }}>
        <button className="nav-btn" onClick={prev} aria-label="Previous design">‹</button>
        <figure key={d.slug} className="page">
          <DesignArt d={d} className="art-xl" />
          <figcaption><b>{d.title}</b><br /><small>{d.tags.join(' · ')}</small></figcaption>
        </figure>
        <button className="nav-btn" onClick={next} aria-label="Next design">›</button>
        <p className="count" aria-live="polite">{i + 1} / {list.length} · use ← → or swipe</p>
      </div>
    </Modal>
  )
}
