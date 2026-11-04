import { useEffect, type ReactNode } from 'react'
import { useApp } from '../store'
import { HireButton, TopBar } from './Chrome'

export default function Room({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  const { unlock } = useApp()
  useEffect(() => {
    document.title = `${title} — Sexy | Fashion Designer & Developer`
    const m = document.querySelector('meta[name=description]'); m?.setAttribute('content', description)
    unlock(id)
  }, [id, title, description, unlock])
  return (
    <div className="room" data-room={id}>
      <TopBar />
      <main id="main" className="room-main">{children}</main>
      <HireButton />
    </div>
  )
}
