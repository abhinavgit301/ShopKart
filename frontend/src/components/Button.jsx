import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
}) {
  const variants = {
    primary: 'bg-[#111827] text-white hover:bg-[#1f2937] border-transparent',
    secondary: 'bg-white/70 text-slate-900 border border-slate-200 hover:bg-white',
    ghost: 'bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-100/70',
    danger: 'bg-red-500 text-white border border-red-500 hover:bg-red-600',
    accent: 'bg-[#7c3aed] text-white border border-[#7c3aed] hover:bg-[#6d28d9]',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
