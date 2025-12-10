import { useEffect, useRef } from 'react';
import './GradientMesh.css';

interface GradientMeshProps {
  colors?: string[];
  speed?: number;
  intensity?: number;
}

export default function GradientMeshBackground({
  colors = ['#0066ff', '#4a9d6b', '#ffffff'], // Vibrant blue, green, white
  speed = 0.5,
  intensity = 0.3
}: GradientMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const numPoints = 4;
    const points: Array<{ x: number; y: number; vx: number; vy: number }> = [];

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed
      });
    }

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
      });

      // Create gradient mesh
      const gradient1 = ctx.createRadialGradient(
        points[0].x,
        points[0].y,
        0,
        points[0].x,
        points[0].y,
        canvas.width * 0.8
      );
      gradient1.addColorStop(0, colors[0] + '80');
      gradient1.addColorStop(1, 'transparent');

      const gradient2 = ctx.createRadialGradient(
        points[1].x,
        points[1].y,
        0,
        points[1].x,
        points[1].y,
        canvas.width * 0.6
      );
      gradient2.addColorStop(0, colors[1] + '60');
      gradient2.addColorStop(1, 'transparent');

      const gradient3 = ctx.createRadialGradient(
        points[2].x,
        points[2].y,
        0,
        points[2].x,
        points[2].y,
        canvas.width * 0.4
      );
      gradient3.addColorStop(0, colors[2] + '20');
      gradient3.addColorStop(1, 'transparent');

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors, speed, intensity]);

  return <canvas ref={canvasRef} className="gradient-mesh-canvas" />;
}

