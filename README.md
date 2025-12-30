# Anuj Kulkarni — Personal Portfolio

This site is a living, single-page snapshot of my work as a data science and machine learning engineer. It focuses on who I am, what I build, and how to reach me backed by small interactive touches like the particle canvas, animated neural net, and a persisted light/dark theme toggle.

## At a Glance

- Live site (Vercel): https://anuj-kulkarni-portfolio.vercel.app/
- Focus: my skills, selected projects, writing, experience timeline, and contact options
- Style: Space Grotesk typography with interactive background/illustration accents

## What You’ll Find

- Hero section that introduces me and what I do
- Subtle motion: particle backdrop and a playful neural network illustration
- Skills cloud with levels to show where I’m strongest
- Project highlights with links to the repos
- Featured Medium article I’m proud of
- Short experience timeline
- Simple ways to reach me: contact form (Web3Forms) or direct email

## Tech

- HTML, CSS, JavaScript (no frameworks)
- Web3Forms for contact submissions

## View or Tweak Locally

1. Clone: `git clone https://github.com/steam-bell-92/Portfolio.git`
2. Open `index.html` directly, or serve locally for cleaner caching/CORS:
   - Python: `python -m http.server 8000`
   - Node: `npx serve` or `npx http-server`
3. Personalize links in `index.html` (GitHub, LinkedIn, resume, Medium, archive).

## Personalization Notes

- Contact form: replace the `access_key` in `index.html` with your Web3Forms key.
- Resume: point the Download Resume button to your latest PDF.
- SEO/analytics: add meta tags or scripts in the `<head>` as desired.

## File Guide

- index.html — sections for hero, skills, projects, blog, experience, contact
- styles.css — theming, layout, animations, responsive rules
- script.js — theme persistence, particle background, contact form handling

## Deployment

Static hosting is enough (Vercel, Netlify, GitHub Pages, Cloudflare Pages). Deploy the repo root; no server-side code is required.