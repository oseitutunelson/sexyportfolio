import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Room from '../components/Room'
import { designs } from '../content'
import { useApp } from '../store'

const backdrops = ['#FFF4E6', '#FF2E93', '#7B4DFF', '#FFC83D', '#2EE6A6', '#3DB8FF', '#2B1B3D', '#FFFFFF']
const presets = [
  { name: 'Original', hue: 0, sat: 100, bri: 100 },
  { name: 'Sunset', hue: 320, sat: 140, bri: 105 },
  { name: 'Mint', hue: 140, sat: 120, bri: 105 },
  { name: 'Ocean', hue: 200, sat: 130, bri: 100 },
  { name: 'Gold rush', hue: 45, sat: 150, bri: 110 },
  { name: 'Mono', hue: 0, sat: 0, bri: 105 },
]

export default function Studio() {
  const [params] = useSearchParams()
  const start = Math.max(0, designs.findIndex(d => d.slug === params.get('design')))
  const [idx, setIdx] = useState(start)
  const d = designs[idx]
  const [hue, setHue] = useState(0)
  const [sat, setSat] = useState(100)
  const [bri, setBri] = useState(100)
  const [bg, setBg] = useState(backdrops[0])
  const [view, setView] = useState<'studio' | 'board'>('studio')
  const imgRef = useRef<HTMLImageElement>(null)
  const { unlock, blip } = useApp()
  const filter = `hue-rotate(${hue}deg) saturate(${sat}%) brightness(${bri}%)`
  const touch = () => unlock('recolour')

  const exportPng = () => {
    const img = imgRef.current; if (!img || !img.naturalWidth) return
    const pad = Math.round(Math.max(img.naturalWidth, img.naturalHeight) * 0.06)
    const cv = document.createElement('canvas'); cv.width = img.naturalWidth + pad * 2; cv.height = img.naturalHeight + pad * 2
    const ctx = cv.getContext('2d')!
    ctx.fillStyle = bg; ctx.fillRect(0, 0, cv.width, cv.height)
    ctx.filter = filter
    ctx.drawImage(img, pad, pad)
    cv.toBlob(b => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `${d.slug}-colourway.png`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000) })
  }

  return (
    <Room id="studio" title="Studio" description="Try colourways on Sexy's football kit designs, change the backdrop, download your version, or browse the mood board.">
      <section className="studio">
        <p className="eyebrow">The Studio</p>
        <h1>Colourway Lab</h1>
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={view === 'studio'} onClick={() => setView('studio')}>🎨 Colourways</button>
          <button role="tab" aria-selected={view === 'board'} onClick={() => setView('board')}>📌 Mood board</button>
        </div>

        {view === 'studio' ? (
          <div className="cs">
            <div className="cs-stage" style={{ background: bg }}>
              <img ref={imgRef} src={d.image} alt={`${d.title} with custom colourway`} style={{ filter }} className="cs-img" />
            </div>
            <div className="cs-controls">
              <fieldset><legend>Design</legend>
                <div className="pills">{designs.map((x, i) => <button key={x.slug} aria-pressed={i === idx} onClick={() => setIdx(i)}>{x.title}</button>)}</div>
              </fieldset>
              <fieldset><legend>Quick colourways</legend>
                <div className="pills">{presets.map(p => <button key={p.name} onClick={() => { setHue(p.hue); setSat(p.sat); setBri(p.bri); touch(); blip(400 + p.hue) }}>{p.name}</button>)}</div>
              </fieldset>
              <fieldset><legend>Fine tune</legend>
                <label className="slider">Hue <input type="range" min={0} max={360} value={hue} onChange={e => { setHue(+e.target.value); touch() }} /><output>{hue}°</output></label>
                <label className="slider">Saturation <input type="range" min={0} max={200} value={sat} onChange={e => { setSat(+e.target.value); touch() }} /><output>{sat}%</output></label>
                <label className="slider">Brightness <input type="range" min={50} max={150} value={bri} onChange={e => { setBri(+e.target.value); touch() }} /><output>{bri}%</output></label>
              </fieldset>
              <fieldset><legend>Backdrop</legend>
                <div className="swatch-grid">
                  {backdrops.map(c => <button key={c} className="sw" style={{ background: c }} aria-label={`Backdrop ${c}`} aria-pressed={bg === c} onClick={() => setBg(c)} />)}
                  <label className="sw custom" title="Pick any colour"><input type="color" value={bg} onChange={e => setBg(e.target.value)} aria-label="Custom backdrop colour" /></label>
                </div>
              </fieldset>
              <div className="row">
                <button className="btn" onClick={exportPng}>⬇ Download PNG</button>
                <button className="btn ghost" onClick={() => { setHue(0); setSat(100); setBri(100); setBg(backdrops[0]) }}>Reset</button>
              </div>
            </div>
          </div>
        ) : <MoodBoard />}
      </section>
    </Room>
  )
}

const notes = ['pinstripe energy', 'zip-up panels', '{ solidity }', 'club colours', 'wide-leg pants', 'ship it ✂', 'react + illustrator', 'number 10']
function MoodBoard() {
  const [pos, setPos] = useState(() => notes.map((_, i) => ({ x: (i % 4) * 22 + 3, y: Math.floor(i / 4) * 40 + 4, r: ((i * 37) % 11) - 5 })))
  const [list, setList] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ i: number; dx: number; dy: number } | null>(null)
  const down = (i: number) => (e: React.PointerEvent) => {
    const r = boardRef.current!.getBoundingClientRect()
    drag.current = { i, dx: e.clientX - (r.left + pos[i].x / 100 * r.width), dy: e.clientY - (r.top + pos[i].y / 100 * r.height) }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return
    const r = boardRef.current!.getBoundingClientRect()
    const x = Math.min(82, Math.max(0, (e.clientX - d.dx - r.left) / r.width * 100))
    const y = Math.min(85, Math.max(0, (e.clientY - d.dy - r.top) / r.height * 100))
    setPos(p => p.map((q, k) => (k === d.i ? { ...q, x, y } : q)))
  }
  return (
    <div>
      <button className="btn small ghost" onClick={() => setList(!list)} aria-pressed={list}>{list ? 'Show board' : 'Show as list'}</button>
      {list ? (
        <ul className="plain-list">{designs.map(d => <li key={d.slug}><b>{d.title}</b> — {d.tags.join(', ')}</li>)}{notes.map(n => <li key={n}>{n}</li>)}</ul>
      ) : (
        <div className="board" ref={boardRef} onPointerMove={move} onPointerUp={() => (drag.current = null)} aria-label="Draggable mood board">
          {designs.slice(0, 6).map((d, i) => (
            <div key={d.slug} className="pin sketch" style={{ left: `${(i * 17 + 6) % 76}%`, top: `${(i * 29 + 18) % 62}%`, transform: `rotate(${(i % 3) * 4 - 4}deg)` }}>
              <img src={d.image} alt={d.title} className="mini" loading="lazy" decoding="async" />
            </div>
          ))}
          {notes.map((n, i) => (
            <div key={n} className="pin note" tabIndex={0} onPointerDown={down(i)}
              style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%`, transform: `rotate(${pos[i].r}deg)`, background: ['#FFC83D', '#2EE6A6', '#FF6B4A', '#3DB8FF'][i % 4] }}>{n}</div>
          ))}
        </div>
      )}
    </div>
  )
}
