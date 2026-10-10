'use client'
import { ChevronRight, MapPin, Settings, User } from 'lucide-react'
import React, { useState } from 'react'
import AddressesComp from '../AddressesComp/AddressesComp'
import PageHeader from '../PageHeader/PageHeader'
import SettingsComp from '../SettingsComp/SettingsComp'

type Tab = 'addresses' | 'settings'

const tabs: { id: Tab; label: string; Icon: typeof MapPin }[] = [
  { id: 'addresses', label: 'My Addresses', Icon: MapPin },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export default function ProfileComp({ name, email }: { name: string; email: string }) {
  const [tab, setTab] = useState<Tab>('addresses')

  return (
    <>
      <PageHeader
        title="My Account"
        subtitle="Manage your addresses and account settings"
        icon={<User className="size-7" />}
        gradient="from-green-600 to-emerald-400"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'My Account' }]}
      />

      <div className="grid gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-bold text-gray-900">My Account</p>
          <div className="flex flex-col gap-1">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer ${
                  tab === id ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4" /> {label}
                </span>
                <ChevronRight className="size-4" />
              </button>
            ))}
          </div>
        </aside>

        <div>{tab === 'addresses' ? <AddressesComp /> : <SettingsComp name={name} email={email} />}</div>
      </div>
    </>
  )
}
