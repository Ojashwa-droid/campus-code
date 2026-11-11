import { useEffect, useRef } from "react";
import * as THREE from "three";

export function RainbowPrismWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- WebGL Shaders ---
    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        // Normalized aspect-corrected coordinate
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        // Boosted radial chromatic distortion
        float d = length(p) * (distortion * 2.5);
        
        // Chromatic aberration coordinate offsets for red, green, blue
        float rx = p.x * (1.0 + d * 1.5);
        float gx = p.x;
        float bx = p.x * (1.0 - d * 1.5);

        // Wave heights
        float ry = p.y + sin((rx + time) * xScale) * yScale;
        float gy = p.y + sin((gx + time) * xScale) * yScale;
        float by = p.y + sin((bx + time) * xScale) * yScale;

        // Doubled glow line thickness (0.10 vs original 0.05)
        float r = 0.10 / max(abs(ry), 0.001);
        float g = 0.10 / max(abs(gy), 0.001);
        float b = 0.10 / max(abs(by), 0.001);

        // Blinding white core tracking the exact center of the wave
        float cy = p.y + sin((p.x + time) * xScale) * yScale;
        float core = 0.035 / max(abs(cy), 0.001);
        core = pow(core, 1.35); // Sharp, intense white core line

        // Combine chromatic glow with blinding center core
        vec3 color = vec3(r + core, g + core, b + core);

        // Smooth contrast & vignette
        color = clamp(color, 0.0, 3.5);

        // Output with additive feel onto pure black
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // pitch black transparent clear
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      time: { value: 0.0 },
      xScale: { value: 0.55 },     // Much wider, smooth wave (ripples removed)
      yScale: { value: 0.35 },     // Smooth height elevation
      distortion: { value: 0.095 } // Aggressive chromatic aberration at edges
    };

    const position = [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0
    ];

    const positions = new THREE.BufferAttribute(new Float32Array(position), 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", positions);

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- Handle Resize ---
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.set(width, height);
    };

    window.addEventListener("resize", onResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    const animate = () => {
      uniforms.time.value += 0.007; // Smooth ambient progression
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30 mix-blend-screen"
    />
  );
}
