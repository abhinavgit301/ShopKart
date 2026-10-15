import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
};

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email';
    if (!form.password) nextErrors.password = 'Password is required';
    else if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
    else if (form.phone.replace(/\s+/g, '').length < 8) nextErrors.phone = 'Enter a valid phone number';
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Confirm your password';
    else if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      toast.error('Please fix the form errors.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        fullName: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });
      toast.success('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl pb-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Create account</p>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Join ShopKart</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
              placeholder="Your full name"
              disabled={isSubmitting}
            />
            {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
            {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email}</span>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
              placeholder="+91 98765 43210"
              disabled={isSubmitting}
            />
            {errors.phone && <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
              placeholder="At least 6 characters"
              disabled={isSubmitting}
            />
            {errors.password && <span className="mt-1 block text-xs text-red-600">{errors.password}</span>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</span>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
              placeholder="Repeat password"
              disabled={isSubmitting}
            />
            {errors.confirmPassword && <span className="mt-1 block text-xs text-red-600">{errors.confirmPassword}</span>}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-semibold text-violet-700">Login</Link>
        </div>
      </div>
    </div>
  );
}
