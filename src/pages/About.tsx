import Room from '../components/Room'
import { skills } from '../content'
import { config } from '../config'

export default function About() {
  return (
    <Room id="about" title="About" description="Sexy is a fashion designer who works in Adobe Illustrator and a full-stack developer building with Solidity, JavaScript and React.">
      <section className="about">
        <div className="paperdoll" aria-hidden="true">
          <svg viewBox="0 0 220 360">
            <g stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round">
              <circle cx="110" cy="55" r="34" fill="#F6C9A0" />
              <path d="M76 50 Q110 -5 144 50 Q130 30 110 30 Q90 30 76 50Z" fill="var(--c2)" />
              <path d="M70 100 Q110 120 150 100 L170 215 L140 220 L152 330 L68 330 L80 220 L50 215 Z" fill="var(--c1)" />
              <path d="M70 200 H150" stroke="var(--c3)" strokeWidth="9" />
              <path d="M150 112 Q190 150 175 200" fill="none" stroke="var(--c4)" strokeWidth="6" strokeDasharray="1 9" strokeLinecap="round" />
              <rect x="70" y="330" width="30" height="22" fill="var(--ink)" /><rect x="120" y="330" width="30" height="22" fill="var(--ink)" />
            </g>
          </svg>
          <span className="doll-tag tape">📏</span><span className="doll-tag laptop">💻</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h1>I stitch fashion and code together.</h1>
          <p>
            I'm <b>Sexy</b> — a fashion designer and full-stack developer. I sketch collections as vector
            illustrations in Adobe Illustrator, then build the tools, sites and smart contracts to show them to the world.
            My collections so far are football kits, street wear and leather; womenswear and swimwear are next. My code is Solidity, JavaScript and React, from the interface to the server.
          </p>
          <p>I'm open to design commissions and freelance development. {/* TODO: add your location, education and awards here */}</p>
          <ul className="chips" aria-label="Skills">
            {skills.map(s => <li key={s.name} style={{ ['--chip' as string]: s.color }}>{s.name}</li>)}
          </ul>
          <p><a className="btn" href={`https://github.com/${config.github}`} target="_blank" rel="noreferrer">GitHub @{config.github} ↗</a></p>
        </div>
      </section>
    </Room>
  )
}
