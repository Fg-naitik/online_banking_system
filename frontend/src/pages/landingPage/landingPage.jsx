import { Link } from "react-router-dom";
import { useState } from 'react';
import './landingPage.css';
import '../../styles/global.css';

/* ── Inline SVG Icons ── */
const LogoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 12 L8 4 L14 12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 8 L11 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 3" stroke="#0288d1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5L2 3.5v4c0 2.8 2.2 4.8 5 5.5 2.8-.7 5-2.7 5-5.5v-4L7 1.5z" stroke="#10b981" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1 6h10M7 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'Is APNA BANK a secure digital banking platform?', a: 'Yes. APNA BANK uses advanced encryption, multi-factor authentication, and real-time monitoring to ensure secure banking transactions.' },
    { q: 'How can I transfer money using APNA BANK?', a: 'You can transfer money instantly using UPI, NEFT, IMPS, RTGS, and beneficiary account transfers through our digital banking platform.' },
    { q: 'Are there any account maintenance charges?', a: 'APNA BANK offers zero-balance savings accounts with minimal service charges and complete transparency.' },
    { q: 'Can I apply for debit and credit cards?', a: 'Yes. Customers can apply for physical and virtual debit cards, credit cards, and manage them directly through the APNA BANK portal.' },
  ];

  return (
    <div className="landing">

      {/* ── NAVBAR ── */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="logo-icon"><LogoIcon /></div>
          APNA BANK
        </div>
        <ul className="nav-links">
          <li><a href="/about">About</a></li>
          <li><a href="/emi-calculator">EMI Calculator</a></li>
          <li><a href="/support">Support</a></li>
        </ul>
        <div className="nav-actions">

            <Link to="/login"><button className="btn-ghost">Login</button></Link>
            <Link to="/register"><button className="btn-primary">Register</button></Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            India's Trusted AI-Powered Digital Banking Platform
          </div>
          <h1 className="hero-title">
            BANK SMARTER,{' '}
            <span className="highlight">SAVE FASTER</span>{' '}
            ,INVEST BETTER.
          </h1>
          <p className="hero-subtitle">Experience secure banking, instant payments,smart savings, AI-powered financial insights,and personalized financial solutions —all in one platform.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary">
              Get started <ArrowRight />
            </button>
            <button className="btn-hero-secondary">
              Explore banking services
            </button>
          </div>
          <div className="hero-trust">
            <span className="trust-item">
              <ShieldIcon /> Bank grade security
            </span>
            <span className="trust-item">
              <ShieldIcon /> 256-bit Encryption
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-phone-mockup">
            <div className="phone-inner">
              <div className="phone-chart-visual">
                <div className="chart-bars">
                  <div className="chart-bar" style={{height:'45px'}}></div>
                  <div className="chart-bar" style={{height:'60px', opacity:'0.6'}}></div>
                  <div className="chart-bar" style={{height:'35px', opacity:'0.7'}}></div>
                  <div className="chart-bar" style={{height:'80px'}}></div>
                  <div className="chart-bar" style={{height:'50px', opacity:'0.6'}}></div>
                  <div className="chart-bar" style={{height:'70px', opacity:'0.8'}}></div>
                </div>
                <div style={{width:'160px', height:'2px', background:'rgba(255,255,255,0.1)', borderRadius:'2px'}}></div>
              </div>
            </div>
          </div>
          <div className="savings-badge">
            <span className="badge-label">SAVINGS GROWTH</span>
            +24.8%
          </div>
        </div>
      </section>

      {/* ── PRESS LOGOS ── */}
      <section className="press-section">
        <div className="press-inner">
          {['AI POWERED', 'UPI ENABLED', 'BANK GRADE SECURITY', 'SMART ANALYTICS', 'DIGITAL WALLET'].map(logo => (
            <span key={logo} className="press-logo">{logo}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <h2 className="section-title">Banking Solutions Designed for Modern India</h2>
        <p className="section-subtitle">
          Combining trust, innovation, and security to deliver a seamless digital banking experience for the modern world.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon purple">⚡</div>
            <h3>Instant UPI transfer</h3>
            <p>Send money across borders or to your friend in 0.9 seconds. Zero lag, zero stress.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon pink">✨</div>
            <h3>AI-Powered Smart Savings</h3>
            <p>Our AI analyzes your spending habits and helps you achieve your financial goals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon green">🛡️</div>
            <h3>Enterprise Grade Security</h3>
            <p>Biometric authentication, fraud detection,and real-time transaction monitoring.</p>
          </div>
        </div>
      </section>

      {/* ── AI CO-PILOT ── */}
      <section className="copilot-section">
        <div className="copilot-chat">
          <div className="chat-card">
            <div className="chat-header">
              <div className="chat-avatar">A</div>
              <div>
                <div className="chat-name">APNA AI Financial Assistant</div>
                <div className="chat-sub">Online</div>
              </div>
            </div>
            <div className="chat-bubble ai">Hello Naitik,your monthly spending increased by 12%.Would you like me to create a savings plan to help you achieve your financial goals?</div>
            <div className="chat-bubble user">
              That's a great idea! Can you automate that for me?
            </div>
            <div className="chat-bubble ai">
              Great! Based on your transactions, I recommend saving ₹5,000 every month to achieve your financial goals.
            </div>
            <div className="chat-input-bar">
              <input type="text" placeholder="Ask me anything about your spending..." readOnly />
              <div className="chat-send-btn"><SendIcon /></div>
            </div>
          </div>
        </div>

        <div className="copilot-content">
          <h2>Your AI-Powered banking Assistant</h2>
          <p>
            Our AI-powered assistant helps you manage expenses, track spending habits, receive personalized financial insights, and make smarter banking decisions securely.
          </p>
          <ul className="copilot-features">
            {[
              'Smart Expense Tracking',
              'AI-Based Savings Suggestionss',
              'Personalized Loan Offers',
              '24/7 Financial Support',
            ].map(item => (
              <li key={item}>
                <span className="check-dot"><CheckIcon /></span>
                {item}
              </li>
            ))}
          </ul>
          <button className="btn-learn-more">Try AI Assistant</button>
        </div>
      </section>

      {/* ── MOBILE APP ── */}
      <section className="mobile-section">
        <h2 className="section-title">banking designed for your digital lifestyle</h2>
        <p className="section-subtitle">
          Experience secure, fast, and intelligent banking with a seamless digital platform designed for modern customers.
        </p>
        <div className="mobile-mockup-wrapper">
          <div className="mobile-phones-group">
            <div className="phone-small">
              <div className="phone-screen-inner">
                <div className="mini-chart">
                  <div className="mini-bar teal" style={{height:'24px'}}></div>
                  <div className="mini-bar orange" style={{height:'16px'}}></div>
                  <div className="mini-bar blue" style={{height:'32px'}}></div>
                  <div className="mini-bar teal" style={{height:'20px'}}></div>
                </div>
              </div>
            </div>
            <div className="phone-large">
              <div className="phone-screen-inner" style={{flexDirection:'column', gap:'8px', padding:'12px'}}>
                <div style={{width:'80%', height:'8px', background:'rgba(41,182,246,0.5)', borderRadius:'4px'}}></div>
                <div style={{width:'60%', height:'6px', background:'rgba(255,255,255,0.15)', borderRadius:'4px'}}></div>
                <div style={{width:'70%', height:'6px', background:'rgba(255,255,255,0.1)', borderRadius:'4px'}}></div>
                <div style={{marginTop:'8px', display:'flex', gap:'6px', alignItems:'flex-end'}}>
                  <div style={{width:'14px', height:'40px', background:'rgba(41,182,246,0.7)', borderRadius:'3px 3px 0 0'}}></div>
                  <div style={{width:'14px', height:'28px', background:'rgba(41,182,246,0.4)', borderRadius:'3px 3px 0 0'}}></div>
                  <div style={{width:'14px', height:'52px', background:'rgba(41,182,246,0.8)', borderRadius:'3px 3px 0 0'}}></div>
                  <div style={{width:'14px', height:'36px', background:'rgba(41,182,246,0.5)', borderRadius:'3px 3px 0 0'}}></div>
                </div>
              </div>
            </div>
            <div className="phone-small">
              <div className="phone-screen-inner" style={{flexDirection:'column', gap:'6px', padding:'10px'}}>
                <div style={{width:'100%', height:'6px', background:'rgba(255,255,255,0.15)', borderRadius:'3px'}}></div>
                <div style={{width:'80%', height:'6px', background:'rgba(255,255,255,0.1)', borderRadius:'3px'}}></div>
                <div style={{width:'90%', height:'6px', background:'rgba(41,182,246,0.4)', borderRadius:'3px'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="testimonials-header">
          <h2 className="section-title">Trusted by 10+ Million Smart Indians</h2>
          <p className="section-subtitle" style={{textAlign:'left', marginLeft:0}}>
            Join the millions who've switched to APKA BANK
          </p>
          <p className="app-rating">⭐ 4.9/5 Customer Satisfaction
                                    🔒 RBI Compliant & Secure
                                    🏦 10M+ Active Users
            </p>
        </div>
        <div className="testimonials-grid">
          {[
            { text: '"APNA BANK helped me save ₹15,000 in just 4 months using AI budgeting suggestions."', name: 'Aarav Sharma', role: 'Engineering Student', initial: 'A' },
            { text: '"The UPI transfers are incredibly fast and the dashboard is very easy to use."', name: 'Priya Verma', role: 'Software Engineer', initial: 'P' },
            { text: '"I manage my business payments, loans, and savings all from one app."', name: 'Rohit Agarwal', role: 'Business Owner', initial: 'R' },
          ].map(({ text, name, role, initial }) => (
            <div key={name} className="testimonial-card">
              <p className="testimonial-text">{text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{initial}</div>
                <div>
                  <div className="author-name">{name}</div>
                  <div className="author-role">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="faq-inner">
          <h2 className="section-title">Common Questions</h2>
          <p className="section-subtitle">Find answers to common questions about APNA BANK services and digital banking.</p>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className={`faq-question${openFaq === i ? ' open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="faq-arrow"><ChevronDown /></span>
                </button>
                <div className={`faq-answer${openFaq === i ? ' visible' : ''}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <h2>Bank Smarter, Live Better.</h2>
        <p>Open your APNA BANK account in just a few minutes and enjoy secure, fast, and hassle-free digital banking services..</p>
        <div className="cta-actions">
          <button className="btn-cta-white">Open Your Account</button>
        </div>
        <div className="cta-meta">
          <div className="cta-avatars">
            {['A','B','C','D'].map(l => (
              <div key={l} className="cta-avatar">{l}</div>
            ))}
          </div>
          <span className="cta-count">Trusted by 10M+ customers across India</span>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="logo-icon"><LogoIcon /></div>
              APNA BANK
            </div>
            <p>Secure, smart and digital banking solutions for modern India.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Savings Account</a></li>
              <li><a href="#">Personal Loans</a></li>
              <li><a href="#">Fixed Deposits</a></li>
              <li><a href="#">Credit Cards</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Security Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">24×7 Helpline</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 APNA BANK. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}