import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = false }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' } : {}}
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};
