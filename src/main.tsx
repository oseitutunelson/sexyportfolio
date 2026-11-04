import { lazy, StrictMode, Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import '@fontsource-variable/fraunces/index.css'
import '@fontsource-variable/inter/index.css'
import './styles.css'
import { AppProvider, useApp } from './store'
import { ThreadCursor, Toast } from './components/Chrome'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Studio = lazy(() => import('./pages/Studio'))
const Contact = lazy(() => import('./pages/Contact'))
const Simple = lazy(() => import('./pages/Simple'))

function Shell() {
  const { disco } = useApp()
  const loc = useLocation()
  useEffect(() => { document.documentElement.classList.toggle('disco', disco) }, [disco])
  useEffect(() => { if (loc.pathname === '/') document.title = 'Sexy — Fashion Designer & Full-Stack Developer' }, [loc.pathname])
  return (
    <>
      <Suspense fallback={<div className="fallback" role="status">Threading the needle…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<Gallery />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/simple" element={<Simple />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <ThreadCursor /><Toast />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter><AppProvider><Shell /></AppProvider></BrowserRouter></StrictMode>,
)
