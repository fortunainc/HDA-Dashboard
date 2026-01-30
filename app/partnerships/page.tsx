'use client'

import DashboardLayout from '../../components/DashboardLayout'
import { Plus, Search, ExternalLink, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const partnerships = [
  { id: 1, name: 'Tech Marketing Hub', type: 'Referral Partner', status: 'Active', revenue: '$12,500', commission: '15%', leads: 45 },
  { id: 2, name: 'Digital Growth Agency', type: 'Strategic Alliance', status: 'Active', revenue: '$8,200', commission: '10%', leads: 32 },
  { id: 3, name: 'SaaS Consultants Pro', type: 'Affiliate', status: 'Active', revenue: '$5,100', commission: '20%', leads: 28 },
  { id: 4, name: 'Business Development Group', type: 'Joint Venture', status: 'Pending', revenue: '$0', commission: '25%', leads: 0 },
  { id: 5, name: 'Marketing Innovators', type: 'Referral Partner', status: 'Inactive', revenue: '$3,200', commission: '12%', leads: 15 },
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    'Active': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Inactive': 'bg-gray-100 text-gray-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export default function PartnershipsPage() {
  const [partnerships, setPartnerships] = useState([
    { id: 1, name: 'Tech Marketing Hub', type: 'Referral Partner', status: 'Active', revenue: '$12,500', commission: '15%', leads: 45 },
    { id: 2, name: 'Digital Growth Agency', type: 'Strategic Alliance', status: 'Active', revenue: '$8,200', commission: '10%', leads: 32 },
    { id: 3, name: 'SaaS Consultants Pro', type: 'Affiliate', status: 'Active', revenue: '$5,100', commission: '20%', leads: 28 },
    { id: 4, name: 'Business Development Group', type: 'Joint Venture', status: 'Pending', revenue: '$0', commission: '25%', leads: 0 },
    { id: 5, name: 'Marketing Innovators', type: 'Referral Partner', status: 'Inactive', revenue: '$3,200', commission: '12%', leads: 15 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPartnership, setNewPartnership] = useState({
    name: '',
    type: 'Referral Partner',
    status: 'Active',
    commission: '15%'
  })

  const filteredPartnerships = partnerships.filter(partnership =>
    partnership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPartnership = (e: React.FormEvent) => {
    e.preventDefault()
    const partnership = {
      id: partnerships.length + 1,
      name: newPartnership.name,
      type: newPartnership.type,
      status: newPartnership.status,
      revenue: '$0',
      commission: newPartnership.commission,
      leads: 0
    }
    setPartnerships([...partnerships, partnership])
    setShowAddModal(false)
    setNewPartnership({
      name: '',
      type: 'Referral Partner',
      status: 'Active',
      commission: '15%'
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Partnerships</h1>
            <p className="text-gray-600 mt-1">Manage your strategic partnerships and alliances</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Partnership
          </button>
        </div>

        {/* Add Partnership Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Partnership</h2>
              <form onSubmit={handleAddPartnership}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                    <input
                      type="text"
                      required
                      value={newPartnership.name}
                      onChange={(e) => setNewPartnership({...newPartnership, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Partner company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partnership Type</label>
                    <select
                      value={newPartnership.type}
                      onChange={(e) => setNewPartnership({...newPartnership, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Referral Partner">Referral Partner</option>
                      <option value="Strategic Alliance">Strategic Alliance</option>
                      <option value="Affiliate">Affiliate</option>
                      <option value="Joint Venture">Joint Venture</option>
                      <option value="White Label">White Label</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newPartnership.status}
                      onChange={(e) => setNewPartnership({...newPartnership, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                    <input
                      type="text"
                      required
                      value={newPartnership.commission}
                      onChange={(e) => setNewPartnership({...newPartnership, commission: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="15%"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Partnership
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">$28,800</p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Partners</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <ExternalLink className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">105</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search partnerships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3 font-medium">Partner</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Revenue</th>
                  <th className="pb-3 font-medium">Commission</th>
                  <th className="pb-3 font-medium">Leads Sent</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartnerships.map((partnership) => (
                  <tr key={partnership.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <p className="font-medium text-gray-900">{partnership.name}</p>
                    </td>
                    <td className="py-4 text-gray-600">{partnership.type}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(partnership.status)}`}>
                        {partnership.status}
                      </span>
                    </td>
                    <td className="py-4 font-medium text-gray-900">{partnership.revenue}</td>
                    <td className="py-4 text-gray-600">{partnership.commission}</td>
                    <td className="py-4 text-gray-600">{partnership.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}