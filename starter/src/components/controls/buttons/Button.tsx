import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const baseStyles = 'cursor-pointer transition-all duration-200 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded',
  secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded border border-zinc-700',
  danger: 'bg-red-700 hover:bg-red-600 text-white px-5 py-2 rounded',
  ghost: 'text-zinc-400 hover:text-white px-4 py-2',
};

export const Button = ({ children, onClick, variant = 'primary', disabled, className = '', type = 'button' }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
