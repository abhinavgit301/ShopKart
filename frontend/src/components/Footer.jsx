import { Globe, MessageCircle, Play, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerGroups = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'Best Sellers', 'Running', 'Basketball', 'Sale'],
  },
  {
    title: 'About',
    links: ['Our Story', 'Journal', 'Sustainability', 'Stores'],
  },
  {
    title: 'Customer Service',
    links: ['Contact', 'Shipping', 'Returns', 'FAQs'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70">
      <div className="mx-auto max-w-[1500px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xl font-black tracking-tight text-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm text-white">S</div>
              ShopKart
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Premium sneakers and streetwear essentials designed for movement, comfort and everyday self-expression.
            </p>
            <div className="mt-6 flex gap-3 text-slate-600">
              {[Globe, MessageCircle, Send, Play].map((Icon, index) => (
                <a key={index} href="#" className="rounded-full border border-slate-200 bg-white p-2.5 transition hover:border-slate-300 hover:text-slate-900">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{group.title}</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link to="/products" className="transition hover:text-slate-900">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Newsletter</h3>
            <p className="mb-4 text-sm text-slate-600">Get first access to drops, offers and sneaker news.</p>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400"
              />
              <button className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 ShopKart. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/products" className="hover:text-slate-900">Privacy</Link>
            <Link to="/products" className="hover:text-slate-900">Terms</Link>
            <Link to="/products" className="hover:text-slate-900">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
