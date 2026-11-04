import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const safeGet = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const safeSet = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* private mode */ } }

export const ACHIEVEMENTS: Record<string, { title: string; hint: string }> = {
  enter: { title: 'Welcome in', hint: 'Open the boutique door' },
  about: { title: 'Meet the maker', hint: 'Visit About' },
  gallery: { title: 'Front row', hint: 'Visit The Gallery' },
  studio: { title: 'Behind the seams', hint: 'Visit The Studio' },
  contact: { title: 'Say hello', hint: 'Visit Contact' },
  recolour: { title: 'Colour theory', hint: 'Recolour a design in the Studio' },
  spool: { title: 'Thread hunter', hint: 'Find the hidden spool in the corridor' },
  lookbook: { title: 'Page turner', hint: 'Open the Lookbook' },
  disco: { title: 'Secret runway', hint: 'Try the Konami code' },
}

type Ctx = {
  go: (path: string) => void
  unlock: (id: string) => void
  unlocked: string[]
  toast: string | null
  sound: boolean
  setSound: (v: boolean) => void
  blip: (f?: number) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  reduced: boolean
  disco: boolean
}
const C = createContext<Ctx>(null as unknown as Ctx)
export const useApp = () => useContext(C)

export function AppProvider({ children }: { children: ReactNode }) {
  const nav = useNavigate()
  const curtain = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const reduced = useMemo(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const [unlocked, setUnlocked] = useState<string[]>(() => { try { return JSON.parse(safeGet('sexy.ach') || '[]') } catch { return [] } })
  const [toast, setToast] = useState<string | null>(null)
  const [sound, setSoundState] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (safeGet('sexy.theme') as 'light' | 'dark') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [disco, setDisco] = useState(false)
  const audio = useRef<AudioContext | null>(null)
  const unlockedRef = useRef(unlocked)
  unlockedRef.current = unlocked

  useEffect(() => { document.documentElement.dataset.theme = theme; safeSet('sexy.theme', theme) }, [theme])

  const unlock = useCallback((id: string) => {
    if (unlockedRef.current.includes(id) || !ACHIEVEMENTS[id]) return
    const next = [...unlockedRef.current, id]
    unlockedRef.current = next
    setUnlocked(next); safeSet('sexy.ach', JSON.stringify(next))
    setToast(ACHIEVEMENTS[id].title)
    setTimeout(() => setToast(null), 3200)
  }, [])

  const blip = useCallback((f = 520) => {
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const a = audio.current, o = a.createOscillator(), g = a.createGain()
      o.type = 'triangle'; o.frequency.value = f
      g.gain.setValueAtTime(0.06, a.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.18)
      o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + 0.2)
    } catch { /* audio unavailable */ }
  }, [sound])

  // Fabric-wipe transition between rooms
  const go = useCallback((path: string) => {
    if (busy.current) return
    if (location.pathname === path) return
    const el = curtain.current
    if (!el || reduced) { nav(path); window.scrollTo(0, 0); return }
    busy.current = true
    blip(330)
    gsap.timeline({ onComplete: () => { busy.current = false } })
      .set(el, { display: 'block', yPercent: 100, borderRadius: '50% 50% 0 0' })
      .to(el, { yPercent: 0, borderRadius: '0%', duration: 0.55, ease: 'power3.inOut' })
      .add(() => { nav(path); window.scrollTo(0, 0) })
      .to(el, { yPercent: -100, borderRadius: '0 0 50% 50%', duration: 0.6, ease: 'power3.inOut', delay: 0.12 })
      .set(el, { display: 'none' })
  }, [nav, reduced, blip])

  // Konami code
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      i = e.key === seq[i] ? i + 1 : e.key === seq[0] ? 1 : 0
      if (i === seq.length) { i = 0; setDisco(true); unlock('disco'); setTimeout(() => setDisco(false), 10000) }
    }
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey)
  }, [unlock])

  const value: Ctx = {
    go, unlock, unlocked, toast, sound, setSound: setSoundState, blip, theme,
    toggleTheme: () => setTheme(t => (t === 'light' ? 'dark' : 'light')), reduced, disco,
  }
  return (
    <C.Provider value={value}>
      {children}
      <div ref={curtain} className="curtain" aria-hidden="true" />
    </C.Provider>
  )
}
