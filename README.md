## The Planets – Interactive 3D Planet Gallery

An interactive 3D experience showcasing four unique planets (Earth, Venus, Volcanic, Csilla) using Three.js and GSAP. Users scroll to smoothly rotate between planets while the UI updates with corresponding titles and descriptions.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Screenshots](#screenshots)
5. [Getting Started](#getting-started)
6. [How It Works](#how-it-works)
7. [Customization](#customization)
8. [License](#license)

---

## Features

### Visual Experience
- **Four Unique 3D Planets**  
  - High-quality textured spheres featuring Earth, Venus, Volcanic, and Csilla
  - Photorealistic rendering with proper lighting and shadows
  - Each planet positioned in a circular orbital arrangement

- **Immersive Environment**
  - HDRI-based environment lighting using RGBELoader for photorealistic reflections
  - Dynamic starfield background creating a deep space atmosphere
  - Professional preloader with animated planet and starfield background

### Interaction & Animation
- **Intuitive Scroll Navigation**
  - Smooth scroll-based planet rotation in precise 90° increments
  - Intelligent debouncing system (2-second delay) for controlled navigation
  - Bi-directional scrolling support (forward and backward)

- **Fluid Animations**
  - GSAP-powered smooth transitions for all movements
  - Synchronized rotation of planet group and UI elements
  - Continuous self-rotation for each planet creating lifelike motion

### User Interface
- **Responsive Design**
  - Mobile-friendly layout adapting to all screen sizes
  - Custom typography using Bellina and Gilroy fonts
  - Tailwind CSS for modern, utility-first styling

- **Dynamic Content Display**
  - Animated planet titles with elegant transitions
  - Contextual descriptions that update with each planet
  - Minimal, distraction-free interface design

---

## Tech Stack

### Core Technologies
- **[Three.js](https://threejs.org/)** – Industry-standard WebGL 3D library for rendering planets and environment
- **[GSAP](https://gsap.com/)** – Professional-grade animation library for smooth transitions
- **[Vite](https://vitejs.dev/)** – Next-generation frontend build tool with lightning-fast HMR

### Styling & Assets
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework (CDN)
- **Custom Typography** – Bellina and Gilroy fonts for elegant text rendering
- **HDRI Environment Maps** – High-quality HDR textures from Poly Haven
- **Planet Textures** – Detailed surface textures for realistic planet appearance

---

## Project Structure

```bash
the-planets/
├─ index.html              # Main HTML file with UI overlay and canvas
├─ main.js                 # Three.js scene setup, preloader, and interaction logic
├─ style.css               # Global styles, animations, and custom fonts
├─ package.json            # Dependencies and build scripts
├─ public/
│  ├─ csilla/
│  │  └─ color.png         # Csilla planet texture
│  ├─ earth/
│  │  └─ map.jpg           # Earth surface texture
│  ├─ venus/
│  │  └─ map.jpg           # Venus surface texture
│  ├─ volcanic/
│  │  └─ color.png         # Volcanic planet texture
│  ├─ fonts/
│  │  ├─ Bellina.ttf       # Display font for headings
│  │  └─ Gilroy.ttf        # UI font for descriptions
│  └─ stars.jpg            # Starfield background texture
└─ README.md               # Project documentation
```

---

## Screenshots

![The Planets – 3D Gallery](./assets/screenshots/the-planets.png)

*Interactive 3D planet gallery with smooth scroll-based navigation*

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node)

### Install Dependencies

From the project root:

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173/`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## How It Works

### Initial Setup
1. **Scene Initialization**
   - `PerspectiveCamera` with 25° FOV positioned at optimal viewing distance
   - `WebGLRenderer` with antialiasing enabled for smooth edges
   - Pixel ratio optimization for crisp rendering on high-DPI displays

2. **Asset Loading & Preloader**
   - Professional preloader displays animated starfield background
   - Progress tracking for all assets (1 HDR + 4 planet textures + 1 star texture)
   - Smooth fade-out transition when loading completes

3. **Environment Setup**
   - HDR environment map loaded via `RGBELoader` for photorealistic lighting
   - Inverted sphere geometry (50 units radius) textured with starfield
   - HDRI provides ambient lighting and reflections on planet surfaces

### Planet System
4. **Planet Generation**
   - Four high-resolution sphere geometries (64 segments for smooth appearance)
   - `MeshStandardMaterial` for physically-based rendering
   - Circular orbital arrangement using trigonometric positioning
   - All planets grouped in `THREE.Group` for synchronized rotation

### Interaction System
5. **Scroll-Based Navigation**
   - Wheel event listener captures user scroll input
   - Direction detection from `event.deltaY` (positive = down, negative = up)
   - Debounce mechanism prevents rapid successive rotations
   - `scrollCount` index cycles through planets (0-3 with modulo wrapping)

6. **Animation Choreography**
   - GSAP animates planet group rotation (90° Y-axis per step)
   - Synchronized vertical slide of heading and description elements
   - Expo easing for smooth, natural motion
   - All animations complete in 1 second for consistent feel

7. **Render Loop**
   - `requestAnimationFrame` for smooth 60fps rendering
   - Individual planet rotation using elapsed time for continuous motion
   - Automatic resize handling for responsive behavior

---

## Customization

### Adding New Planets
1. Add your texture file to the appropriate folder (e.g., `public/newplanet/texture.jpg`)
2. Update the `textures` array in `main.js`:
   ```javascript
   const textures = [
     './csilla/color.png',
     './earth/map.jpg',
     './venus/map.jpg',
     './volcanic/color.png',
     './newplanet/texture.jpg'
   ];
   ```
3. Add corresponding heading and description in `index.html`
4. Update `totalAssets` count in the preloader section

### Adjusting Interaction
- **Scroll Sensitivity**: Modify `delay` variable (default: 2000ms)
- **Animation Speed**: Change GSAP `duration` parameter (default: 1 second)
- **Easing Functions**: Experiment with GSAP easings (`expo`, `power2`, `elastic`, etc.)
- **Rotation Angle**: Adjust the `Math.PI / 2` value for different rotation increments

### Visual Customization
- **Camera Settings**: Adjust FOV (`25`), position (`z: 9`), or near/far clipping planes
- **Orbit Configuration**: Modify `orbitRadius` (default: 4.5) for tighter/wider arrangement
- **Planet Size**: Change `radius` variable (default: 1.3) for larger/smaller planets
- **Background**: Replace `stars.jpg` with your own starfield or nebula texture
- **Lighting**: Swap HDRI URL for different ambient lighting moods
- **Preloader**: Customize colors in gradient values within `style.css`

---

## Acknowledgments

- **HDR Environment Maps** – [Poly Haven](https://polyhaven.com/)
- **Three.js Community** – For excellent documentation and examples
- **GSAP** – For the industry-leading animation library

---

## License

This project is open source and available for learning and portfolio purposes.

**Third-party assets used in this project are subject to their respective licenses.**

---

## Author

**Made with ❤️ by [Kaushik Verma](https://www.kaushikverma.com/)**

Full-stack developer passionate about creating immersive web experiences.

- Portfolio: [kaushikverma.me](https://www.kaushikverma.com/)
- GitHub: [@kaushikverma](https://github.com/kaushikverma)

---

<div align="center">
  <sub>⭐ Star this repository if you found it helpful!</sub>
</div>

