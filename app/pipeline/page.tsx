'use client';

import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Search, MoreHorizontal, Calendar, DollarSign, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const columns = [
  { id: 'new', name: 'New', color: 'border-blue-500' },
  { id: 'contacted', name: 'Contacted', color: 'border-purple-500' },
  { id: 'qualified', name: 'Qualified', color: 'border-green-500' },
  { id: 'proposal', name: 'Proposal', color: 'border-yellow-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'border-orange-500' },
];

const initialPipelineItems = [
  { id: 1, title: 'Acme Corporation', company: 'Acme Corporation', value: '$8,000', status: 'new', date: 'Jan 15, 2024', priority: 'high' },
  { id: 2, title: 'Global Solutions', company: 'Global Solutions', value: '$5,000', status: 'contacted', date: 'Jan 14, 2024', priority: 'medium' },
  { id: 3, title: 'Innovate Labs', company: 'Innovate Labs', value: '$12,000', status: 'qualified', date: 'Jan 13, 2024', priority: 'high' },
  { id: 4, title: 'Smart Finance', company: 'Smart Finance', value: '$6,000', status: 'new', date: 'Jan 12, 2024', priority: 'low' },
  { id: 5, title: 'Tech Startups Inc', company: 'Tech Startups Inc', value: '$10,000', status: 'contacted', date: 'Jan 11, 2024', priority: 'high' },
  { id: 6, title: 'Digital Marketing Pro', company: 'Digital Marketing Pro', value: '$7,500', status: 'proposal', date: 'Jan 10, 2024', priority: 'medium' },
  { id: 7, title: 'E-Commerce Plus', company: 'E-Commerce Plus', value: '$9,000', status: 'negotiation', date: 'Jan 9, 2024', priority: 'high' },
];

const getPriorityColor = (priority: string) => {
  const colors: { [key: string]: string } = {
    'high': 'bg-red-100 text-red-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'low': 'bg-green-100 text-green-800',
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
};

export default function PipelinePage() {
  const [pipelineItems, setPipelineItems] = useState(initialPipelineItems);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<typeof pipelineItems[0] | null>(null);
  
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    company: '',
    value: '',
    status: 'new',
    priority: 'medium'
  });

  const filteredItems = pipelineItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    const opportunity = {
      id: pipelineItems.length + 1,
      title: newOpportunity.title,
      company: newOpportunity.company,
      value: `$${parseInt(newOpportunity.value).toLocaleString()}`,
      status: newOpportunity.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priority: newOpportunity.priority
    };
    setPipelineItems([...pipelineItems, opportunity]);
    setShowAddModal(false);
    setNewOpportunity({
      title: '',
      company: '',
      value: '',
      status: 'new',
      priority: 'medium'
    });
  };

  const handleEditOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOpportunity) {
      setPipelineItems(pipelineItems.map(item => 
        item.id === selectedOpportunity.id 
          ? { 
              ...item, 
              title: newOpportunity.title,
              company: newOpportunity.company,
              value: `$${parseInt(newOpportunity.value).toLocaleString()}`,
              status: newOpportunity.status,
              priority: newOpportunity.priority
            }
          : item
      ));
      setShowEditModal(false);
      setSelectedOpportunity(null);
    }
  };

  const handleDeleteOpportunity = (id: number) => {
    if (confirm('Are you sure you want to delete this opportunity?')) {
      setPipelineItems(pipelineItems.filter(item => item.id !== id));
    }
  };

  const handleMoveToStage = (stage: string) => {
    const emptyOpp = {
      title: '',
      company: '',
      value: '',
      status: stage,
      priority: 'medium'
    };
    setNewOpportunity(emptyOpp as any);
    setShowAddModal(true);
  };

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    e.dataTransfer.setData('text/plain', itemId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('text/plain'));
    setPipelineItems(pipelineItems.map(item => 
      item.id === itemId 
        ? { ...item, status: targetStatus }
        : item
    ));
  };

  const openEditModal = (opportunity: typeof pipelineItems[0]) => {
    setSelectedOpportunity(opportunity);
    setNewOpportunity({
      title: opportunity.title,
      company: opportunity.company,
      value: opportunity.value.replace(/[$,]/g, ''),
      status: opportunity.status,
      priority: opportunity.priority
    });
    setShowEditModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
            <p className="text-gray-600 mt-1">Track and manage your sales opportunities</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> Add Opportunity
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Add Opportunity Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Opportunity</h2>
              <form onSubmit={handleAddOpportunity}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={newOpportunity.title}
                      onChange={(e) => setNewOpportunity({...newOpportunity, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Acme Corporation Deal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={newOpportunity.company}
                      onChange={(e) => setNewOpportunity({...newOpportunity, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                    <input
                      type="number"
                      required
                      value={newOpportunity.value}
                      onChange={(e) => setNewOpportunity({...newOpportunity, value: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="8000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                      value={newOpportunity.status}
                      onChange={(e) => setNewOpportunity({...newOpportunity, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newOpportunity.priority}
                      onChange={(e) => setNewOpportunity({...newOpportunity, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
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
                    Add Opportunity
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Opportunity Modal */}
        {showEditModal && selectedOpportunity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Opportunity</h2>
              <form onSubmit={handleEditOpportunity}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={newOpportunity.title}
                      onChange={(e) => setNewOpportunity({...newOpportunity, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={newOpportunity.company}
                      onChange={(e) => setNewOpportunity({...newOpportunity, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                    <input
                      type="number"
                      required
                      value={newOpportunity.value}
                      onChange={(e) => setNewOpportunity({...newOpportunity, value: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                      value={newOpportunity.status}
                      onChange={(e) => setNewOpportunity({...newOpportunity, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newOpportunity.priority}
                      onChange={(e) => setNewOpportunity({...newOpportunity, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {columns.map((column) => {
            const columnItems = filteredItems.filter(item => item.status === column.id);
            const totalValue = columnItems.reduce((sum, item) => {
              return sum + parseInt(item.value.replace(/[$,]/g, ''));
            }, 0);

            return (
              <div 
                key={column.id} 
                className="bg-gray-100 rounded-lg p-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{column.name}</h3>
                    <p className="text-sm text-gray-600">${totalValue.toLocaleString()}</p>
                  </div>
                  <button className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className={`border-t-2 ${column.color} pt-4 space-y-3`}>
                  {columnItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{item.company}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} />
                          <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 border-t border-gray-100 pt-2">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="flex-1 p-1 text-blue-600 hover:bg-blue-50 rounded text-xs flex items-center justify-center gap-1"
                        >
                          <Edit size={12} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteOpportunity(item.id)}
                          className="flex-1 p-1 text-red-600 hover:bg-red-50 rounded text-xs flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {columnItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No opportunities</p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleMoveToStage(column.id)}
                  className="w-full mt-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-200 hover:border-gray-400 transition-colors"
                >
                  + Add to {column.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}