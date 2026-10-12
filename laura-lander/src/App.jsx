import { useRef, useState } from 'react'
import './App.css'

const Arrow = () => <span aria-hidden="true">↗</span>
const strategies = [
  { name: 'Healthcare services', text: 'Essential care. Exceptional potential.', detail: 'We focus on the businesses behind better care: specialist providers, outpatient services, and the infrastructure that connects patients to the care they need.' },
  { name: 'Life sciences', text: 'Backing the next chapter of discovery.', detail: 'Our interest spans the tools, services, and enabling technologies that help scientific breakthroughs move from the laboratory into everyday life.' },
  { name: 'Health technology', text: 'A smarter, more connected system.', detail: 'We look for purposeful technology that improves clinical workflows, expands access, and helps healthcare organizations operate more effectively.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const [ready, setReady] = useState(false)
  const dialog = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', type: 'Individual investor', message: '' })
  const openContact = () => { setMenuOpen(false); setReady(false); dialog.current.showModal() }
  function downloadIntroduction(e) {
    e.preventDefault()
    const text = `NVI — Investor introduction\n\nName: ${form.name}\nEmail: ${form.email}\nInvestor profile: ${form.type}\n\n${form.message}\n\nPrepared locally. This enquiry has not been sent to NVI.`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
    const link = document.createElement('a'); link.href = url; link.download = 'NVI-investor-introduction.txt'; link.click(); URL.revokeObjectURL(url)
    setReady(true)
  }
  return (
    <div className="site-shell">
      <div className="announcement"><div><span className="status-dot" /> A healthier future. A lasting legacy.</div><button onClick={openContact}>Connect with NVI <Arrow /></button></div>
      <header>
        <a className="wordmark" href="#" aria-label="NVI home">NVI<span className="wordmark-dot">.</span></a>
        <span className="brand-caption">HEALTHCARE FOCUSED.<br />FUTURE MINDED.</span>
        <nav aria-label="Main navigation"><a href="#approach">Our approach</a><a href="#focus">Investment focus</a><a href="#partnership">Our partners</a><span className="nav-line" /><button onClick={openContact}>Investor enquiries <Arrow /></button></nav>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span>Menu</span><span className="menu-icon">{menuOpen ? '×' : <><i /><i /><i /><i /></>}</span></button>
      </header>
      {menuOpen && <div className="menu-panel"><span className="eyebrow">EXPLORE NVI</span>{[['Our approach', 'approach'], ['Investment focus', 'focus'], ['Our partners', 'partnership']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<Arrow /></a>)}<button onClick={openContact}>Investor enquiries <Arrow /></button><p>Capital with a longer view.</p></div>}
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <span className="pill"><span className="status-dot" /> PRIVATE CAPITAL. HUMAN IMPACT.</span>
          <h1 id="hero-title">Invest in a healthier world.<br />Build a lasting legacy.</h1>
          <p>Healthcare private equity for those who see beyond the ordinary.<br className="desktop-break" /> We connect private wealth with the possibilities of better health.</p>
          <div className="hero-actions"><a className="button" href="#approach">Discover our approach <Arrow /></a><a className="button" href="#focus">Explore our focus <Arrow /></a><button className="button" onClick={openContact}>Partner with NVI <Arrow /></button></div>
          <div className="hero-foot"><span>CONVICTION IN HEALTHCARE. COMMITMENT TO THE LONG TERM.</span><a href="#approach" aria-label="Scroll to our approach">↓</a></div>
        </section>
        <div className="stripe" />
        <section className="approach section" id="approach">
          <div className="section-heading"><div><span className="eyebrow">01 / THE NVI PERSPECTIVE</span><h2>Purpose meets possibility.</h2></div><p>Good health changes everything. We believe the capital behind it should think just as ambitiously. A focused approach to investing in what matters most.</p></div>
          <div className="feature">
            <div className="feature-copy"><span className="small-tag"><span className="status-dot" /> A LONGER VIEW ON VALUE</span><h3>Better health.<br />Greater possibilities.</h3><p>We bring a private equity perspective to healthcare’s most meaningful opportunities. Partnering with ambitious businesses to build enduring value — for investors, for people, for the future.</p><a className="text-link" href="#focus">Inside our investment philosophy <Arrow /></a><span className="feature-note">SPECIALIST FOCUS. SHARED AMBITION.</span></div>
            <div className="feature-art" role="img" aria-label="Interconnected orbital lines representing long-term growth and human connection"><div className="art-top"><span>NVI / A SHARED FUTURE</span><span>↗</span></div><div className="orbital"><div /><div /><div /><div /><div /><div /><div /><div /><span className="orbital-center">nvi.</span></div><div className="art-bottom"><span>Where human progress<br />and capital come together.</span><span className="art-star">✳</span></div></div>
          </div>
        </section>
        <section className="focus section" id="focus"><div className="section-heading"><div><span className="eyebrow">02 / OUR INVESTMENT FOCUS</span><h2>One sector. A world of opportunity.</h2></div><p>A dedicated healthcare lens. Three connected areas where thoughtful capital can help shape what comes next.</p></div><div className="strategy-layout"><div className="strategy-tabs" aria-label="Investment focus">{strategies.map((strategy, i) => <button key={strategy.name} aria-pressed={selected === i} aria-controls="strategy-detail" onClick={() => setSelected(i)} className={selected === i ? 'active' : ''}><span className="strategy-number">0{i + 1}</span>{strategy.name}<span>↗</span></button>)}</div><div className="strategy-detail" id="strategy-detail" aria-live="polite"><span className="eyebrow">{strategies[selected].name}</span><h3>{strategies[selected].text}</h3><p>{strategies[selected].detail}</p></div></div></section>
        <section className="partnership section" id="partnership"><span className="eyebrow">03 / BUILT AROUND PARTNERSHIP</span><h2>Exceptional ambition.<br />Shared by the right people.</h2><p>For individuals, families, and their advisers who take the long view.<br className="desktop-break" /> A considered partnership, built on alignment and a belief in better.</p><button className="button" onClick={openContact}>Start a conversation <Arrow /></button></section>
      </main>
      <footer><div className="footer-top"><a className="wordmark" href="#">NVI.</a><span>PRIVATE CAPITAL. HUMAN IMPACT.</span><a href="#">Back to top ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NVI. All rights reserved.</span><p>For illustrative purposes. This website is not an offer to invest. Private investments involve risk, including loss of capital.</p></div></footer>
      <dialog ref={dialog} aria-labelledby="enquiry-title" onClick={e => { if (e.target === dialog.current) dialog.current.close() }}><button className="close-dialog" aria-label="Close enquiry" onClick={() => dialog.current.close()}>×</button><span className="eyebrow">LET’S LOOK FORWARD, TOGETHER</span><h2 id="enquiry-title">Your next chapter.</h2><p>Prepare an introduction to NVI. This preview saves your enquiry as a file; it does not send your details.</p><form onSubmit={downloadIntroduction}><label>Full name<input required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>I am an<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Individual investor</option><option>Family office representative</option><option>Investment adviser</option><option>Business founder</option></select></label><label>What would you like to explore?<textarea rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label><button className="button" type="submit">Download introduction <Arrow /></button>{ready && <p className="form-success" role="status">Your introduction is ready. A copy has been downloaded to your device.</p>}</form></dialog>
    </div>
  )
}

export default App
