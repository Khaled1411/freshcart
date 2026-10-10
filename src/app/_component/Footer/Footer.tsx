import logo from '../../../assets/freshcart-logo.svg'
import {
  Gift,
  Headset,
  Leaf,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Tag,
  Truck,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NewsletterForm from './NewsletterForm'

const features = [
  { icon: Truck, title: 'Free Shipping', text: 'On orders over 500 EGP' },
  { icon: RotateCcw, title: 'Easy Returns', text: '14-day return policy' },
  { icon: ShieldCheck, title: 'Secure Payment', text: '100% secure checkout' },
  { icon: Headset, title: '24/7 Support', text: 'Contact us anytime' },
]

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Categories', href: '/categories' },
      { label: 'Brands', href: '/brands' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My Account', href: '/profile' },
      { label: 'Order History', href: '/allorders' },
      { label: 'Wishlist', href: '/wishList' },
      { label: 'Shopping Cart', href: '/cart' },
      { label: 'Sign In', href: '/login' },
      { label: 'Create Account', href: '/register' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns & Refunds', href: '#' },
      { label: 'Track Order', href: '/allorders' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
]

const socials = [
  {
    label: 'Facebook',
    paths: ['M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'],
  },
  {
    label: 'Twitter',
    paths: [
      'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
    ],
  },
  {
    label: 'Instagram',
    paths: ['M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', 'M17.5 6.5h.01'],
    rect: true,
  },
  {
    label: 'YouTube',
    paths: [
      'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z',
      'M9.75 15.02 15.5 11.75 9.75 8.48z',
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* newsletter + mobile app */}
      <div className="container mx-auto xl:max-w-7xl px-4">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-green-50 p-6 md:p-10 shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-green-600 text-white">
                <Mail className="size-5" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold tracking-wide text-green-700">NEWSLETTER</p>
                <p className="text-xs text-gray-500">50,000+ subscribers</p>
              </div>
            </div>

            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Get the Freshest Updates
              <span className="block text-green-600">Delivered Free</span>
            </h2>
            <p className="mt-3 text-gray-500">Weekly recipes, seasonal offers &amp; exclusive member perks.</p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-700">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                <Leaf className="size-4 text-green-600" /> Fresh Picks Weekly
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                <Truck className="size-4 text-green-600" /> Free Delivery Codes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                <Tag className="size-4 text-green-600" /> Members-Only Deals
              </span>
            </div>

            <div className="mt-6 max-w-lg">
              <NewsletterForm />
              <p className="mt-2 text-xs text-gray-400">Unsubscribe anytime. No spam, ever.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-600/20 px-3 py-1 text-[11px] font-semibold text-green-400">
              <Gift className="size-3" /> MOBILE APP
            </span>
            <h3 className="mt-4 text-2xl font-bold leading-tight">Shop Faster on Our App</h3>
            <p className="mt-2 text-sm text-gray-400">Get app-exclusive deals &amp; 15% off your first order.</p>

            <div className="mt-5 flex flex-col gap-3">
              <a href="#" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10">
                <span className="block text-[10px] uppercase text-gray-400">Download on the</span>
                <span className="font-semibold">App Store</span>
              </a>
              <a href="#" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10">
                <span className="block text-[10px] uppercase text-gray-400">Get it on</span>
                <span className="font-semibold">Google Play</span>
              </a>
            </div>

            <p className="mt-5 text-xs text-gray-400">
              <span className="text-yellow-400">★★★★★</span> 4.9 · 100K+ downloads
            </p>
          </div>
        </div>
      </div>

      {/* features strip */}
      <div className="mt-8 bg-green-50 py-4">
        <div className="container mx-auto xl:max-w-7xl px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Icon className="size-5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* main footer */}
      <div className="bg-slate-900 text-gray-300">
        <div className="container mx-auto xl:max-w-7xl px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div>
            <span className="inline-block rounded-lg bg-white px-4 py-2">
              <Image src={logo} alt="FreshCart" className="h-7 w-auto" />
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you
              the best brands at competitive prices with a seamless shopping experience.
            </p>

            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-green-500" /> +1 (800) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-green-500" /> support@freshcart.com
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-green-500" /> 123 Commerce Street, New York, NY 10001
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-green-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    {s.rect && <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />}
                    {s.paths.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-semibold text-white">{col.title}</h4>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-green-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto xl:max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
            <p className="flex gap-4">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>PayPal</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
