'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { User, Mail, Building, Save, LogOut } from 'lucide-react'
import { getData, saveData } from '../../lib/storage'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Hustle Digital Agency'
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load user data from storage
    const savedUser = getData('user')
    if (savedUser && savedUser.name !== 'John Doe') {
      setUser(savedUser)
    }
  }, [])

  const handleSave = () => {
    // Save user data to localStorage
    saveData('user', user)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogout = () => {
    // Clear user data and redirect
    saveData('user', {
      name: '',
      email: '',
      company: ''
    })
    window.location.href = '/'
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>

          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 pb-6 border-b">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name || 'Not Set'}</h2>
                <p className="text-gray-500">{user.company || 'Not Set'}</p>
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={user.company}
                    onChange={(e) => setUser({ ...user, company: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-6 border-t">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save Profile</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Success Message */}
            {saved && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">Profile saved successfully!</p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">About Your Profile</h3>
            <p className="text-sm text-blue-800">
              Your profile information is saved locally in your browser. This allows you to personalize your dashboard experience. 
              Make sure to save your profile after making changes.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}