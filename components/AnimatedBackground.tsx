'use client';

import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const maxx = window.innerWidth;
    const maxy = window.innerHeight;
    const halfx = maxx / 2;
    const halfy = maxy / 2;
    const dotCount = 200;
    const dots: Dot[] = [];

    canvas.width = maxx;
    canvas.height = maxy;

    class Dot {
      rad_x: number;
      rad_y: number;
      alpha: number;
      speed: number;
      size: number;
      color: number;

      constructor() {
        this.rad_x = 2 * Math.random() * halfx + 1;
        this.rad_y = 1.2 * Math.random() * halfy + 1;
        this.alpha = Math.random() * 360 + 1;
        this.speed = Math.random() * 100 < 50 ? 1 : -1;
        this.speed *= 0.1;
        this.size = Math.random() * 5 + 1;
        this.color = Math.floor(Math.random() * 256);
      }

      draw() {
        const dx = halfx + this.rad_x * Math.cos((this.alpha / 180) * Math.PI);
        const dy = halfy + this.rad_y * Math.sin((this.alpha / 180) * Math.PI);
        context!.fillStyle = `rgb(${this.color},${this.color},${this.color})`;
        context!.fillRect(dx, dy, this.size, this.size);
      }

      move() {
        this.alpha += this.speed;
        if (Math.random() * 100 < 50) {
          this.color += 1;
        } else {
          this.color -= 1;
        }
      }
    }

    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot());
    }

    function render() {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, maxx, maxy);
      for (let i = 0; i < dotCount; i++) {
        dots[i].draw();
        dots[i].move();
      }
      requestAnimationFrame(render);
    }

    render();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default AnimatedBackground;
