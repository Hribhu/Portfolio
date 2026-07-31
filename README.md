# Varun Shah — Portfolio

A single-page portfolio site built with plain HTML, CSS and JavaScript — no build step, no framework, no dependencies. Open `index.html` and it just works.

**Live sections:** Hero · About · Experience · Projects · Skills · Credentials · Contact

## Design concept — "Signal to Insight"

The site's visual identity ties directly to the two halves of Varun's background: Electronics & Telecommunication (signal, transmission, networks) and data analytics (dashboards, insight, decisions). A few things carry that idea through the page:

- **Hero waveform** — an animated canvas strip that morphs from a raw waveform into discrete data bars, left to right.
- **Signal-strength skill bars** — skills are rated with 1–5 signal bars instead of generic progress rings.
- **Liquid-metal background** — a fixed, blurred grayscale texture sits behind the whole page, with glassmorphic (frosted) panels layered on top for cards and sections.
- **Chrome title text** — the hero name uses a slow-shifting silver gradient to echo the background texture.

## File structure

```
varun-portfolio/
├── index.html          All page content and structure
├── style.css            All styling, design tokens, and responsive rules
├── script.js             Nav behavior, skill bars, scroll reveals, hero canvas animation
├── varun-portrait.jpg    Hero portrait photo
├── varun-beach.jpg       About section photo
├── marble-bg.jpg         Fixed background texture (liquid-metal / signal motif)
└── README.md             This file
```

All five assets must stay in the same folder as `index.html` — the site uses relative paths like `varun-portrait.jpg`, not a subfolder.

## Running it locally

No build tools needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve it locally for a closer-to-production preview:
  ```bash
  cd varun-portfolio
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## Deploying

Any static host works since this is plain HTML/CSS/JS:

- **Netlify / Vercel** — drag and drop the whole `varun-portfolio` folder onto the dashboard.
- **GitHub Pages** — push the folder to a repo and enable Pages on the `main` branch.

## Customizing

| To change... | Edit... |
|---|---|
| Text content (bio, experience, projects, skills, links) | `index.html` |
| Colors, fonts, spacing, layout, animations | `style.css` (design tokens are declared at the top under `:root`) |
| Skill proficiency levels | `data-level="1–5"` attributes on `.bars` elements in `index.html` |
| Nav behavior, hero canvas animation, scroll reveals | `script.js` |
| Photos or background texture | Replace the `.jpg` files, keeping the same filenames (or update the `src`/`url()` references) |

### Color tokens (in `style.css`)

```css
--bg: #0A0D14;        /* base background */
--amber: #F0A94E;     /* "signal" accent */
--teal: #45D9C4;      /* "insight" accent */
--glass: rgba(255,255,255,0.035);   /* frosted panel fill */
```

## Contact links

LinkedIn and GitHub are wired up in two places — the hero (`.hero-social`) and the Contact section (`.contact-links`) — both pointing to:

- LinkedIn: https://www.linkedin.com/in/varun-shah-5a2b922b0
- GitHub: https://github.com/Hribhu

## Browser support

Built with modern CSS (`backdrop-filter`, CSS custom properties, `background-clip: text`). Works in current Chrome, Edge, Firefox and Safari. `prefers-reduced-motion` is respected — animations are disabled for users who request it.
