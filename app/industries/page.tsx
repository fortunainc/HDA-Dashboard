'use client'

import DashboardLayout from '../../components/DashboardLayout'
import { Plus, Search, Edit, Trash2, DollarSign, Users } from 'lucide-react'
import { useState } from 'react'

const industries = [
  { id: 1, name: 'Technology', description: 'SaaS, software development, tech startups', avgDealValue: '$8,000', activeLeads: 45, conversionRate: '4.2%' },
  { id: 2, name: 'Financial Services', description: 'Banking, insurance, fintech, investment', avgDealValue: '$12,000', activeLeads: 28, conversionRate: '5.1%' },
  { id: 3, name: 'Healthcare', description: 'Health tech, medical devices, pharmaceutical', avgDealValue: '$15,000', activeLeads: 22, conversionRate: '3.8%' },
  { id: 4, name: 'E-Commerce', description: 'Online retail, D2C brands, marketplaces', avgDealValue: '$6,500', activeLeads: 38, conversionRate: '3.5%' },
  { id: 5, name: 'Consulting', description: 'Management consulting, business advisory', avgDealValue: '$7,000', activeLeads: 32, conversionRate: '4.0%' },
  { id: 6, name: 'Marketing', description: 'Digital marketing, advertising agencies', avgDealValue: '$5,500', activeLeads: 25, conversionRate: '3.2%' },
]

export default function IndustriesPage() {
  const [industries, setIndustries] = useState([
    { id: 1, name: 'Technology', description: 'SaaS, software development, tech startups', avgDealValue: '$8,000', activeLeads: 45, conversionRate: '4.2%' },
    { id: 2, name: 'Financial Services', description: 'Banking, insurance, fintech, investment', avgDealValue: '$12,000', activeLeads: 28, conversionRate: '5.1%' },
    { id: 3, name: 'Healthcare', description: 'Health tech, medical devices, pharmaceutical', avgDealValue: '$15,000', activeLeads: 22, conversionRate: '3.8%' },
    { id: 4, name: 'E-Commerce', description: 'Online retail, D2C brands, marketplaces', avgDealValue: '$6,500', activeLeads: 38, conversionRate: '3.5%' },
    { id: 5, name: 'Consulting', description: 'Management consulting, business advisory', avgDealValue: '$7,000', activeLeads: 32, conversionRate: '4.0%' },
    { id: 6, name: 'Marketing', description: 'Digital marketing, advertising agencies', avgDealValue: '$5,500', activeLeads: 25, conversionRate: '3.2%' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newIndustry, setNewIndustry] = useState({
    name: '',
    description: '',
    avgDealValue: '',
    conversionRate: '3.0%'
  })

  const filteredIndustries = industries.filter(industry =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault()
    const industry = {
      id: industries.length + 1,
      name: newIndustry.name,
      description: newIndustry.description,
      avgDealValue: `$${parseInt(newIndustry.avgDealValue).toLocaleString()}`,
      activeLeads: 0,
      conversionRate: newIndustry.conversionRate
    }
    setIndustries([...industries, industry])
    setShowAddModal(false)
    setNewIndustry({
      name: '',
      description: '',
      avgDealValue: '',
      conversionRate: '3.0%'
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Industries</h1>
            <p className="text-gray-600 mt-1">Configure target industries and verticals</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Industry
          </button>
        </div>

        {/* Add Industry Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Industry</h2>
              <form onSubmit={handleAddIndustry}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry Name</label>
                    <input
                      type="text"
                      required
                      value={newIndustry.name}
                      onChange={(e) => setNewIndustry({...newIndustry, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Technology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newIndustry.description}
                      onChange={(e) => setNewIndustry({...newIndustry, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Brief description of the industry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avg Deal Value ($)</label>
                    <input
                      type="number"
                      required
                      value={newIndustry.avgDealValue}
                      onChange={(e) => setNewIndustry({...newIndustry, avgDealValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="8000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Rate (%)</label>
                    <input
                      type="text"
                      required
                      value={newIndustry.conversionRate}
                      onChange={(e) => setNewIndustry({...newIndustry, conversionRate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="3.0%"
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
                    Add Industry
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
                <p className="text-sm font-medium text-gray-600">Total Industries</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Active Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">190</p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3.9%</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <Users className="text-white" size={24} />
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
                placeholder="Search industries..."
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
                  <th className="pb-3 font-medium">Industry</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Avg Deal Value</th>
                  <th className="pb-3 font-medium">Active Leads</th>
                  <th className="pb-3 font-medium">Conversion Rate</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIndustries.map((industry) => (
                  <tr key={industry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <p className="font-medium text-gray-900">{industry.name}</p>
                    </td>
                    <td className="py-4 text-gray-600 max-w-xs">{industry.description}</td>
                    <td className="py-4 font-medium text-gray-900">{industry.avgDealValue}</td>
                    <td className="py-4 text-gray-600">{industry.activeLeads}</td>
                    <td className="py-4 text-gray-600">{industry.conversionRate}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
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