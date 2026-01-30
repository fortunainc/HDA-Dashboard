'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  TrendingUp, 
  BarChart3,
  Phone, 
  Calendar,
  MessageSquare,
  Megaphone,
  Mic,
  UsersRound,
  Building2,
  Target,
  User,
  Settings,
  Menu,
  X,
  Book
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Lead Inventory', href: '/leads', icon: Users },
  { name: 'Sales Pipeline', href: '/pipeline', icon: Kanban },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Services', href: '/services', icon: Megaphone },
  { name: 'PR Campaigns', href: '/pr-campaigns', icon: Mic },
  { name: 'Media Contacts', href: '/media-contacts', icon: UsersRound },
  { name: 'PR Analytics', href: '/pr-analytics', icon: BarChart3 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Contacts', href: '/contacts', icon: Phone },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Competitors', href: '/competitors', icon: TrendingUp },
  { name: 'Partnerships', href: '/partnerships', icon: UsersRound },
  { name: 'Industries', href: '/industries', icon: Building2 },
  { name: 'Targets', href: '/targets', icon: Target },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'HoneyBook', href: '/honeybook-settings', icon: Book },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} min-h-screen bg-gray-900 text-white transition-all duration-300 fixed left-0 top-0 z-50`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-primary-400">Hustle</h1>
            <p className="text-xs text-gray-400">Digital Agency</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors no-underline ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500">
            <p>Revenue Goal: $25K/month</p>
            <p className="mt-1">Current: $12,450</p>
          </div>
        </div>
      )}
    </div>
  )
}