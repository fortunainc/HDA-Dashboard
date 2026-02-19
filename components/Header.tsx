'use client'

import { Bell, Search, User, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getData } from '../lib/storage'
import Link from 'next/link'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userName, setUserName] = useState('John Doe')
  const [userCompany, setUserCompany] = useState('Founder')

  useEffect(() => {
    // Load user data from storage
    const user = getData('user')
    if (user && user.name && user.name !== 'John Doe') {
      setUserName(user.name)
      setUserCompany(user.company || 'Founder')
    }
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-40 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search leads, contacts, bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userCompany}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-medium">
              {getInitials(userName)}
            </div>
            <Link href="/profile" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}