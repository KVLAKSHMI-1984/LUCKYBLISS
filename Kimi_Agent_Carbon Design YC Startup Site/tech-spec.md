# VoxelBio — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.4.0 | Vite React plugin |
| typescript | ^5.7.0 | Type system |
| tailwindcss | ^4.0.0 | Utility CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| gsap | ^3.12.0 | Animation engine (ScrollTrigger, Flip plugins) |
| lenis | ^1.2.0 | Smooth scroll with inertia |
| lucide-react | ^0.468.0 | Icon library (icons match molecular/scientific theme) |

**Fonts** (loaded via Google Fonts CDN in index.html): Inter (400, 500, 600), IBM Plex Mono (400)

**No shadcn/ui** — The design follows strict IBM Carbon Design System principles with custom 2px-radius components, specific border treatments, and a deeply customized dark theme that would require more overrides than value from shadcn primitives.

---

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed top bar with scroll-aware background transition (transparent → blurred). Scroll detection via ScrollTrigger or native scroll listener. |
| Footer | Custom | 5-column grid layout with newsletter form. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | WebGL canvas background + text overlay. Owns MolecularSimulation lifecycle. |
| BrandLogosSection | Custom | Infinite CSS marquee, two duplicated logo sets. |
| ProblemSection | Custom | Narrative with 3 animated stat counters. |
| SolutionSection | Custom | 2×2 feature benefit grid. |
| FeaturesSection | Custom | 4 alternating image/text rows with DualImageHover. |
| MethodSection | Custom | 3×2 card grid with 3D scroll-driven assembly. |
| MetricsSection | Custom | Horizontal bar chart with scroll-triggered width animation. |
| ResearchSection | Custom | 3 stacked editorial steps with large numbers. |
| PlatformSection | Custom | 2 showcase cards (code + viz). Code card uses TypewriterEffect. |
| EnterpriseSection | Custom | 3 cards with scroll-scrubbed 3D flip. |
| IntegrationsSection | Custom | 3×3 grid with parallax hover. |
| TestimonialsSection | Custom | Carousel with dot navigation, auto-play 6s. |
| PricingSection | Custom | 3-tier cards with monthly/annual toggle. |
| FAQSection | Custom | Accordion with single-open behavior. |
| CTASection | Custom | Reuses MolecularSimulation at 30% opacity. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| Button | Custom | All sections — 3 variants (primary/amber, secondary/ghost, tertiary/text-link). |
| SectionHeader | Custom | Most sections — eyebrow label + heading + optional body text. |
| FeatureCard | Custom | MethodSection, IntegrationsSection — 3D-reveal-capable card wrapper. |
| DualImageHover | Custom | FeaturesSection — stacked images with crossfade on hover. |
| MolecularSimulation | Custom | HeroSection, CTASection — imperative Three.js canvas (see animation table). |
| TypewriterEffect | Custom | PlatformSection — character-by-character code reveal. |
| AnimatedCounter | Custom | ProblemSection, MetricsSection — count-up from 0 with easing. |
| BarChart | Custom | MetricsSection — 5 horizontal bars with animated width. |
| TestimonialCarousel | Custom | TestimonialsSection — slide-based with dots, auto-play, pause-on-hover. |
| Accordion | Custom | FAQSection — single-open, height animation. |
| PricingToggle | Custom | PricingSection — monthly/annual switch. |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollReveal | Shared scroll-triggered fade/translate animation. Wraps GSAP ScrollTrigger for the 5 standard reveal patterns (default, fade-in, grid stagger, card-3D, card-flip). Accepts variant, stagger, and delay params. |
| useMousePosition | Normalized mouse coords [-1, 1] for MolecularSimulation parallax and Integration card tilt. |
| useReducedMotion | Detects prefers-reduced-motion media query. Returns boolean to disable animations. |

---

## Animation Implementation

