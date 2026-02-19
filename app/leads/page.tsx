'use client';

import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const leads = [
  { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1 555-0101', industry: 'Technology', status: 'New', value: '$8,000', source: 'LinkedIn', date: '2024-01-15' },
  { id: 2, name: 'Global Solutions', email: 'info@globalsolutions.com', phone: '+1 555-0102', industry: 'Consulting', status: 'In Progress', value: '$5,000', source: 'Website', date: '2024-01-14' },
  { id: 3, name: 'Innovate Labs', email: 'hello@innovatelabs.com', phone: '+1 555-0103', industry: 'SaaS', status: 'Qualified', value: '$12,000', source: 'Referral', date: '2024-01-13' },
  { id: 4, name: 'Smart Finance', email: 'team@smartfinance.com', phone: '+1 555-0104', industry: 'Financial Services', status: 'New', value: '$6,000', source: 'LinkedIn', date: '2024-01-12' },
  { id: 5, name: 'Tech Startups Inc', email: 'founder@techstartups.com', phone: '+1 555-0105', industry: 'Technology', status: 'Contacted', value: '$10,000', source: 'Cold Outreach', date: '2024-01-11' },
  { id: 6, name: 'Digital Marketing Pro', email: 'info@digitalpro.com', phone: '+1 555-0106', industry: 'Marketing', status: 'Proposal', value: '$7,500', source: 'Website', date: '2024-01-10' },
  { id: 7, name: 'E-Commerce Plus', email: 'sales@ecomplus.com', phone: '+1 555-0107', industry: 'E-Commerce', status: 'Negotiation', value: '$9,000', source: 'LinkedIn', date: '2024-01-09' },
  { id: 8, name: 'Health Tech Solutions', email: 'info@healthtech.com', phone: '+1 555-0108', industry: 'Healthcare', status: 'New', value: '$15,000', source: 'Referral', date: '2024-01-08' },
];

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [leadsData, setLeadsData] = useState(leads);
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);

  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    const matchesIndustry = selectedIndustry === 'All' || lead.industry === selectedIndustry;
    const matchesSource = selectedSource === 'All' || lead.source === selectedSource;
    return matchesSearch && matchesStatus && matchesIndustry && matchesSource;
  });

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    industry: 'Technology',
    status: 'New',
    value: '',
    source: 'LinkedIn'
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = {
      id: leadsData.length + 1,
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      industry: newLead.industry,
      status: newLead.status,
      value: `$${parseInt(newLead.value).toLocaleString()}`,
      source: newLead.source,
      date: new Date().toISOString().split('T')[0]
    };
    setLeadsData([...leadsData, lead]);
    setShowAddModal(false);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      industry: 'Technology',
      status: 'New',
      value: '',
      source: 'LinkedIn'
    });
  };

  const handleEditLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLead) {
      setLeadsData(leadsData.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, ...newLead, value: `$${parseInt(newLead.value).toLocaleString()}` }
          : lead
      ));
      setShowEditModal(false);
      setSelectedLead(null);
    }
  };

  const handleDeleteLead = (id: number) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeadsData(leadsData.filter(lead => lead.id !== id));
    }
  };

  const handleExport = () => {
    const csv = [
      ['Company', 'Email', 'Phone', 'Industry', 'Status', 'Value', 'Source', 'Date'].join(','),
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.industry,
        lead.status,
        lead.value,
        lead.source,
        lead.date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const openEditModal = (lead: typeof leads[0]) => {
    setSelectedLead(lead);
    setNewLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      industry: lead.industry,
      status: lead.status,
      value: lead.value.replace(/[$,]/g, ''),
      source: lead.source
    });
    setShowEditModal(true);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-purple-100 text-purple-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Qualified': 'bg-green-100 text-green-800',
      'Proposal': 'bg-orange-100 text-orange-800',
      'Negotiation': 'bg-pink-100 text-pink-800',
      'Closed Won': 'bg-emerald-100 text-emerald-800',
      'Closed Lost': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Inventory</h1>
            <p className="text-gray-600 mt-1">Manage and track all your leads</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> Add New Lead
          </button>
        </div>

        {/* Add Lead Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
              <form onSubmit={handleAddLead}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="email@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 555-0100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                      value={newLead.industry}
                      onChange={(e) => setNewLead({...newLead, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Marketing">Marketing</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newLead.status}
                      onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                    <input
                      type="number"
                      required
                      value={newLead.value}
                      onChange={(e) => setNewLead({...newLead, value: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Outreach">Cold Outreach</option>
                      <option value="Event">Event</option>
                      <option value="Other">Other</option>
                    </select>
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
                    Add Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Lead Modal */}
        {showEditModal && selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
              <form onSubmit={handleEditLead}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                      value={newLead.industry}
                      onChange={(e) => setNewLead({...newLead, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Marketing">Marketing</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newLead.status}
                      onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                    <input
                      type="number"
                      required
                      value={newLead.value}
                      onChange={(e) => setNewLead({...newLead, value: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Outreach">Cold Outreach</option>
                      <option value="Event">Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Lead Modal */}
        {showViewModal && selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{selectedLead.name}</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{selectedLead.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="font-medium">{selectedLead.value}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="font-medium">{selectedLead.source}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Added</p>
                  <p className="font-medium">{selectedLead.date}</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-secondary flex items-center gap-2"
              >
                <Filter size={20} /> Filters {showFilters && '(Active)'}
              </button>
              <button 
                onClick={handleExport}
                className="btn btn-secondary flex items-center gap-2"
              >
                <Download size={20} /> Export
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="All">All Industries</option>
                    <option value="Technology">Technology</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Marketing">Marketing</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="All">All Sources</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Outreach">Cold Outreach</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Industry</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Value</th>
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">Date Added</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-sm text-gray-900">{lead.email}</p>
                      <p className="text-xs text-gray-500">{lead.phone}</p>
                    </td>
                    <td className="py-4 text-gray-600">{lead.industry}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 font-medium text-gray-900">{lead.value}</td>
                    <td className="py-4 text-gray-600">{lead.source}</td>
                    <td className="py-4 text-gray-600">{lead.date}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowViewModal(true);
                          }}
                          className="p-1 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => openEditModal(lead)}
                          className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">Showing {filteredLeads.length} of {leads.length} leads</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Previous</button>
              <button className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}