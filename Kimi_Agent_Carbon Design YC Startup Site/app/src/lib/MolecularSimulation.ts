import * as THREE from 'three';

export class MolecularSimulation {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particles: THREE.Points;
  private particlePositions: Float32Array;
  private particleVelocities: Float32Array;
  private particleOriginalPositions: Float32Array;
  private mouse = { x: 0, y: 0 };
  private targetMouse = { x: 0, y: 0 };
  private animationId: number | null = null;
  private container: HTMLElement | null = null;
  private time = 0;
  private intensity = 1;
  private isBursting = false;
  private burstTime = 0;
  private reducedMotion = false;

  constructor(particleCount = 4000) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.z = 30;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const geometry = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(particleCount * 3);
    this.particleVelocities = new Float32Array(particleCount * 3);
    this.particleOriginalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 20;

      this.particlePositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      this.particlePositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      this.particlePositions[i3 + 2] = r * Math.cos(phi);

      this.particleOriginalPositions[i3] = this.particlePositions[i3];
      this.particleOriginalPositions[i3 + 1] = this.particlePositions[i3 + 1];
      this.particleOriginalPositions[i3 + 2] = this.particlePositions[i3 + 2];

      this.particleVelocities[i3] = (Math.random() - 0.5) * 0.02;
      this.particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      this.particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    // Custom shader material for glowing particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#24a148') },
        uOpacity: { value: 1 },
      },
      vertexShader: `
        attribute float size;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float dist = length(mvPosition.xyz);
          vAlpha = 1.0 - smoothstep(10.0, 40.0, dist);
          gl_PointSize = max(1.5, (3.0 * (1.0 - dist / 50.0)));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 1.5);
          float alpha = glow * vAlpha * uOpacity * 0.7;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Burst animation
    this.burst();
  }

  mount(container: HTMLElement) {
    this.container = container;
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';
    this.resize();
    this.animate();

    window.addEventListener('resize', this.resize);
  }

  unmount() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
    if (this.container && this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
    this.particles.geometry.dispose();
    (this.particles.material as THREE.ShaderMaterial).dispose();
  }

  setMouse(x: number, y: number) {
    this.targetMouse.x = x;
    this.targetMouse.y = y;
  }

  setIntensity(value: number) {
    this.intensity = value;
  }

  setReducedMotion(value: boolean) {
    this.reducedMotion = value;
  }

  burst() {
    this.isBursting = true;
    this.burstTime = 0;
    const count = this.particlePositions.length / 3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      const upAngle = (Math.random() - 0.5) * Math.PI;

      this.particleVelocities[i3] = Math.cos(angle) * Math.cos(upAngle) * speed;
      this.particleVelocities[i3 + 1] = Math.sin(upAngle) * speed;
      this.particleVelocities[i3 + 2] = Math.sin(angle) * Math.cos(upAngle) * speed;
    }
  }

  private resize = () => {
    if (!this.container) return;
    const w = this.container.offsetWidth;
    const h = this.container.offsetHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    if (this.reducedMotion) return;

    this.time += 0.005;
    const count = this.particlePositions.length / 3;

    // Smooth mouse interpolation
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Burst phase
    if (this.isBursting) {
      this.burstTime += 0.016;
      const burstDecay = Math.exp(-this.burstTime * 3);

      if (this.burstTime > 2) {
        this.isBursting = false;
      }

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        this.particlePositions[i3] += this.particleVelocities[i3] * burstDecay;
        this.particlePositions[i3 + 1] += this.particleVelocities[i3 + 1] * burstDecay;
        this.particlePositions[i3 + 2] += this.particleVelocities[i3 + 2] * burstDecay;

        // Dampen velocities
        this.particleVelocities[i3] *= 0.98;
        this.particleVelocities[i3 + 1] *= 0.98;
        this.particleVelocities[i3 + 2] *= 0.98;
      }
    } else {
      // Orbit around mouse position
      const mx = this.mouse.x * 15;
      const my = this.mouse.y * 10;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const px = this.particlePositions[i3];
        const py = this.particlePositions[i3 + 1];
        const pz = this.particlePositions[i3 + 2];

        // Distance to mouse target
        const dx = px - mx;
        const dy = py - my;
        const dz = pz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Orbital force
        const orbitSpeed = 0.3 / (dist + 1);
        const angle = this.time * (1 + (i % 3) * 0.3);

        this.particleVelocities[i3] += (-dy * orbitSpeed - dx * 0.001) * 0.1;
        this.particleVelocities[i3 + 1] += (dx * orbitSpeed - dy * 0.001) * 0.1;
        this.particleVelocities[i3 + 2] += (Math.sin(angle + i) * 0.01) * 0.1;

        // Apply velocity with damping
        this.particlePositions[i3] += this.particleVelocities[i3];
        this.particlePositions[i3 + 1] += this.particleVelocities[i3 + 1];
        this.particlePositions[i3 + 2] += this.particleVelocities[i3 + 2];

        this.particleVelocities[i3] *= 0.99;
        this.particleVelocities[i3 + 1] *= 0.99;
        this.particleVelocities[i3 + 2] *= 0.99;

        // Gentle return to orbit radius
        const targetR = 10 + (i % 5) * 3;
        const currentR = Math.sqrt(px * px + py * py + pz * pz);
        const returnForce = (targetR - currentR) * 0.0005;
        this.particlePositions[i3] += (px / (currentR + 0.1)) * returnForce;
        this.particlePositions[i3 + 1] += (py / (currentR + 0.1)) * returnForce;
        this.particlePositions[i3 + 2] += (pz / (currentR + 0.1)) * returnForce;
      }
    }

    // Update geometry
    const positions = this.particles.geometry.attributes.position.array as Float32Array;
    positions.set(this.particlePositions);
    this.particles.geometry.attributes.position.needsUpdate = true;

    // Slowly rotate the entire particle system
    this.particles.rotation.y = this.time * 0.1;
    this.particles.rotation.x = Math.sin(this.time * 0.05) * 0.1;

    // Update shader uniforms
    const mat = this.particles.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = this.time;
    mat.uniforms.uOpacity.value = this.intensity;

    this.renderer.render(this.scene, this.camera);
  };
}
