'use client';

import { useEffect, useRef } from 'react';

interface Card {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speedX: number;
  speedY: number;
  size: number;
  suit: string;
  value: string;
  opacity: number;
}

export default function BalatroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<Card[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Card suits and values
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    // Initialize cards
    const initCards = () => {
      cardsRef.current = [];
      const cardCount = Math.min(15, Math.floor((canvas.width * canvas.height) / 80000));
      
      for (let i = 0; i < cardCount; i++) {
        cardsRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          rotation: Math.random() * 360,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          size: 50 + Math.random() * 30,
          suit: suits[Math.floor(Math.random() * suits.length)],
          value: values[Math.floor(Math.random() * values.length)],
          opacity: 0.1 + Math.random() * 0.15
        });
      }
    };

    initCards();

    // Draw a card
    const drawCard = (card: Card) => {
      ctx.save();
      ctx.translate(card.x, card.y);
      ctx.rotate((card.rotation * Math.PI) / 180);

      const cardWidth = card.size;
      const cardHeight = card.size * 1.4;
      const cornerRadius = 6;

      // Helper function to draw rounded rectangle
      const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };

      // Card shadow
      ctx.fillStyle = `rgba(0, 0, 0, ${card.opacity * 0.3})`;
      drawRoundedRect(-cardWidth / 2 + 2, -cardHeight / 2 + 2, cardWidth, cardHeight, cornerRadius);
      ctx.fill();

      // Card background with gradient
      const gradient = ctx.createLinearGradient(
        -cardWidth / 2,
        -cardHeight / 2,
        cardWidth / 2,
        cardHeight / 2
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${card.opacity * 0.9})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${card.opacity * 0.7})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${card.opacity * 0.5})`);

      ctx.fillStyle = gradient;
      drawRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, cornerRadius);
      ctx.fill();

      // Card border
      ctx.strokeStyle = `rgba(29, 78, 137, ${card.opacity * 0.6})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Card content
      ctx.fillStyle = `rgba(29, 78, 137, ${card.opacity * 0.8})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Center suit symbol
      ctx.font = `bold ${card.size * 0.3}px Arial`;
      ctx.fillText(card.suit, 0, 0);
      
      // Corner value and suit
      ctx.font = `bold ${card.size * 0.12}px Arial`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(card.value, -cardWidth / 2 + 4, -cardHeight / 2 + 4);
      ctx.font = `${card.size * 0.1}px Arial`;
      ctx.fillText(card.suit, -cardWidth / 2 + 4, -cardHeight / 2 + card.size * 0.12);
      
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.font = `bold ${card.size * 0.12}px Arial`;
      ctx.fillText(card.value, cardWidth / 2 - 4, cardHeight / 2 - 4);
      ctx.font = `${card.size * 0.1}px Arial`;
      ctx.fillText(card.suit, cardWidth / 2 - 4, cardHeight / 2 - card.size * 0.12);

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cardsRef.current.forEach((card) => {
        // Update position
        card.x += card.speedX;
        card.y += card.speedY;
        card.rotation += 0.15;

        // Bounce off edges with padding
        const padding = card.size;
        if (card.x < padding || card.x > canvas.width - padding) {
          card.speedX *= -1;
        }
        if (card.y < padding || card.y > canvas.height - padding) {
          card.speedY *= -1;
        }

        // Keep cards in bounds
        card.x = Math.max(padding, Math.min(canvas.width - padding, card.x));
        card.y = Math.max(padding, Math.min(canvas.height - padding, card.y));

        drawCard(card);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}

