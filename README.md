# 🧑‍💻 Mohamed Yasin — Portfolio

A personal developer portfolio built with vanilla HTML, CSS, and JavaScript. Fully responsive, mobile-first, and styled with a neo-brutalist design system.

---

## 🚀 Live Preview

> Deploy on [GitHub Pages](https://pages.github.com/), [Vercel](https://vercel.com/), or [Netlify](https://netlify.com/) — no build step required.

---

## 📁 Folder Structure

```
portfolio-main/
├── index.html        # Main HTML file (all sections)
├── css/
│   └── main.css      # All styles + responsive breakpoints
├── js/
│   └── main.js       # Animations, nav, form, scroll logic
└── img/
    └── photo.jpg     # Profile photo
```

---

## ✨ Features

- **Fixed top bar** — Header + marquee ticker scroll together as one unit
- **Animated marquee strip** — Scrolling skills/location ticker below the nav
- **Scroll-reveal animations** — Elements fade/slide in as you scroll using IntersectionObserver
- **Hero floating card** — Animated developer ID card with floating badges
- **Hamburger mobile nav** — Full-screen overlay menu for mobile
- **Contact form** — With loading state and toast notification (backend coming soon)
- **Neo-brutalist design** — Bold borders, yellow accents, chunky shadows
- **Fully responsive** — Tested at 420px, 576px, 768px, and 1024px breakpoints

---

## 🛠 Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Markup     | HTML5                       |
| Styling    | CSS3 (custom properties, grid, flexbox) |
| Scripting  | Vanilla JavaScript (ES6+)   |
| Icons      | Font Awesome 6              |
| Fonts      | Space Grotesk (Google Fonts)|

---

## 🏃 Run Locally

No install or build tools needed.

```bash
# Clone the repo
git clone https://github.com/your-username/portfolio.git

# Open in browser
cd portfolio-main
open index.html
```

Or just drag `index.html` into your browser.

---

## 📬 Contact Form

The form currently shows a **"Backend coming soon"** toast on submit.  
To wire it up for real, replace the `setTimeout` block in `js/main.js` with:

- [EmailJS](https://www.emailjs.com/) — free, no backend needed
- [Formspree](https://formspree.io/) — simple POST endpoint
- Your own REST API / Node.js backend

---

## 📱 Responsive Breakpoints

| Breakpoint | Target               |
|------------|----------------------|
| `1024px`   | Tablets landscape    |
| `768px`    | Tablets portrait     |
| `576px`    | Most phones          |
| `420px`    | Small phones (SE)    |

---

## 🙋 Author

**Mohamed Yasin**  
Full-Stack Developer — Chennai, India  
Open to Work 🟢

---

## 📄 License

This project is open source and free to use for personal portfolios.