| # | Animation | Library | Approach | Complexity |
|---|-----------|---------|----------|------------|
| 1 | WebGL molecular simulation (hero + CTA) | **Three.js** (raw) | 🔒 Imperative: Custom particle system with 4000 point sprites, additive blending, mouse-position orbit forces. Burst intro animation (force 2500, radius 50, 500ms) then continuous orbit. Canvas managed via ref, lifecycle handled in useEffect. | **High** |
| 2 | Smooth scroll | **Lenis** | Global smooth scroll wrapper in App.tsx. Configure duration 1.2s, easing, sync delay 50ms. Falls back to native on mobile. | **Medium** |
| 3 | Scroll-triggered content reveals (global pattern) | **GSAP + ScrollTrigger** | 🔒 Reusable useScrollReveal hook. ScrollTrigger with start: "top 80%", toggleActions: "play none none none". 5 variants: default (opacity+translateY), fade-in (opacity only), grid-stagger (stagger children), card-3D (rotateX+translateY), card-flip (rotateX scrubbed). | **Medium** |
| 4 | 3D card assembly (Method section) | **GSAP + ScrollTrigger** | 6 cards with individual start transforms (varying rotateY, rotateX, translateZ). Timeline with stagger 100ms. Parent container applies perspective: 1500px. Triggered once on scroll enter. | **High** |
| 5 | 3D card flip (Enterprise section) | **GSAP + ScrollTrigger** | Scroll-scrubbed animation: cards start rotateX(90deg), opacity 0, animate to flat as user scrolls through section. scrub: true on ScrollTrigger. | **High** |
| 6 | Image crossfade hover | **CSS** | Two stacked images in container. Default image opacity 1, hover image opacity 0. Container :hover toggles both opacities. Transition 800ms cubic-bezier(0.23, 1, 0.32, 1). Pure CSS, no JS. | **Low** |
| 7 | Logo marquee | **CSS** | Two identical flex rows in overflow-hidden container. CSS animation: translateX 0 → -50%, linear, infinite, 30s. Duplicate logos ensure seamless loop. Pause on hover via animation-play-state. | **Low** |
| 8 | Stat count-up | **GSAP** | AnimatedCounter component. Uses GSAP tween on a proxy object from 0 → target value over 2000ms with Power2 easing. ScrollTrigger fires once. Display via useState + requestAnimationFrame. | **Medium** |
| 9 | Bar chart grow | **GSAP + ScrollTrigger** | Each bar: width 0% → target%, 1200ms, Power2 Out, stagger 150ms. Value counter synchronized with bar width via same tween proxy. | **Medium** |
| 10 | Typewriter code effect | **Custom** | TypewriterEffect component. setInterval with 30ms per character, triggered by IntersectionObserver. Cleans up on unmount. | **Medium** |
| 11 | Nav background transition | **CSS + JS** | Scroll listener (or ScrollTrigger) past hero height. CSS transition on background-color and backdrop-filter, 300ms ease. | **Low** |
| 12 | Header entrance | **GSAP** | Timeline: logo (500ms, delay 200ms) → nav links stagger (50ms each, from 400ms) → CTA (600ms). All: opacity 0→1, translateY -10→0. | **Low** |
| 13 | Text entrance (hero) | **GSAP** | Timeline: label (600ms, delay 300ms) → heading (800ms, 500ms) → subheading (800ms, 700ms) → CTA (600ms, 900ms). All: opacity + translateY, Power3 Out. | **Low** |
| 14 | Parallax hover (integration cards) | **Custom** | useMousePosition hook. On mousemove over card, compute offset from card center, apply translateX/Y (±8px max) via CSS transform. RAF-driven for smoothness. | **Medium** |
| 15 | Testimonial carousel | **Custom** | State-managed active index. CSS transform: translateX for sliding. Auto-advance via setInterval (6s), cleared on hover. Dot navigation sets active index. | **Medium** |
| 16 | Scroll indicator bounce | **CSS** | @keyframes: translateY 0→8px→0, 2s, infinite, ease-in-out. | **Low** |
| 17 | CTA button pulse | **CSS** | @keyframes: box-shadow 0 0 0 0 rgba(228,168,23,0.4) → 0 0 0 12px rgba(228,168,23,0), 2s, infinite. | **Low** |
| 18 | Accordion expand/collapse | **GSAP** | Height 0→auto tween (400ms, Power2). Icon rotate 0→45deg (300ms). Content opacity fade-in (300ms, 100ms delay). Single-open: GSAP timeline reverses previous item before opening new. | **Medium** |
| 19 | Pricing toggle | **CSS** | translateX on thumb knob, background-color transition. Price swap with CSS opacity crossfade. | **Low** |
| 20 | Hero WebGL burst intro | **Three.js** | Part of animation #1. On mount, apply radial burst force (2500 force, 50 radius) over 500ms, then transition to orbit mode. Managed within the same imperative animation loop. | **High** |

---

## State & Logic Plan

### MolecularSimulation ↔ React Bridge

The WebGL simulation runs **fully outside React's render cycle**. A single `MolecularSimulation` class encapsulates the Three.js scene, particle system, animation loop, and mouse interaction. React provides:

- A container div ref for canvas attachment
- Mouse position (normalized [-1, 1]) via shared ref updated by mousemove listener
- A mount/unmount signal (useEffect) to instantiate and dispose the class
- Reduced-motion flag to pause the RAF loop

The simulation class exposes: `mount(container)`, `unmount()`, `setMouse(x, y)`, `setIntensity(opacity)`, `burst()`. No React state involved in the render loop.

### Lenis ↔ GSAP ScrollTrigger Sync

Lenis must drive ScrollTrigger's scroll position. On Lenis initialization, connect via `lenis.on('scroll', ScrollTrigger.update)` and set `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)`. This ensures all GSAP scroll-triggered animations and Lenis smooth scroll share a single timeline.

### Testimonial Carousel Logic

State: `activeIndex: number`. Auto-advance via `setInterval(6000)`, paused on `mouseenter`, resumed on `mouseleave`. Dots set index directly. Slide transition via CSS `transform: translateX(-${activeIndex * 100}%)` on the track. Mobile: swipe gesture via touchstart/touchend delta detection.

### FAQ Accordion Logic

State: `openIndex: number | null`. GSAP timeline per item: on open, tween height from 0→auto + rotate icon 0→45deg + fade content. On close, reverse timeline. Clicking an item while another is open: first reverse the open item's timeline (complete callback), then play the new item's timeline.

### Pricing Toggle Logic

State: `isAnnual: boolean`. Derived price values computed from base values. Annual = monthly × 0.8. Price display uses AnimatedCounter to count between values on toggle.

---

## Other Key Decisions

**Raw Three.js over React Three Fiber** — The molecular simulation is a single particle system with custom shaders, burst physics, and mouse-driven orbit forces. It has no React scene graph (no components, no props-driven 3D objects). R3F's declarative model adds overhead with no benefit. A class-based imperative approach gives full control over the animation loop and avoids reconciler overhead for 4000 particles.

**No routing library** — Single-page site with 14 scrollable sections. Navigation links use anchor scroll (Lenis `scrollTo`) rather than route changes.

**Image strategy** — Feature section has 8 images (4 default + 4 hover). Use standard `<img>` with lazy loading (loading="lazy") and proper aspect-ratio containers. Hover images load on first mouseenter (preload on mount via `new Image()` to avoid flash).
