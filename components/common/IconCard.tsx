import React from 'react';

interface IconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const IconCard: React.FC<IconCardProps> = ({ icon, title, description, className }) => {
  return (
    <div className={`bg-white dark:bg-night-card dark:border dark:border-white/10 p-6 rounded-xl shadow-lg dark:shadow-black/30 text-center ${className || ''}`}>
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">{title}</h3>
      <p className="text-neutral-dark dark:text-white/70">{description}</p>
    </div>
  );
};

export default IconCard;