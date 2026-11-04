import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { designs, rooms } from '../content'
import { useApp } from '../store'
import { TopBar } from '../components/Chrome'

const badges = ['Solidity', 'JS', 'React', 'Node', 'Ai', '🧵']
const badgeCols = ['#7B4DFF', '#FFC83D', '#3DB8FF', '#2EE6A6', '#FF6B4A', '#FF2E93']

export default function Home() {
  const { unlock, reduced, go } = useApp()
  const [entered, setEntered] = useState(() => sessionStorage.getItem('sexy.entered') === '1')
  return entered ? <Corridor /> : <Entry onEnter={() => { try { sessionStorage.setItem('sexy.entered', '1') } catch { /* */ } unlock('enter'); setEntered(true) }} reduced={reduced} skip={() => go('/simple')} />
}

function Entry({ onEnter, reduced, skip }: { onEnter: () => void; reduced: boolean; skip: () => void }) {
  const left = useRef<SVGGElement>(null), right = useRef<SVGGElement>(null), glow = useRef<SVGRectElement>(null)
  const [opening, setOpening] = useState(false)
  const [hint, setHint] = useState(false)
  const { blip } = useApp()
  useEffect(() => { const t = setTimeout(() => setHint(true), 3000); return () => clearTimeout(t) }, [])
  const open = () => {
    if (opening) return
    setOpening(true); blip(660)
    if (reduced) return onEnter()
    gsap.timeline({ onComplete: onEnter })
      .to(left.current, { scaleX: 0.12, duration: 0.9, ease: 'power3.inOut', transformOrigin: '0% 50%' })
      .to(right.current, { scaleX: 0.12, duration: 0.9, ease: 'power3.inOut', transformOrigin: '100% 50%' }, 0)
      .to(glow.current, { opacity: 1, duration: 0.6 }, 0.2)
      .to('.entry-svg', { scale: 3.2, transformOrigin: '50% 62%', duration: 1.1, ease: 'power3.in' }, 0.5)
      .to('.entry', { opacity: 0, duration: 0.35 }, '>-0.25')
  }
  return (
    <div className="entry" data-room="home">
      <TopBar onHome />
      <h1 className="sr-only">Sexy — Fashion Designer and Full-Stack Developer</h1>
      <div className="entry-stage">
      <svg className="entry-svg" viewBox="0 0 800 600" role="img" aria-label="An atelier boutique storefront with a double door">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--sky1)" /><stop offset="1" stopColor="var(--sky2)" /></linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#sky)" />
        {/* building */}
        <rect x="120" y="120" width="560" height="420" fill="var(--wall)" stroke="var(--ink)" strokeWidth="4" />
        {Array.from({ length: 7 }, (_, r) => Array.from({ length: 9 }, (_, c) => (
          <rect key={`${r}${c}`} x={125 + c * 62 + (r % 2) * 31} y={128 + r * 58} width="56" height="8" fill="var(--brick)" opacity=".25" rx="2" />
        )))}
        {/* awning */}
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${100 + i * 60} 150 h60 l-6 40 q-24 14 -48 0 z`} fill={i % 2 ? 'var(--c2)' : 'var(--c1)'} stroke="var(--ink)" strokeWidth="3" />
        ))}
        {/* sign */}
        <g className="sign">
          <rect x="290" y="62" width="220" height="62" rx="10" fill="var(--ink)" />
          <text x="400" y="106" textAnchor="middle" fontFamily="Fraunces Variable, serif" fontSize="46" fontWeight="800" fill="var(--c3)" letterSpacing="6">SEXY</text>
          <path d="M310 70 H490" stroke="var(--c1)" strokeWidth="2" strokeDasharray="6 5" />
        </g>
        {/* window with mannequin */}
        <rect x="480" y="270" width="150" height="150" fill="var(--glass)" stroke="var(--ink)" strokeWidth="4" rx="6" />
        <g transform="translate(505 282) scale(.45)"><Mannequin /></g>
        <rect x="160" y="270" width="140" height="150" fill="var(--glass)" stroke="var(--ink)" strokeWidth="4" rx="6" />
        <text x="230" y="352" textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontSize="15" fontWeight="700" fill="var(--ink)">DESIGN</text>
        <text x="230" y="374" textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontSize="15" fontWeight="700" fill="var(--c1)">+ CODE</text>
        {/* door frame */}
        <rect x="320" y="230" width="160" height="310" fill="var(--ink)" rx="8" />
        <rect ref={glow} x="328" y="238" width="144" height="302" fill="var(--c3)" opacity="0" rx="4" />
        <g ref={left}><rect x="328" y="238" width="72" height="302" fill="var(--door)" rx="4" stroke="var(--ink)" strokeWidth="3" />
          {badges.slice(0, 3).map((b, i) => <Badge key={b} x={364} y={290 + i * 70} label={b} color={badgeCols[i]} />)}
          <circle cx="392" cy="400" r="5" fill="var(--c3)" /></g>
        <g ref={right}><rect x="400" y="238" width="72" height="302" fill="var(--door)" rx="4" stroke="var(--ink)" strokeWidth="3" />
          {badges.slice(3).map((b, i) => <Badge key={b} x={436} y={290 + i * 70} label={b} color={badgeCols[i + 3]} />)}
          <circle cx="408" cy="400" r="5" fill="var(--c3)" /></g>
        {/* ground & path */}
        <rect x="0" y="540" width="800" height="60" fill="var(--ground)" />
        <path d="M340 540 L460 540 L520 600 L280 600 Z" fill="var(--path)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="120" cy="505" r="26" fill="var(--c4)" /><rect x="116" y="505" width="8" height="40" fill="var(--ink)" />
        <circle cx="690" cy="500" r="30" fill="var(--c5)" /><rect x="686" y="500" width="8" height="45" fill="var(--ink)" />
        {/* clickable door hit area (large) */}
      </svg>
      <button className={`door-hit ${hint ? 'hint' : ''}`} onClick={open} aria-label="Enter the atelier — open the door" autoFocus>
        <span className="door-cta">{opening ? 'Opening…' : hint ? '👆 Tap the door to enter' : 'Open the door'}</span>
      </button>
      </div>
      <div className="entry-bar">
        <span>EXPLORER · Click, tap, or press Enter to open the door</span>
        <button className="linkish" onClick={skip}>Skip to simple view</button>
      </div>
    </div>
  )
}

function Badge({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g transform={`rotate(${(x + y) % 9 - 4} ${x} ${y})`}>
      <rect x={x - 24} y={y - 18} width="48" height="36" rx="10" fill={color} stroke="#fff" strokeWidth="3" />
      <text x={x} y={y + 5} textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontWeight="800" fontSize={label.length > 5 ? 10 : 14} fill="#fff">{label}</text>
    </g>
  )
}

function Mannequin() {
  return (
    <g stroke="var(--ink)" strokeWidth="5" fill="var(--c1)">
      <circle cx="80" cy="30" r="18" fill="var(--paper)" />
      <path d="M50 60 Q80 80 110 60 L125 130 L100 140 L130 300 Q80 320 30 300 L60 140 L35 130 Z" />
      <rect x="76" y="300" width="8" height="70" fill="var(--ink)" />
    </g>
  )
}

/* ---------------- Corridor ---------------- */
type Item = { d: number; side: -1 | 0 | 1; el: React.ReactNode; y?: number }

function Corridor() {
  const { go, unlock, reduced } = useApp()
  const stage = useRef<HTMLDivElement>(null)
  const layers = useRef<(HTMLDivElement | null)[]>([])
  const bar = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLDivElement>(null)
  const doors = useRef<HTMLDivElement>(null)

  const items: Item[] = [
    { d: 0.02, side: -1, y: 52, el: <img src={designs[0].image} alt="" className="g" /> },
    { d: 0.05, side: 1, y: 52, el: <img src={designs[5].image} alt="" className="g tall" /> },
    { d: 0.1, side: 0, y: 22, el: <span className="glyph">{'{ }'}</span> },
    { d: 0.18, side: -1, y: 52, el: <img src={designs[1].image} alt="" className="g" /> },
    { d: 0.2, side: 1, y: 30, el: <span className="glyph">{'</>'}</span> },
    { d: 0.3, side: 1, y: 52, el: <img src={designs[4].image} alt="" className="g" /> },
    { d: 0.32, side: -1, y: 28, el: <span className="glyph">0x</span> },
    { d: 0.42, side: -1, y: 52, el: <img src={designs[7].image} alt="" className="g" /> },
    { d: 0.45, side: 1, y: 26, el: <span className="glyph">{'=>'}</span> },
    { d: 0.55, side: 1, y: 55, el: <button className="spool" aria-label="A hidden spool of thread — click to collect" onClick={() => unlock('spool')}>🧵</button> },
  ]

  useEffect(() => {
    let raf = 0
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
    const update = () => {
      raf = 0
      const el = stage.current!.parentElement!
      const p = clamp(-el.getBoundingClientRect().top / (el.offsetHeight - innerHeight), 0, 1)
      stage.current!.style.setProperty('--p', String(p))
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      if (hero.current) { hero.current.style.opacity = String(clamp(1 - p * 6, 0, 1)); hero.current.style.transform = `scale(${1 + p * 2})` }
      items.forEach((it, i) => {
        const node = layers.current[i]; if (!node) return
        const t = clamp((p - it.d) / 0.42, 0, 1.3)
        const op = t < 0.08 ? t / 0.08 : t > 1 ? clamp(1 - (t - 1) / 0.3, 0, 1) : 1
        const sc = 0.12 + t * 1.9
        const x = it.side * (6 + t * 40)
        node.style.opacity = String(op)
        node.style.transform = `translate(calc(-50% + ${x}vw), -50%) scale(${sc})`
        node.style.pointerEvents = op > 0.6 ? 'auto' : 'none'
        node.style.zIndex = String(Math.round(t * 10))
      })
      if (doors.current) {
        const t = clamp((p - 0.62) / 0.3, 0, 1)
        doors.current.style.opacity = String(t); doors.current.style.transform = `translateY(${(1 - t) * 30}px) scale(${0.85 + t * 0.15})`
        doors.current.style.pointerEvents = t > 0.5 ? 'auto' : 'none'
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update(); addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="corridor-track" data-room="home" style={{ height: reduced ? '250vh' : '520vh' }}>
      <TopBar onHome />
      <div className="stage" ref={stage}>
        <div className="floor" aria-hidden="true" /><div className="wall wl" aria-hidden="true" /><div className="wall wr" aria-hidden="true" /><div className="ceil" aria-hidden="true" />
        <div className="vanish" aria-hidden="true" />
        <div className="hero" ref={hero}>
          <h1>SEXY</h1>
          <p>Fashion designer <i>&amp;</i> full-stack developer</p>
          <span className="scroll-hint">Scroll to walk the runway ↓</span>
        </div>
        {items.map((it, i) => (
          <div key={i} className="obj" ref={n => { layers.current[i] = n }} style={{ top: `${it.y ?? 50}%`, left: '50%' }}>{it.el}</div>
        ))}
        <div className="doors" ref={doors}>
          <h2>Choose a door</h2>
          <div className="door-row">
            {rooms.map(r => (
              <button key={r.path} className="room-door" data-room={r.theme} onClick={() => go(r.path)}>
                <span className="knob" />{r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="progress" aria-hidden="true"><div ref={bar} /></div>
      </div>
    </div>
  )
}
