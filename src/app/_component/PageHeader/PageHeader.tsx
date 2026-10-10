import Link from 'next/link'
import React from 'react'

type Crumb = { label: string; href?: string }

export default function PageHeader({
  title,
  subtitle,
  icon,
  gradient,
  crumbs,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  gradient: string
  crumbs: Crumb[]
}) {
  return (
    <div className={`relative left-1/2 w-screen -translate-x-1/2 bg-gradient-to-r ${gradient}`}>
      <div className="container mx-auto xl:max-w-7xl px-4 py-8 text-white">
        <nav className="flex items-center gap-2 text-xs text-white/80">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.label}>
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="mt-4 flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-white/20">
            {icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold leading-tight">{title}</h1>
            <p className="text-sm text-white/80">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
