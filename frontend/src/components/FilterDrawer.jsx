import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

export default function FilterDrawer({ open, onClose, ...props }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/40 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="ml-auto h-full max-w-sm rounded-l-[28px] border border-slate-200 bg-white p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
              <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <FilterSidebar {...props} isMobile onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
