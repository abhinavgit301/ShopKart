import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Men', to: '/products' },
  { label: 'Women', to: '/products' },
  { label: 'Kids', to: '/products' },
  { label: 'Collections', to: '/products' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      navigate('/', { replace: true });
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-0'}`}>
      <div className={`mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 ${scrolled ? 'pb-2' : 'pb-0'}`}>
        <nav
          className={`glass-surface flex items-center justify-between rounded-full px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 ${
            scrolled ? 'border-slate-200/70 bg-white/75' : 'border-slate-200/50 bg-white/55'
          }`}
        >
          <div className="flex items-center gap-5">
            <button className="lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm text-white">S</div>
              ShopKart
            </Link>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/search" className="hidden rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-700 transition hover:border-slate-300 sm:flex">
              <Search className="h-4 w-4" />
            </Link>

            <div className="relative">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              ) : (
                <Link to="/login" className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
                  <User className="h-4 w-4" />
                  Account
                </Link>
              )}
            </div>

            <Link to="/wishlist" className="relative rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative rounded-full border border-slate-200 bg-slate-900 p-2.5 text-white transition hover:bg-slate-800">
              <ShoppingBag className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div className="glass-surface mx-4 mt-2 rounded-2xl border border-slate-200/70 p-4 shadow-xl lg:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/search" onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Search
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block rounded-xl bg-slate-900 px-3 py-2 text-left text-sm font-medium text-white">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
