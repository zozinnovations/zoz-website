// Main JavaScript
import './style.css'

console.log('ZOZ Innovations Website Loaded');

// Smooth scroll for anchor links (if browser support needed, but CSS handles most)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Exit-intent lead-capture popup
(function initLeadModal() {
    const modal = document.getElementById('leadModal');
    if (!modal) return;

    const KEY = 'zoz_lead_seen';
    const COOLDOWN_DAYS = 14;
    const CONTACT_EMAIL = 'info@zozinnovations.com';
    // Web3Forms delivers each submission straight to CONTACT_EMAIL — no visitor action needed.
    // Get a free access key at https://web3forms.com (register it with info@zozinnovations.com), then paste it here.
    // Empty = falls back to opening the visitor's own mail client addressed to CONTACT_EMAIL.
    const WEB3FORMS_ACCESS_KEY = '7fff21eb-6362-41da-af41-117a8d58afde';

    const seen = () => {
        try {
            const t = localStorage.getItem(KEY);
            return t && (Date.now() - Number(t)) < COOLDOWN_DAYS * 864e5;
        } catch (_) { return false; }
    };
    const remember = () => { try { localStorage.setItem(KEY, String(Date.now())); } catch (_) {} };

    let shown = false;
    function open() {
        if (shown || seen()) return;
        shown = true;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        remember();
    }
    function close() {
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    // Desktop: exit intent (mouse leaves the top of the viewport)
    document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget && e.clientY <= 0) open();
    });

    // Mobile fallback: 55% scroll depth AND 30s dwell (no exit-intent on touch)
    let dwellOk = false;
    setTimeout(() => { dwellOk = true; }, 30000);
    window.addEventListener('scroll', () => {
        const depth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (dwellOk && depth > 0.55) open();
    }, { passive: true });

    modal.querySelectorAll('[data-lead-close]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });

    const form = document.getElementById('leadForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        if (WEB3FORMS_ACCESS_KEY) {
            try {
                await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_ACCESS_KEY,
                        subject: 'New project plan request — zozinnovations.com',
                        from_name: 'ZOZ website',
                        email,
                        message: message || '(none)'
                    })
                });
            } catch (_) { /* fail quietly; still confirm to the visitor */ }
        } else {
            const body = encodeURIComponent(`Email: ${email}\n\nIdea: ${message || '(none)'}`);
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project plan request from zozinnovations.com')}&body=${body}`;
        }
        form.hidden = true;
        document.getElementById('leadSuccess').hidden = false;
    });
})();
