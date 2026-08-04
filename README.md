# Kanchetti Ajay — Portfolio Website

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Site-00b49f?style=for-the-badge)](https://ajaykanchetti.github.io/portfolio/)

> Personal portfolio of **Kanchetti Ajay** — AI/ML Engineer  
> Built with HTML · CSS · JavaScript — no frameworks, no build step.

---

## 🔗 Live Demo

👉 **[https://ajaykanchetti.github.io/portfolio/](https://ajaykanchetti.github.io/portfolio/)**

---

## ✨ Features

- Neural-network animated hero background (Canvas API)
- Dark / Light theme toggle (persists via localStorage)
- Smooth scroll-reveal animations
- Fully responsive — mobile friendly
- Contact form (opens email client via `mailto:`)
- Downloadable resume

---

## 📁 Structure

```
portfolio/
├── index.html          Main page (About, Skills, Projects, Education, Contact)
├── style.css           All styling — dark & light themes
├── script.js           Canvas animation, scroll reveals, theme toggle, mobile nav
├── assets/
│   ├── profile.jpg                 Profile photo
│   └── Ajay_Kanchetti_Resume.pdf   Downloadable resume
└── README.md
```

---

## 🚀 Run Locally

Just open `index.html` in any browser — no server needed.  
For live-reload while editing:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 🌐 Deploy (GitHub Pages)

1. Push to a GitHub repo.
2. Go to **Settings → Pages** → set source to `main` branch, root folder.
3. Site goes live at `https://<your-username>.github.io/portfolio/`

---

## 🎨 Customize

| What | Where |
|------|-------|
| Colors / fonts | `:root` variables in `style.css` |
| All content | Sections in `index.html` |
| Resume | Replace `assets/Ajay_Kanchetti_Resume.pdf` |
| Photo | Replace `assets/profile.jpg` |

---

© 2026 Kanchetti Ajay
