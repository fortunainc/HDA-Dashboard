'use client'

import DashboardLayout from '../../components/DashboardLayout'
import { Calendar, Clock, User, Video, MapPin, Plus, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { honeybookSeamless } from '../../lib/honeybook-seamless-integration'

const bookings = [
  { id: 1, title: 'Strategy Call with Acme Corp', date: '2024-01-18', time: '10:00 AM', client: 'John Smith', type: 'Video Call', status: 'confirmed' },
  { id: 2, title: 'Demo Presentation', date: '2024-01-18', time: '2:00 PM', client: 'Sarah Johnson', type: 'Video Call', status: 'confirmed' },
  { id: 3, title: 'Onboarding Session', date: '2024-01-19', time: '11:00 AM', client: 'Mike Chen', type: 'Video Call', status: 'pending' },
  { id: 4, title: 'Quarterly Review', date: '2024-01-20', time: '9:00 AM', client: 'Emily Davis', type: 'Video Call', status: 'confirmed' },
  { id: 5, title: 'New Client Discovery', date: '2024-01-22', time: '3:00 PM', client: 'David Wilson', type: 'Phone Call', status: 'pending' },
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    'confirmed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'cancelled': 'bg-red-100 text-red-800',
    'completed': 'bg-blue-100 text-blue-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export default function BookingsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookingsData, setBookingsData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookings')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Error loading bookings from localStorage:', e)
        }
      }
    }
    return bookings
  });
  const [newBooking, setNewBooking] = useState({
    title: '',
    date: '',
    time: '',
    client: '',
    type: 'Video Call',
    status: 'pending'
  });
  const [honeybookConnected, setHoneybookConnected] = useState(false);
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);

  useEffect(() => {
    checkConnections();
  }, []);

  const checkConnections = async () => {
    // Check HoneyBook connection
    const hbConnected = await honeybookSeamless.testConnection();
    setHoneybookConnected(hbConnected);

    // Google Calendar connection requires manual setup via settings
    // For now, mark as not connected until user sets it up
    setGoogleCalendarConnected(false);
  };

  const syncWithHoneyBook = async () => {
    setSyncing(true);
    setSyncStatus(null);

    try {
      const result = await honeybookSeamless.syncAll();
      
      if (result.success) {
        setSyncStatus({
          type: 'success',
          message: `Synced ${result.contacts} contacts, ${result.messages} messages, and ${result.bookings} bookings from HoneyBook`
        });
        setHoneybookConnected(true);
      } else {
        setSyncStatus({
          type: 'error',
          message: 'Failed to sync with HoneyBook. Please check your API key.'
        });
      }
    } catch (error) {
      setSyncStatus({
        type: 'error',
        message: 'An error occurred while syncing with HoneyBook.'
      });
    } finally {
      setSyncing(false);
    }
  };

  const connectGoogleCalendar = () => {
    // For now, show informative message about Google Calendar setup
    alert(`Google Calendar integration requires:

1. Google Cloud Console Project
2. Enable Calendar API
3. Create OAuth 2.0 credentials
4. Configure redirect URLs

For now, your bookings are stored locally and synced with HoneyBook. 
This ensures your data is always available and backed up.

To enable full Google Calendar integration, please:
1. Go to console.cloud.google.com
2. Create a new project
3. Enable Calendar API
4. Create OAuth 2.0 Client ID
5. Add your domain to authorized redirect URIs
6. Configure the environment variables in your dashboard`);
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const booking = {
      id: bookingsData.length + 1,
      title: newBooking.title,
      date: newBooking.date,
      time: newBooking.time,
      client: newBooking.client,
      type: newBooking.type,
      status: newBooking.status
    };
    const updatedBookings = [...bookingsData, booking];
    setBookingsData(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setShowAddModal(false);
    setNewBooking({
      title: '',
      date: '',
      time: '',
      client: '',
      type: 'Video Call',
      status: 'pending'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-600 mt-1">Manage your appointments and meetings</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            New Booking
          </button>
        </div>

        {/* Add Booking Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">New Booking</h2>
              <form onSubmit={handleAddBooking}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={newBooking.title}
                      onChange={(e) => setNewBooking({...newBooking, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Strategy Call"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={newBooking.date}
                        onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        required
                        value={newBooking.time}
                        onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <input
                      type="text"
                      required
                      value={newBooking.client}
                      onChange={(e) => setNewBooking({...newBooking, client: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newBooking.type}
                      onChange={(e) => setNewBooking({...newBooking, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Video Call">Video Call</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="In Person">In Person</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Calendar size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{booking.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {booking.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {booking.client}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <div className="flex gap-2">
                        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                          {booking.type === 'Video Call' ? (
                            <span className="flex items-center gap-1">
                              <Video size={14} />
                              Join
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              Details
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white">
                    <Calendar size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Status</h2>
              
              {/* HoneyBook Status */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${honeybookConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm font-medium text-gray-900">HoneyBook</span>
                  </div>
                  {honeybookConnected ? (
                    <span className="text-xs text-green-600 font-medium">Connected</span>
                  ) : (
                    <span className="text-xs text-yellow-600 font-medium">Not Connected</span>
                  )}
                </div>
                
                {syncStatus && (
                  <div className={`p-3 rounded-lg mb-3 ${
                    syncStatus.type === 'success' ? 'bg-green-50' : 
                    syncStatus.type === 'error' ? 'bg-red-50' : 'bg-blue-50'
                  }`}>
                    <div className="flex items-start gap-2">
                      {syncStatus.type === 'success' && <CheckCircle size={16} className="text-green-600 mt-0.5" />}
                      {syncStatus.type === 'error' && <AlertCircle size={16} className="text-red-600 mt-0.5" />}
                      {syncStatus.type === 'info' && <AlertCircle size={16} className="text-blue-600 mt-0.5" />}
                      <p className={`text-xs ${
                        syncStatus.type === 'success' ? 'text-green-700' : 
                        syncStatus.type === 'error' ? 'text-red-700' : 'text-blue-700'
                      }`}>
                        {syncStatus.message}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={syncWithHoneyBook}
                    disabled={syncing}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {syncing ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={16} />
                        Sync Now
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => window.location.href = '/honeybook-settings'}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Settings
                  </button>
                </div>
              </div>

              {/* Google Calendar Status */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${googleCalendarConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm font-medium text-gray-900">Google Calendar</span>
                  </div>
                  {googleCalendarConnected ? (
                    <span className="text-xs text-green-600 font-medium">Connected</span>
                  ) : (
                    <span className="text-xs text-yellow-600 font-medium">Setup Required</span>
                  )}
                </div>

                <button
                  onClick={connectGoogleCalendar}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Connect Google Calendar
                </button>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">📋 How Integration Works</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• <strong>Primary Storage:</strong> Your bookings are always stored locally (localStorage)</li>
                  <li>• <strong>HoneyBook Sync:</strong> Backup and sync with HoneyBook when connected</li>
                  <li>• <strong>Google Calendar:</strong> Optional sync for calendar integration (requires setup)</li>
                  <li>• <strong>Seamless:</strong> Your data is always available, no matter what</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}