'use client';

import { useState, useEffect } from 'react';
import { testConnection } from '../../lib/honeybook-integration-active';

export default function HoneyBookSettingsPage() {
  const [apiKey, setApiKey] = useState('943cdea5-c7ff-41d3-a24e-5927a7183dbf');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [emailArchiveEnabled, setEmailArchiveEnabled] = useState(true);
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(true);
  const [autoArchive, setAutoArchive] = useState(true);
  const [emailCount, setEmailCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [upcomingBookingCount, setUpcomingBookingCount] = useState(0);

  useEffect(() => {
    checkConnection();
    loadStats();
  }, []);

  const loadStats = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const emails = JSON.parse(localStorage.getItem('honeybook_emails') || '[]');
      const bookings = JSON.parse(localStorage.getItem('honeybook_bookings') || '[]');
      const upcoming = bookings.filter((b: any) => new Date(b.startTime) > new Date());
      
      setEmailCount(emails.length);
      setBookingCount(bookings.length);
      setUpcomingBookingCount(upcoming.length);
    }
  };

  const checkConnection = async () => {
    setConnectionStatus('checking');
    const isConnected = await testConnection();
    setConnectionStatus(isConnected ? 'connected' : 'disconnected');
  };

  const handleSave = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('honeybook_api_key', apiKey);
      localStorage.setItem('honeybook_email_archive', emailArchiveEnabled.toString());
      localStorage.setItem('honeybook_calendar_sync', calendarSyncEnabled.toString());
      localStorage.setItem('honeybook_auto_archive', autoArchive.toString());
      alert('Settings saved successfully!');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">HoneyBook Integration Settings</h1>
        <p className="text-gray-600 mt-1">Configure your HoneyBook integration for email archiving and calendar bookings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection Status Card */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Connection Status</h2>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Primary Storage</span>
            <div className="flex items-center gap-2">
              <>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-600 font-medium">localStorage (Active)</span>
              </>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">HoneyBook API Backup</span>
            <div className="flex items-center gap-2">
              {connectionStatus === 'checking' && (
                <span className="text-sm text-yellow-600">Checking...</span>
              )}
              {connectionStatus === 'connected' && (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </>
              )}
              {connectionStatus === 'disconnected' && (
                <>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="text-sm text-yellow-600 font-medium">Not Connected (Optional)</span>
                </>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key (Optional)</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              HoneyBook API key for backup storage. localStorage is always used as primary storage.
            </p>
          </div>

          <button
            onClick={checkConnection}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Test API Connection
          </button>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-900 font-medium">ℹ️ Information</p>
            <p className="text-xs text-blue-700 mt-1">
              Your emails and bookings are always stored in localStorage (browser storage). This is your primary storage and it's working perfectly. The HoneyBook API is an optional backup that requires additional configuration. You don't need it for daily operations.
            </p>
          </div>
        </div>

        {/* Features Card */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Features</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Email Archiving</p>
                <p className="text-xs text-gray-500">Automatically archive all email communications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailArchiveEnabled}
                  onChange={(e) => setEmailArchiveEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Calendar Sync</p>
                <p className="text-xs text-gray-500">Sync bookings with HoneyBook calendar</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={calendarSyncEnabled}
                  onChange={(e) => setCalendarSyncEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Auto-Archive</p>
                <p className="text-xs text-gray-500">Automatically archive emails from Instantly.ai</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoArchive}
                  onChange={(e) => setAutoArchive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Email Archive Card */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Archive</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Archived Emails</span>
              <span className="text-sm font-medium text-gray-900">
                {emailCount}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="text-sm font-medium text-gray-900">~{(emailCount * 0.1).toFixed(1)} MB</span>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  if (confirm('Clear all archived emails?')) {
                    localStorage.removeItem('honeybook_emails');
                    setEmailCount(0);
                    alert('Email archive cleared');
                    window.location.reload();
                  }
                }}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Clear Email Archive
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Bookings Card */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendar Bookings</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Bookings</span>
              <span className="text-sm font-medium text-gray-900">
                {bookingCount}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Upcoming Bookings</span>
              <span className="text-sm font-medium text-gray-900">
                {upcomingBookingCount}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  if (confirm('Clear all bookings?')) {
                    localStorage.removeItem('honeybook_bookings');
                    setBookingCount(0);
                    setUpcomingBookingCount(0);
                    alert('Bookings cleared');
                    window.location.reload();
                  }
                }}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Clear Bookings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}