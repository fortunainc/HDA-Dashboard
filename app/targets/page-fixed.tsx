'use client'

import { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { Plus, Target, TrendingUp, DollarSign, Calendar } from 'lucide-react'

export default function TargetsPage() {
  const [targets, setTargets] = useState([
    { id: 1, name: 'Monthly Revenue Target', type: 'Revenue', current: 12450, target: 25000, period: 'Month', unit: '$' },
    { id: 2, name: 'Quarterly Revenue Target', type: 'Revenue', current: 45000, target: 90000, period: 'Quarter', unit: '$' },
    { id: 3, name: 'Yearly Revenue Target', type: 'Revenue', current: 150000, target: 300000, period: 'Year', unit: '$' },
    { id: 4, name: 'New Leads Target', type: 'Leads', current: 234, target: 500, period: 'Month', unit: '' },
    { id: 5, name: 'Conversion Rate Target', type: 'Rate', current: 3.2, target: 5.0, period: 'Month', unit: '%' },
    { id: 6, name: 'New Clients Target', type: 'Clients', current: 12, target: 25, period: 'Quarter', unit: '' },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTarget, setSelectedTarget] = useState<any>(null)
  const [newTarget, setNewTarget] = useState({
    name: '',
    type: 'Revenue',
    current: 0,
    target: 0,
    period: 'Month',
    unit: '$'
  })

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100).toFixed(1)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-600'
    if (percentage >= 50) return 'bg-blue-600'
    if (percentage >= 25) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  const handleAddTarget = (e: React.FormEvent) => {
    e.preventDefault()
    const target = {
      id: targets.length + 1,
      name: newTarget.name,
      type: newTarget.type,
      current: parseFloat(newTarget.current.toString()),
      target: parseFloat(newTarget.target.toString()),
      period: newTarget.period,
      unit: newTarget.unit
    }
    setTargets([...targets, target])
    setShowAddModal(false)
    setNewTarget({
      name: '',
      type: 'Revenue',
      current: 0,
      target: 0,
      period: 'Month',
      unit: '$'
    })
  }

  const handleEditTarget = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedTargets = targets.map(t => 
      t.id === selectedTarget.id 
        ? { ...t, ...selectedTarget, current: parseFloat(selectedTarget.current.toString()), target: parseFloat(selectedTarget.target.toString()) }
        : t
    )
    setTargets(updatedTargets)
    setShowEditModal(false)
    setSelectedTarget(null)
  }

  const handleDeleteTarget = () => {
    setTargets(targets.filter(t => t.id !== selectedTarget.id))
    setShowDeleteModal(false)
    setSelectedTarget(null)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Targets</h1>
            <p className="text-gray-600 mt-1">Track your sales targets and goals</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Target
          </button>
        </div>

        {/* Add Target Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Target</h2>
              <form onSubmit={handleAddTarget}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Name</label>
                    <input
                      type="text"
                      required
                      value={newTarget.name}
                      onChange={(e) => setNewTarget({...newTarget, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Monthly Revenue Target"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Type</label>
                    <select
                      value={newTarget.type}
                      onChange={(e) => setNewTarget({...newTarget, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Revenue">Revenue</option>
                      <option value="Leads">Leads</option>
                      <option value="Rate">Conversion Rate</option>
                      <option value="Clients">Clients</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
                      <input
                        type="number"
                        required
                        value={newTarget.current}
                        onChange={(e) => setNewTarget({...newTarget, current: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                      <input
                        type="number"
                        required
                        value={newTarget.target}
                        onChange={(e) => setNewTarget({...newTarget, target: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                    <select
                      value={newTarget.period}
                      onChange={(e) => setNewTarget({...newTarget, period: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Month">Month</option>
                      <option value="Quarter">Quarter</option>
                      <option value="Year">Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      value={newTarget.unit}
                      onChange={(e) => setNewTarget({...newTarget, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="$">Dollars ($)</option>
                      <option value="">Number (no unit)</option>
                      <option value="%">Percentage (%)</option>
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
                    Add Target
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
                <p className="text-sm font-medium text-gray-600">Monthly Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">49.8%</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <Target className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quarterly Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">50%</p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yearly Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">50%</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {targets.map((target) => {
            const progress = parseFloat(getProgressPercentage(target.current, target.target))
            const progressColor = getProgressColor(progress)

            return (
              <div key={target.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}>
                      {target.type === 'Revenue' && <DollarSign className="text-white" size={20} />}
                      {target.type === 'Leads' && <Target className="text-white" size={20} />}
                      {target.type === 'Rate' && <TrendingUp className="text-white" size={20} />}
                      {target.type === 'Clients' && <Calendar className="text-white" size={20} />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{target.name}</h3>
                      <p className="text-sm text-gray-500">{target.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {target.unit}{target.current.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">of {target.unit}{target.target.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => { setSelectedTarget(target); setShowEditModal(true) }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        onClick={() => { setSelectedTarget(target); setShowDeleteModal(true) }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${progressColor} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{target.unit}{target.current.toLocaleString()} achieved</span>
                    <span>{target.unit}{(target.target - target.current).toLocaleString()} remaining</span>
                  </div>
                </div>

                {progress >= 100 ? (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">🎉 Target Achieved!</p>
                    <p className="text-xs text-green-700 mt-1">You've exceeded your {target.name.toLowerCase()}!</p>
                  </div>
                ) : progress >= 80 ? (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Almost There!</p>
                    <p className="text-xs text-blue-700 mt-1">You're {target.unit}{(target.target - target.current).toLocaleString()} away from your target.</p>
                  </div>
                ) : progress >= 50 ? (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-900">Halfway There!</p>
                    <p className="text-xs text-yellow-700 mt-1">Keep pushing! {target.unit}{(target.target - target.current).toLocaleString()} to go.</p>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* Edit Target Modal */}
        {showEditModal && selectedTarget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Target</h2>
              <form onSubmit={handleEditTarget}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Name</label>
                    <input
                      type="text"
                      required
                      value={selectedTarget.name}
                      onChange={(e) => setSelectedTarget({...selectedTarget, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Type</label>
                    <select
                      value={selectedTarget.type}
                      onChange={(e) => setSelectedTarget({...selectedTarget, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Revenue">Revenue</option>
                      <option value="Leads">Leads</option>
                      <option value="Rate">Conversion Rate</option>
                      <option value="Clients">Clients</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
                      <input
                        type="number"
                        required
                        value={selectedTarget.current}
                        onChange={(e) => setSelectedTarget({...selectedTarget, current: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                      <input
                        type="number"
                        required
                        value={selectedTarget.target}
                        onChange={(e) => setSelectedTarget({...selectedTarget, target: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                    <select
                      value={selectedTarget.period}
                      onChange={(e) => setSelectedTarget({...selectedTarget, period: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Month">Month</option>
                      <option value="Quarter">Quarter</option>
                      <option value="Year">Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      value={selectedTarget.unit}
                      onChange={(e) => setSelectedTarget({...selectedTarget, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="$">Dollars ($)</option>
                      <option value="">Number (no unit)</option>
                      <option value="%">Percentage (%)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => { setShowEditModal(false); setSelectedTarget(null) }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update Target
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Target Modal */}
        {showDeleteModal && selectedTarget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Delete Target</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedTarget.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setSelectedTarget(null) }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTarget}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Target
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}