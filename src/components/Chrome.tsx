import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ACHIEVEMENTS, useApp } from '../store'
import { rooms } from '../content'

/** Needle-and-thread cursor: a short fading coloured trail. Off on touch / reduced motion. */
export function ThreadCursor() {
  const ref = useRef<HTMLCanvasElement>(null)
  const { reduced } = useApp()
  useEffect(() => {
    if (reduced || matchMedia('(pointer: coarse)').matches) return
    const cv = ref.current!, ctx = cv.getContext('2d')!
    const pts: { x: number; y: number; t: number }[] = []
    const size = () => { cv.width = innerWidth; cv.height = innerHeight }
    size(); addEventListener('resize', size)
    const move = (e: PointerEvent) => pts.push({ x: e.clientX, y: e.clientY, t: performance.now() })
    addEventListener('pointermove', move)
    let raf = 0
    const cols = ['#FF2E93', '#7B4DFF', '#FFC83D', '#2EE6A6']
    const draw = (now: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      while (pts.length && now - pts[0].t > 600) pts.shift()
      ctx.lineCap = 'round'; ctx.lineWidth = 3
      for (let i = 1; i < pts.length; i++) {
        const a = 1 - (now - pts[i].t) / 600
        ctx.strokeStyle = cols[i % cols.length]; ctx.globalAlpha = Math.max(a, 0)
        ctx.beginPath(); ctx.moveTo(pts[i - 1].x, pts[i - 1].y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(draw) }
    document.addEventListener('visibilitychange', onVis); raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('pointermove', move); document.removeEventListener('visibilitychange', onVis) }
  }, [reduced])
  return <canvas ref={ref} className="thread" aria-hidden="true" />
}

export function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div className="toast" role="status">
      <span className="confetti" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</span>
      🏆 Achievement unlocked: <b>{toast}</b>
    </div>
  )
}

/** Top bar: back / map / sound / theme / achievements. */
export function TopBar({ onHome }: { onHome?: boolean }) {
  const { go, sound, setSound, theme, toggleTheme, unlocked } = useApp()
  const [map, setMap] = useState(false)
  const [ach, setAch] = useState(false)
  const loc = useLocation()
  useEffect(() => { setMap(false); setAch(false) }, [loc.pathname])
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMap(false); setAch(false) } }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        {!onHome && <button className="icon-btn" onClick={() => go('/')} aria-label="Back to the corridor">←</button>}
        <span className="grow" />
        <button className="icon-btn" aria-label={sound ? 'Mute sound' : 'Unmute sound'} aria-pressed={sound} onClick={() => setSound(!sound)}>{sound ? '🔊' : '🔇'}</button>
        <button className="icon-btn" aria-label="Toggle light/dark theme" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
        <button className="icon-btn" aria-label="Achievements" aria-expanded={ach} onClick={() => { setAch(!ach); setMap(false) }}>🏆<small>{unlocked.length}</small></button>
        <button className="icon-btn" aria-label="Open map" aria-expanded={map} onClick={() => { setMap(!map); setAch(false) }}>☰</button>
      </header>
      {/* real crawlable links */}
      <nav className="sr-only" aria-label="Rooms">
        <a href="/">Home</a>{rooms.map(r => <a key={r.path} href={r.path}>{r.label}</a>)}<a href="/simple">Simple view</a>
      </nav>
      {map && <PatternMap onClose={() => setMap(false)} />}
      {ach && (
        <div className="panel" role="dialog" aria-label="Achievements">
          <button className="close" onClick={() => setAch(false)} aria-label="Close">✕</button>
          <h2>Achievements</h2>
          <ul className="ach">
            {Object.entries(ACHIEVEMENTS).map(([id, a]) => (
              <li key={id} className={unlocked.includes(id) ? 'on' : ''}>{unlocked.includes(id) ? '✅' : '🔒'} <b>{a.title}</b> <span>{a.hint}</span></li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

function PatternMap({ onClose }: { onClose: () => void }) {
  const { go } = useApp()
  const first = useRef<HTMLButtonElement>(null)
  useEffect(() => first.current?.focus(), [])
  const here = location.pathname
  return (
    <div className="mapwrap" onClick={onClose}>
      <div className="pattern-sheet" role="dialog" aria-modal="true" aria-label="Map" onClick={e => e.stopPropagation()}>
        <button ref={first} className="close" onClick={onClose} aria-label="Close map">✕</button>
        <h2>Pattern map</h2>
        <svg className="notches" viewBox="0 0 100 4" aria-hidden="true"><path d="M0 2 H100" /></svg>
        <div className="pieces">
          {rooms.map((r, i) => (
            <button key={r.path} className={`piece p${i}`} data-room={r.theme} aria-current={here.startsWith(r.path) ? 'page' : undefined}
              onClick={() => { onClose(); go(r.path) }}>
              <span>{r.label}</span>{here.startsWith(r.path) && <em>📍 you are here</em>}
            </button>
          ))}
        </div>
        <button className="linkish" onClick={() => { onClose(); go('/') }}>↩ Back to the corridor</button>
        <a className="linkish" href="/simple">Simple view (no animation)</a>
      </div>
    </div>
  )
}

export function HireButton() {
  const { go } = useApp()
  const loc = useLocation()
  if (loc.pathname.startsWith('/contact')) return null
  return <button className="hire" onClick={() => go('/contact')}>✂ Hire me / Commission a design</button>
}
