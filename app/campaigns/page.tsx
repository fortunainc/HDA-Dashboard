'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { Plus, Mail, BarChart3, Clock, Users, TrendingUp, Filter, Send, Edit, Trash2 } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  description?: string
  startDate?: Date
  endDate?: Date
  budget?: number
  sentCount: number
  openedCount: number
  clickedCount: number
  repliedCount: number
  convertedCount: number
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('campaigns')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Error loading campaigns from localStorage:', e)
        }
      }
    }
    return [
      {
        id: '1',
        name: 'Q1 Outreach Campaign',
        type: 'EMAIL_OUTREACH',
        status: 'RUNNING',
        description: 'Targeted email outreach to technology companies',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        budget: 5000,
        sentCount: 500,
        openedCount: 250,
        clickedCount: 75,
        repliedCount: 30,
        convertedCount: 5,
      },
      {
        id: '2',
        name: 'LinkedIn Connection Campaign',
        type: 'LINKEDIN_OUTREACH',
        status: 'SCHEDULED',
        description: 'LinkedIn connection requests to prospects',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-28'),
        budget: 2000,
        sentCount: 0,
        openedCount: 0,
        clickedCount: 0,
        repliedCount: 0,
        convertedCount: 0,
      },
    ]
  })
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'EMAIL_OUTREACH',
    description: '',
    startDate: '',
    endDate: '',
    budget: ''
  })

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    const campaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      name: newCampaign.name,
      type: newCampaign.type,
      status: 'SCHEDULED',
      description: newCampaign.description,
      startDate: new Date(newCampaign.startDate),
      endDate: new Date(newCampaign.endDate),
      budget: parseInt(newCampaign.budget),
      sentCount: 0,
      openedCount: 0,
      clickedCount: 0,
      repliedCount: 0,
      convertedCount: 0,
    }
    const updatedCampaigns = [...campaigns, campaign]
    setCampaigns(updatedCampaigns)
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns))
    setShowCreateModal(false)
    setNewCampaign({
      name: '',
      type: 'EMAIL_OUTREACH',
      description: '',
      startDate: '',
      endDate: '',
      budget: ''
    })
  }

  const handleEditCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCampaign) {
      const updatedCampaigns = campaigns.map((camp: typeof campaigns[0])=> 
        camp.id === selectedCampaign.id 
          ? { 
              ...camp, 
              name: newCampaign.name,
              type: newCampaign.type,
              description: newCampaign.description,
              startDate: new Date(newCampaign.startDate),
              endDate: new Date(newCampaign.endDate),
              budget: parseInt(newCampaign.budget)
            }
          : camp
      )
      setCampaigns(updatedCampaigns)
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns))
      setShowEditModal(false)
      setSelectedCampaign(null)
    }
  }

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      const updatedCampaigns = campaigns.filter((camp: typeof campaigns[0])=> camp.id !== id)
      setCampaigns(updatedCampaigns)
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns))
    }
  }

  const openEditModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setNewCampaign({
      name: campaign.name,
      type: campaign.type,
      description: campaign.description || '',
      startDate: campaign.startDate?.toISOString().split('T')[0] || '',
      endDate: campaign.endDate?.toISOString().split('T')[0] || '',
      budget: campaign.budget?.toString() || ''
    })
    setShowEditModal(true)
  }

  const filteredCampaigns = campaigns.filter((campaign: typeof campaigns[0])=> filterStatus === 'all' || campaign.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-green-100 text-green-800'
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'EMAIL_OUTREACH':
        return 'Email Outreach'
      case 'LINKEDIN_OUTREACH':
        return 'LinkedIn Outreach'
      case 'ADS':
        return 'Ads'
      case 'CONTENT':
        return 'Content'
      case 'REFERRAL':
        return 'Referral'
      default:
        return status
    }
  }

  const calculateRates = (campaign: Campaign) => {
    const openRate = campaign.sentCount > 0 ? (campaign.openedCount / campaign.sentCount) * 100 : 0
    const clickRate = campaign.openedCount > 0 ? (campaign.clickedCount / campaign.openedCount) * 100 : 0
    const replyRate = campaign.sentCount > 0 ? (campaign.repliedCount / campaign.sentCount) * 100 : 0
    const conversionRate = campaign.repliedCount > 0 ? (campaign.convertedCount / campaign.repliedCount) * 100 : 0
    
    return { openRate, clickRate, replyRate, conversionRate }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600 mt-1">
            Create and manage your marketing campaigns
          </p>
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
            </div>
            <Send className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emails Sent</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.reduce((sum, c) => sum + c.sentCount, 0).toLocaleString()}
              </p>
            </div>
            <Mail className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.length > 0
                  ? Math.round(
                      campaigns.reduce((sum, c) => sum + calculateRates(c).openRate, 0) / campaigns.length
                    )
                  : 0}%
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.reduce((sum, c) => sum + c.convertedCount, 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="RUNNING">Running</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="PAUSED">Paused</option>
            </select>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-600 mb-4">
            Create your first campaign to start tracking your marketing efforts
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredCampaigns.map((campaign) => {
            const rates = calculateRates(campaign)
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openEditModal(campaign)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteCampaign(campaign.id)
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <p className="text-xs text-gray-600">Sent</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{campaign.sentCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-green-600" />
                        <p className="text-xs text-gray-600">Opened</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{campaign.openedCount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{rates.openRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <p className="text-xs text-gray-600">Replied</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{campaign.repliedCount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{rates.replyRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-orange-600" />
                        <p className="text-xs text-gray-600">Converted</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{campaign.convertedCount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{rates.conversionRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <p className="text-xs text-gray-600">Budget</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">${campaign.budget?.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  {campaign.startDate && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        {campaign.startDate.toLocaleDateString()} - {campaign.endDate?.toLocaleDateString() || 'Ongoing'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create Campaign</h2>
              <form onSubmit={handleCreateCampaign}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                    <input
                      type="text"
                      required
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Q1 Outreach Campaign"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                    <select 
                      value={newCampaign.type}
                      onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="EMAIL_OUTREACH">Email Outreach</option>
                      <option value="LINKEDIN_OUTREACH">LinkedIn Outreach</option>
                      <option value="ADS">Ads</option>
                      <option value="CONTENT">Content</option>
                      <option value="REFERRAL">Referral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newCampaign.description}
                      onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Describe your campaign goals and strategy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        required
                        value={newCampaign.startDate}
                        onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        required
                        value={newCampaign.endDate}
                        onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                    <input
                      type="number"
                      required
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="5000"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {showEditModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Campaign</h2>
              <form onSubmit={handleEditCampaign}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                    <input
                      type="text"
                      required
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                    <select 
                      value={newCampaign.type}
                      onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="EMAIL_OUTREACH">Email Outreach</option>
                      <option value="LINKEDIN_OUTREACH">LinkedIn Outreach</option>
                      <option value="ADS">Ads</option>
                      <option value="CONTENT">Content</option>
                      <option value="REFERRAL">Referral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newCampaign.description}
                      onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        required
                        value={newCampaign.startDate}
                        onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        required
                        value={newCampaign.endDate}
                        onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                    <input
                      type="number"
                      required
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  )
}