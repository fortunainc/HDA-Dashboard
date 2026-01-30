'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Search, Filter, Calendar, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, Video, Newspaper, Radio, Megaphone } from 'lucide-react';

interface PRCampaign {
  id: string;
  clientName: string;
  packageName: string;
  packageType: 'Launch Pad' | 'Spotlight' | 'Media Mogul' | 'NBC Streaming' | 'ABC News' | 'Magazine Feature';
  status: 'Planning' | 'In Progress' | 'Delivered' | 'On Hold';
  startDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  investment: number;
  mediaPlacements: MediaPlacement[];
  roi: number;
  notes: string;
}

interface MediaPlacement {
  id: string;
  type: 'TV' | 'Streaming' | 'Magazine' | 'Podcast' | 'Website';
  outlet: string;
  status: 'Scheduled' | 'Completed' | 'In Progress';
  scheduledDate: string;
  completedDate?: string;
  url?: string;
  impressions?: number;
}

export default function PRCampaignsPage() {
  const [campaigns, setCampaigns] = useState<PRCampaign[]>([
    {
      id: '1',
      clientName: 'HealthTech Innovations',
      packageName: 'Spotlight Package',
      packageType: 'Spotlight',
      status: 'In Progress',
      startDate: '2024-01-15',
      expectedDelivery: '2024-02-28',
      investment: 10000,
      mediaPlacements: [
        {
          id: '1-1',
          type: 'Magazine',
          outlet: 'San Diego Business Journal',
          status: 'Completed',
          scheduledDate: '2024-01-25',
          completedDate: '2024-01-25',
          url: 'https://example.com/article1',
          impressions: 25000
        },
        {
          id: '1-2',
          type: 'Magazine',
          outlet: 'Healthcare Tech Review',
          status: 'In Progress',
          scheduledDate: '2024-02-10',
        },
        {
          id: '1-3',
          type: 'TV',
          outlet: 'ABC News San Diego',
          status: 'Scheduled',
          scheduledDate: '2024-02-20',
        },
        {
          id: '1-4',
          type: 'Podcast',
          outlet: 'Healthcare Innovators Podcast',
          status: 'Scheduled',
          scheduledDate: '2024-02-25',
        }
      ],
      roi: 35000,
      notes: 'Client very pleased with first magazine feature'
    },
    {
      id: '2',
      clientName: 'Pacific Properties',
      packageName: 'NBC Streaming Package',
      packageType: 'NBC Streaming',
      status: 'Delivered',
      startDate: '2023-12-01',
      expectedDelivery: '2024-01-15',
      actualDelivery: '2024-01-12',
      investment: 14000,
      mediaPlacements: [
        {
          id: '2-1',
          type: 'Streaming',
          outlet: 'NBC Streaming Channels',
          status: 'Completed',
          scheduledDate: '2024-01-01',
          completedDate: '2024-01-12',
          impressions: 2500000
        }
      ],
      roi: 75000,
      notes: 'Commercial aired 120 times, exceeded expectations'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<PRCampaign | null>(null);

  const [newCampaign, setNewCampaign] = useState({
    clientName: '',
    packageName: 'Launch Pad Package',
    packageType: 'Launch Pad' as 'Launch Pad' | 'Spotlight' | 'Media Mogul' | 'NBC Streaming' | 'ABC News' | 'Magazine Feature',
    status: 'Planning' as 'Planning' | 'In Progress' | 'Delivered' | 'On Hold',
    startDate: '',
    expectedDelivery: '',
    investment: '',
    notes: ''
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    const campaign: PRCampaign = {
      id: (campaigns.length + 1).toString(),
      clientName: newCampaign.clientName,
      packageName: newCampaign.packageName,
      packageType: newCampaign.packageType,
      status: newCampaign.status,
      startDate: newCampaign.startDate,
      expectedDelivery: newCampaign.expectedDelivery,
      investment: parseInt(newCampaign.investment),
      mediaPlacements: [],
      roi: 0,
      notes: newCampaign.notes
    }
    setCampaigns([...campaigns, campaign])
    setShowModal(false)
    setNewCampaign({
      clientName: '',
      packageName: 'Launch Pad Package',
      packageType: 'Launch Pad',
      status: 'Planning',
      startDate: '',
      expectedDelivery: '',
      investment: '',
      notes: ''
    })
  };

  const handleEditCampaign = (campaign: PRCampaign) => {
    setSelectedCampaign(campaign);
    setShowEditModal(true);
  };

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === selectedCampaign.id ? { 
          ...selectedCampaign, 
          ...newCampaign,
          investment: parseInt(newCampaign.investment)
        } : c
      ));
      setShowEditModal(false);
      setSelectedCampaign(null);
      setNewCampaign({
        clientName: '',
        packageName: 'Launch Pad Package',
        packageType: 'Launch Pad',
        status: 'Planning',
        startDate: '',
        expectedDelivery: '',
        investment: '',
        notes: ''
      });
    }
  };

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this PR campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'NBC Streaming': return Video;
      case 'ABC News': return Radio;
      case 'Magazine Feature': return Newspaper;
      default: return Megaphone;
    }
  };

  const totalInvestment = campaigns.reduce((sum, c) => sum + c.investment, 0);
  const totalROI = campaigns.reduce((sum, c) => sum + c.roi, 0);
  const avgROI = totalROI > 0 ? ((totalROI - totalInvestment) / totalInvestment * 100).toFixed(0) : '0';

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">PR Campaigns</h1>
          <p className="text-gray-600 mt-1">Manage media placements and client PR campaigns</p>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'In Progress').length}
              </p>
            </div>
            <Megaphone className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Investment</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalInvestment.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total ROI</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalROI.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average ROI</p>
              <p className="text-2xl font-bold text-gray-900">{avgROI}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => {
              const PackageIcon = getPackageIcon(campaign.packageType);
              return (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <PackageIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.clientName}</div>
                        <div className="text-sm text-gray-500">{campaign.mediaPlacements.length} placements</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.packageName}</div>
                    <div className="text-sm text-gray-500">{campaign.packageType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {campaign.startDate} - {campaign.actualDelivery || campaign.expectedDelivery}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${campaign.investment.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${campaign.roi.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditCampaign(campaign)}
                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCampaign.clientName}</h2>
                  <p className="text-gray-600">{selectedCampaign.packageName}</p>
                </div>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Campaign Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Investment</p>
                  <p className="text-2xl font-bold text-blue-900">${selectedCampaign.investment.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">ROI Generated</p>
                  <p className="text-2xl font-bold text-green-900">${selectedCampaign.roi.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-600 font-medium">ROI Percentage</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {((selectedCampaign.roi - selectedCampaign.investment) / selectedCampaign.investment * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Media Placements */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Placements</h3>
              <div className="space-y-4">
                {selectedCampaign.mediaPlacements.map((placement) => {
                  const PlacementIcon = placement.type === 'TV' ? Radio :
                                     placement.type === 'Streaming' ? Video :
                                     placement.type === 'Magazine' ? Newspaper :
                                     Megaphone;
                  const statusColor = placement.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    placement.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800';
                  return (
                    <div key={placement.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <PlacementIcon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{placement.outlet}</h4>
                            <p className="text-sm text-gray-500">{placement.type} Placement</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                          {placement.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Scheduled: {placement.scheduledDate}
                        </div>
                        {placement.completedDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Completed: {placement.completedDate}
                          </div>
                        )}
                        {placement.impressions && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Impressions: {placement.impressions.toLocaleString()}
                          </div>
                        )}
                      </div>
                      {placement.url && (
                        <div className="mt-3">
                          <a
                            href={placement.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View Placement →
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Notes */}
              {selectedCampaign.notes && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600">{selectedCampaign.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New PR Campaign</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreateCampaign}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.clientName}
                    onChange={(e) => setNewCampaign({...newCampaign, clientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Client company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                  <select
                    value={newCampaign.packageType}
                    onChange={(e) => setNewCampaign({...newCampaign, packageType: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Launch Pad">Launch Pad Package ($3,000-$5,000)</option>
                    <option value="Spotlight">Spotlight Package ($7,000-$12,000)</option>
                    <option value="Media Mogul">Media Mogul Package ($15,000-$25,000)</option>
                    <option value="NBC Streaming">NBC Streaming Channel ($12,000-$15,000)</option>
                    <option value="ABC News">ABC News Feature ($5,000-$10,000)</option>
                    <option value="Magazine Feature">Magazine Feature ($1,500-$4,000)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newCampaign.status}
                    onChange={(e) => setNewCampaign({...newCampaign, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered</option>
                    <option value="On Hold">On Hold</option>
                  </select>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
                    <input
                      type="date"
                      required
                      value={newCampaign.expectedDelivery}
                      onChange={(e) => setNewCampaign({...newCampaign, expectedDelivery: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investment ($)</label>
                  <input
                    type="number"
                    required
                    value={newCampaign.investment}
                    onChange={(e) => setNewCampaign({...newCampaign, investment: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newCampaign.notes}
                    onChange={(e) => setNewCampaign({...newCampaign, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Additional notes about this campaign"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {showEditModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit PR Campaign</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdateCampaign}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={selectedCampaign.clientName}
                    onChange={(e) => setSelectedCampaign({...selectedCampaign, clientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Client company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                  <select
                    value={selectedCampaign.packageType}
                    onChange={(e) => setSelectedCampaign({...selectedCampaign, packageType: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Launch Pad">Launch Pad Package ($3,000-$5,000)</option>
                    <option value="Spotlight">Spotlight Package ($7,000-$12,000)</option>
                    <option value="Media Mogul">Media Mogul Package ($15,000-$25,000)</option>
                    <option value="NBC Streaming">NBC Streaming Channel ($12,000-$15,000)</option>
                    <option value="ABC News">ABC News Feature ($5,000-$10,000)</option>
                    <option value="Magazine Feature">Magazine Feature ($1,500-$4,000)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedCampaign.status}
                    onChange={(e) => setSelectedCampaign({...selectedCampaign, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={selectedCampaign.startDate}
                      onChange={(e) => setSelectedCampaign({...selectedCampaign, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
                    <input
                      type="date"
                      required
                      value={selectedCampaign.expectedDelivery}
                      onChange={(e) => setSelectedCampaign({...selectedCampaign, expectedDelivery: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investment ($)</label>
                  <input
                    type="number"
                    required
                    value={selectedCampaign.investment}
                    onChange={(e) => setSelectedCampaign({...selectedCampaign, investment: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={selectedCampaign.notes}
                    onChange={(e) => setSelectedCampaign({...selectedCampaign, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Additional notes about this campaign"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}