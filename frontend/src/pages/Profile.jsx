import { MapPin, ShieldCheck, ShoppingBag, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { orders } from '../data/orders';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.fullName || user?.name || 'ShopKart customer';
  const recentOrders = orders.slice(0, 3);

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
    <div className="space-y-8 pb-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <UserRound className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</p>
              <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">{displayName}</h1>
            </div>
          </div>
          <button onClick={handleLogout} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">Logout</button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3 text-violet-700">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-900">Orders</h2>
          </div>
          <p className="text-3xl font-black tracking-[-0.05em] text-slate-900">{orders.length}</p>
          <p className="mt-2 text-sm text-slate-600">Total completed purchases</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3 text-violet-700">
            <MapPin className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-900">Contact</h2>
          </div>
          <p className="text-sm leading-6 text-slate-700">{user?.email || 'Email unavailable'}</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{user?.phone || 'Phone unavailable'}</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3 text-violet-700">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-900">Security</h2>
          </div>
          <p className="text-sm text-slate-700">Verified account. Password protected and secure.</p>
        </div>
      </div>

      <section className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Recent orders</h2>
          <Link to="/orders" className="text-sm font-medium text-violet-700">View all</Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Order #{order.id}</p>
                <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">{order.status}</span>
                <p className="text-base font-bold text-slate-900">₹{order.total.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
