'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../../components/DashboardLayout'
import { Users, TrendingUp, DollarSign, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const stats = [
  {
    name: 'Total Revenue',
    value: '$12,450',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-500'
  },
  {
    name: 'Active Leads',
    value: '234',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-0.5%',
    trend: 'down',
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    name: 'Bookings',
    value: '18',
    change: '+5.3%',
    trend: 'up',
    icon: Calendar,
    color: 'bg-orange-500'
  },
]

const recentLeads = [
  { id: 1, name: 'Acme Corporation', industry: 'Technology', status: 'New', value: '$8,000' },
  { id: 2, name: 'Global Solutions', industry: 'Consulting', status: 'In Progress', value: '$5,000' },
  { id: 3, name: 'Innovate Labs', industry: 'SaaS', status: 'Qualified', value: '$12,000' },
  { id: 4, name: 'Smart Finance', industry: 'Financial Services', status: 'New', value: '$6,000' },
  { id: 5, name: 'Tech Startups Inc', industry: 'Technology', status: 'Contacted', value: '$10,000' },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="text-green-600 mr-1" size={16} />
                ) : (
                  <ArrowDownRight className="text-red-600 mr-1" size={16} />
                )}
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b">
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Industry</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100">
                      <td className="py-3 font-medium text-gray-900">{lead.name}</td>
                      <td className="py-3 text-gray-600">{lead.industry}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-gray-900">{lead.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium text-gray-900">Add New Lead</span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium text-gray-900">Create Campaign</span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium text-gray-900">Analyze Competitor</span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium text-gray-900">View Analytics</span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}