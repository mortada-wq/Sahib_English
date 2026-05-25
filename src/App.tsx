import './App.css'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <Sidebar>
      <main className="minimal-page">
        <img
          src="/sahib-logo.svg"
          alt="Sahib"
          className="brand-logo"
          width={447}
          height={164}
        />
        <p className="brand-tagline">
          The intelligent companion for the Arabic world.
        </p>
      </main>
    </Sidebar>
  )
}
