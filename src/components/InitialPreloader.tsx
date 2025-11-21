/**
 * Initial Preloader Injector
 * 
 * CRITICAL: This creates a static HTML preloader that appears BEFORE React renders
 * Uses document.write() for truly instant display (executes during HTML parsing)
 * 
 * The preloader will be automatically hidden when React's Preloader component mounts
 */

const preloaderHTML = `
<div id="initial-preloader" style="
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0E172A 0%, #0B2F2B 50%, #0E172A 100%);
  opacity: 1;
  transition: opacity 0.5s ease-out;
">
  <div style="
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  ">
    <!-- Logo Container -->
    <div style="
      position: relative;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 1.5rem;
      padding: 3rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    ">
      <div style="
        position: relative;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #3B945E, #0077B6);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        animation: pulse 2s ease-in-out infinite;
      ">
        <span style="font-size: 3rem;">🌱</span>
      </div>
    </div>

    <!-- Brand Name -->
    <div style="text-align: center;">
      <h1 style="
        font-size: 2.25rem;
        color: white;
        margin-bottom: 0.5rem;
        letter-spacing: 0.05em;
        font-weight: 600;
        margin-top: 0;
      ">AGROGUARD</h1>
      <p style="
        font-size: 1.125rem;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 400;
        margin: 0;
      ">IoT Monitoring System</p>
    </div>

    <!-- Spinner -->
    <div style="
      width: 3rem;
      height: 3rem;
      border: 3px solid transparent;
      border-top-color: #3B945E;
      border-right-color: #3B945E;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    "></div>

    <!-- Loading Text -->
    <p style="
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      margin: 0;
      animation: pulse 1.5s ease-in-out infinite;
    ">Loading Application...</p>

    <!-- Tagline -->
    <p style="
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
      max-width: 28rem;
      padding: 0 1rem;
      margin: 0;
    ">Revolutionizing Agriculture with Smart IoT Technology</p>
  </div>

  <style>
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(0.95); }
    }
  </style>
</div>
`;

// Inject immediately using document.write if we're still parsing
// This is the ONLY way to get truly instant display
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Check if we're still in parsing phase
  if (document.readyState === 'loading') {
    // We're still parsing - use document.write for INSTANT display
    document.write(preloaderHTML);
  } else {
    // Document already loaded, inject via DOM
    function injectPreloader() {
      if (document.getElementById('initial-preloader')) return;
      
      const div = document.createElement('div');
      div.innerHTML = preloaderHTML;
      const preloader = div.firstElementChild;
      
      if (preloader && document.body) {
        document.body.insertBefore(preloader, document.body.firstChild);
      }
    }
    
    if (document.body) {
      injectPreloader();
    } else {
      document.addEventListener('DOMContentLoaded', injectPreloader);
    }
  }
}

// Export empty component (this file is just for side effects)
export default function InitialPreloaderInjector() {
  return null;
}
