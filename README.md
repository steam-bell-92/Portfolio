# My Portfolio

A personal portfolio website showcasing my work and skills.

## Overview

This is a simple portfolio built with HTML, CSS, and JavaScript. It displays my projects, experience, and contact information in a clean and organized way.

## Structure

- `index.html` - Main page
- `styles.css` - Styling
- `script.js` - Functionality

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development server (optional, for better experience)

### Run Locally

#### Option 1: Direct (Simplest)
1. Clone the repository:
   ```bash
   git clone https://github.com/steam-bell-92/Portfolio.git
   cd Portfolio
   ```
2. Open `index.html` directly in your browser

#### Option 2: Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```
Then visit `http://localhost:8000`

## 🔧 Configuration

### Contact Form
The contact form uses Web3Forms. To use your own:
1. Create an account at [web3forms.com](https://web3forms.com)
2. Get your access key
3. Update the `access_key` in `index.html` contact form

### Customize
- **Personal Info**: Update name, email, and social links in `index.html`
- **Skills**: Modify skill tags in the skills section
- **Projects**: Add/remove project cards in the projects section
- **Theme Colors**: Edit CSS variables in `styles.css` (`:root` selector)

## 📱 Responsive Breakpoints

| Device | Width | Features |
|--------|-------|----------|
| **Mobile** | < 768px | Single column, hamburger menu, optimized touch |
| **Tablet** | 768px - 1024px | 2-column grid, full navigation |
| **Desktop** | > 1024px | Full layout, enhanced animations |

## 🎯 Performance Optimizations

- ✅ Lightweight codebase (< 50KB total)
- ✅ Optimized particle animations with requestAnimationFrame
- ✅ CSS Grid & Flexbox for efficient layouts
- ✅ Lazy loading with Intersection Observer
- ✅ Minimal external dependencies
- ✅ Optimized images and SVGs

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |
| IE 11 | - | ⚠️ Partial |

## 🔐 Security

- Contact form submissions are secure via Web3Forms
- No sensitive data stored locally
- No external tracking scripts
- Clean, maintainable code

## 📚 Key Code Examples

### Dark/Light Theme Toggle
```javascript
const applyTheme = () => {
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
};
```

### Intersection Observer for Animations
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
```

### Particle Animation
```javascript
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}
```

## 🎓 Learning Resources

This portfolio demonstrates:
- Semantic HTML5
- Modern CSS3 (Grid, Flexbox, Animations)
- ES6+ JavaScript (async/await, Arrow functions, Classes)
- Web APIs (Canvas, localStorage, Intersection Observer)
- Responsive Design
- Accessibility (ARIA labels, semantic HTML)

## 📈 Future Enhancements

Potential improvements:
- [ ] TypeScript for type safety
- [ ] Build system (Webpack/Vite)
- [ ] CSS preprocessor (SASS/PostCSS)
- [ ] Dynamic project loading
- [ ] Blog section integration
- [ ] Dark mode system preference detection
- [ ] PWA support

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Submit issues for bugs or suggestions
- Fork and create pull requests
- Share feedback and improvements

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Anuj Kulkarni**
- GitHub: [@steam-bell-92](https://github.com/steam-bell-92)
- LinkedIn: [Anuj Chandrakant Kulkarni](https://linkedin.com/in/anuj-chandrakant-kulkarni)
- Email: anujck45@gmail.com
- Medium: [@anujck45](https://medium.com/@anujck45)

## 📞 Support

For questions or support, feel free to:
- Open an issue on GitHub
- Send an email
- Connect on LinkedIn

---

**Last Updated**: May 7, 2026  
**Version**: 2.0 (Redesigned & Enhanced)