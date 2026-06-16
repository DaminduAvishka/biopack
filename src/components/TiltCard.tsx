/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, type MouseEvent } from 'react';

interface TiltCardProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt degrees
}

export default function TiltCard({
  id,
  children,
  className = '',
  maxTilt = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Pixel coordinates relative to the card's top-left corner
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalised between -0.5 and 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    // Calculate rotations (negate Y rotation for intuitive vertical pitch)
    const rx = normalizedY * -maxTilt;
    const ry = normalizedX * maxTilt;

    setRotateX(rx);
    setRotateY(ry);

    // Dynamic specular reflection position (percentage)
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: isHovered
          ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(46, 74, 63, 0.15), 0 1px 3px rgba(46, 74, 63, 0.05)'
          : '0 4px 6px rgba(46, 74, 63, 0.05), 0 1px 3px rgba(46, 74, 63, 0.02)',
      }}
    >
      {/* Light glare overlay to mimic realistic physical materials */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300 opacity-60"
          style={{
            background: `radial-gradient(circle 180px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.25), transparent)`,
            zIndex: 10,
          }}
        />
      )}
      
      {/* Main card content projected forward slightly for a parallax look */}
      <div 
        style={{ 
          transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
          transition: 'transform 0.3s ease-out'
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </div>
  );
}
