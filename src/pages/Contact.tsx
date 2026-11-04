import { useRef, useState, type FormEvent } from 'react'
import Room from '../components/Room'
import { config } from '../config'

export default function Contact() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const t0 = useRef(Date.now())
  const links = [
    { label: 'GitHub', href: `https://github.com/${config.github}` },
    config.linkedin && { label: 'LinkedIn', href: config.linkedin },
    config.instagram && { label: 'Instagram', href: config.instagram },
    config.twitter && { label: 'X / Twitter', href: config.twitter },
    config.snapchat && { label: 'Snapchat', href: config.snapchat },
    config.whatsapp && { label: 'WhatsApp', href: config.whatsapp },
    config.email && { label: 'Email', href: `mailto:${config.email}` },
  ].filter(Boolean) as { label: string; href: string }[]

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('company')) return setState('sent') // honeypot
    if (Date.now() - t0.current < 1500) return // too fast to be human
    const name = String(f.get('name')), email = String(f.get('email')), type = String(f.get('type')), msg = String(f.get('message'))
    if (config.formEndpoint) {
      setState('sending')
      try {
        const r = await fetch(config.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: f })
        setState(r.ok ? 'sent' : 'error')
      } catch { setState('error') }
    } else {
      const to = config.email || ''
      location.href = `mailto:${to}?subject=${encodeURIComponent(`${type} enquiry from ${name}`)}&body=${encodeURIComponent(`${msg}\n\n— ${name} (${email})`)}`
      setState('sent')
    }
  }

  return (
    <Room id="contact" title="Contact" description="Commission a design or hire Sexy for full-stack development. Send a message or find me on GitHub.">
      <section className="contact">
        <p className="eyebrow">Contact</p>
        <h1>Let's make something.</h1>
        <ul className="signs">
          {links.map((l, i) => (
            <li key={l.label} style={{ ['--i' as string]: i }}><a className="sign-post" href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>
          ))}
        </ul>
        <p className="direct">
          <a href={`mailto:${config.email}`}>{config.email}</a> · <a href={`tel:+${config.phoneIntl}`}>{config.phone}</a> · WhatsApp <a href={config.whatsapp} target="_blank" rel="noreferrer">{config.phone}</a>
        </p>
        {state === 'sent' ? (
          <div className="ok" role="status">✅ Thank you! {config.formEndpoint ? "I'll reply soon." : 'Your email app should have opened. If it did not, add your email in src/config.ts.'}</div>
        ) : (
          <form onSubmit={submit} className="form">
            <label>Your name<input name="name" required maxLength={80} autoComplete="name" /></label>
            <label>Your email<input name="email" type="email" required maxLength={120} autoComplete="email" /></label>
            <label>I'd like to<select name="type"><option>Commission a design</option><option>Hire for development</option><option>Say hello</option></select></label>
            <label>Message<textarea name="message" required rows={5} maxLength={2000} /></label>
            <input name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
            <button className="btn" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
            {state === 'error' && <p role="alert" className="err">Something went wrong. Please try again or use a link above.</p>}
          </form>
        )}
      </section>
    </Room>
  )
}
