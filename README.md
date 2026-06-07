# Lumina — Landing Page

A beautiful, modern static landing page for **Lumina**, a fictional design system focused on glassmorphism and delightful interfaces.

## Built with Grok Build

This site was planned and created from scratch entirely inside the `playground` git worktree using Grok Build (the AI engineering environment).

**Tech stack:**
- Pure HTML5
- Tailwind CSS (via CDN for zero-build simplicity)
- Custom CSS for advanced glassmorphism effects
- Vanilla JavaScript for interactivity

## Features

- **Modern dark theme** with elegant glassmorphism
- **Fully responsive** (mobile-first)
- **Interactive live demo** — tweak radius, blur, opacity, and accent color in real time
- **Subtle animations** and scroll reveals
- **Mobile navigation**
- **Accessible** (keyboard support, focus states, semantic HTML)
- **Copy-to-clipboard** for the component code

## How to view

1. Open `index.html` directly in your browser (double-click or `open index.html`)
2. Or serve it locally for the best experience:
   ```bash
   # Python
   python -m http.server 8080

   # Node (if available)
   npx serve .
   ```

Then visit http://localhost:8080

## Structure

```
playground/
├── index.html          # Main landing page
├── css/
│   └── style.css       # Glassmorphism + custom polish
├── js/
│   └── main.js         # Interactivity, demo controls, animations
└── README.md
```

## Try the interactive demo

Scroll to the **"Play with Lumina"** section. Adjust the sliders and color swatches — the preview card updates live. You can even copy the generated component HTML.

## Chatbot Page

There's also a full-featured **chatbot interface** at `chat.html`:

- Beautiful glassmorphism chat UI (matches the Lumina style)
- Simulated AI responses (keyword + smart fallbacks)
- Typing indicator, suggested prompts, copy/regenerate
- LocalStorage persistence
- Model switcher (Grok 4 / Lumina 2)
- Fully responsive + keyboard friendly

You can open it directly or link to it from the main landing page.

## Next steps / ideas to extend (with Grok Build)

- Connect the chatbot to a real API (e.g. Grok API, OpenAI, or local LLM)
- Add conversation history persistence across sessions
- Implement streaming responses (fake or real)
- Add voice input or image upload
- Create a multi-agent version
- Turn this into a PWA

## Git context

This lives on the **playground** branch / worktree (separate from `main` and `dev`).

All changes here are isolated until you decide to merge.

---

Built in one focused session with Grok Build. Simple. Beautiful. Powerful. ✨

*Want to iterate? Just tell me what to improve or add next.*