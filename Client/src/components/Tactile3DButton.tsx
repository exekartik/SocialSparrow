import React from 'react';

export interface Tactile3DButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'pink';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Tactile3DButton: React.FC<Tactile3DButtonProps> = ({
  children = 'Create Post',
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 font-bold text-sm tracking-wide transition-all duration-150 active:translate-y-2 cursor-pointer select-none rounded-xl px-5 py-3 border-2 outline-none
        ${
          isPrimary
            ? 'bg-blue-600 text-white border-blue-400 shadow-[0_6px_0_0_#1e3a8a] hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_#1e3a8a] active:shadow-[0_1px_0_0_#1e3a8a] active:bg-blue-500'
            : 'bg-[#fff0f0] text-[#382b22] border-[#b18597] shadow-[0_6px_0_0_#ffe3e2] hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_#ffe3e2] active:shadow-[0_1px_0_0_#ffe3e2] active:bg-[#ffe9e9]'
        }
        ${className}
      `}
    >
      <span className="inline-flex items-center justify-center gap-2 w-full">
        {children}
      </span>
    </button>
  );
};

export default Tactile3DButton;
