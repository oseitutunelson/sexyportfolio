import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { designs, projects, skills } from '../content'
import { DesignArt } from './Gallery'
import { config } from '../config'

/** Fast, accessible, no-motion fallback with all the content. */
export default function Simple() {
  useEffect(() => { document.title = 'Sexy — Simple view' }, [])
  return (
    <main id="main" className="simple">
      <a className="skip" href="#main">Skip to content</a>
      <h1>Sexy — Fashion Designer &amp; Full-Stack Developer</h1>
      <p>Adobe Illustrator for design; Solidity, JavaScript and React for code. <Link to="/">Enter the interactive atelier →</Link></p>
      <h2>Skills</h2>
      <ul className="chips">{skills.map(s => <li key={s.name} style={{ ['--chip' as string]: s.color }}>{s.name}</li>)}</ul>
      <h2>Fashion designs</h2>
      <ul className="simple-grid">{designs.map(d => <li key={d.slug}><DesignArt d={d} className="art" /><b>{d.title}</b><br />{d.blurb}</li>)}</ul>
      <h2>Code</h2>
      <ul>{projects.map(p => <li key={p.slug}><b>{p.title}</b> — {p.summary}</li>)}</ul>
      <h2>Contact</h2>
      <p><a href={`https://github.com/${config.github}`}>GitHub @{config.github}</a> · <a href={`mailto:${config.email}`}>{config.email}</a> · <a href={`tel:+${config.phoneIntl}`}>{config.phone}</a> · <a href={config.whatsapp}>WhatsApp</a> · <a href={config.instagram}>Instagram</a> · <a href={config.twitter}>X / Twitter</a> · <a href={config.snapchat}>Snapchat</a> · <Link to="/contact">Message form</Link></p>
    </main>
  )
}
