'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export default function AnimatedButton({ 
  children, 
  href, 
  onClick,
  variant = 'primary',
  className = '' 
}: AnimatedButtonProps) {
  const baseStyles = "relative px-8 py-3 rounded-md font-semibold transition-all duration-300 overflow-hidden group";
  
  const variantStyles = {
    primary: "text-white",
    secondary: "text-white border-2",
    outline: "border-2 text-white"
  };

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
    </>
  );

  const style = variant === 'primary' 
    ? { backgroundColor: '#4CB276' }
    : variant === 'secondary'
    ? { backgroundColor: '#1D4E89', borderColor: '#FFFFFF' }
    : { borderColor: '#FFFFFF', backgroundColor: 'transparent' };

  const hoverStyle = variant === 'primary'
    ? { backgroundColor: '#3FA066' }
    : variant === 'secondary'
    ? { backgroundColor: '#1D4E89', borderColor: '#FFFFFF' }
    : { backgroundColor: '#FFFFFF', color: '#1D4E89' };

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={style}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, style)}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, style)}
    >
      {buttonContent}
    </button>
  );
}

