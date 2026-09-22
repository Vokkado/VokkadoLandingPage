import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-primary-dark dark:bg-primary-light text-white dark:text-night-deep hover:bg-primary dark:hover:bg-primary-light/85 focus:ring-primary-dark dark:focus:ring-primary-light';
      break;
    case 'secondary':
      variantStyle = 'bg-secondary-dark text-white hover:bg-secondary focus:ring-secondary';
      break;
    case 'outline-primary':
      variantStyle = 'bg-transparent text-primary-dark dark:text-primary-light border-2 border-primary-dark dark:border-primary-light hover:bg-primary-dark hover:text-white dark:hover:bg-primary-light dark:hover:text-night-deep focus:ring-primary-dark dark:focus:ring-primary-light';
      break;
    case 'outline-secondary':
        variantStyle = 'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-white focus:ring-secondary';
        break;
    case 'ghost':
      variantStyle = 'bg-transparent text-neutral-dark dark:text-white/75 hover:bg-neutral-light dark:hover:bg-white/10 focus:ring-neutral-medium';
      break;
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'py-2 px-4 text-sm';
      break;
    case 'md':
      sizeStyle = 'py-3 px-6 text-base';
      break;
    case 'lg':
      sizeStyle = 'py-4 px-10 text-xl'; // Matches Hero button size requirement
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
