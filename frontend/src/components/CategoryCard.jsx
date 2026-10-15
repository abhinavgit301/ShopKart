import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="group overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/80 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <Link to="/products" className="block">
        <div className="overflow-hidden">
          <img src={category.image} alt={category.name} className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">Explore</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
