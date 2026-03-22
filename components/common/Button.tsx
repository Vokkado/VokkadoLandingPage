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
      variantStyle = 'bg-primary-dark text-white hover:bg-primary focus:ring-primary-dark';
      break;
    case 'secondary':
      variantStyle = 'bg-secondary-dark text-white hover:bg-secondary focus:ring-secondary';
      break;
    case 'outline-primary':
      variantStyle = 'bg-transparent text-primary-dark border-2 border-primary-dark hover:bg-primary-dark hover:text-white focus:ring-primary-dark';
      break;
    case 'outline-secondary':
        variantStyle = 'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-white focus:ring-secondary';
        break;
    case 'ghost':
      variantStyle = 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400'; // Adjusted focus ring
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
