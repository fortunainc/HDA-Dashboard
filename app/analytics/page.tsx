'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Download, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('6m');

  // Mock revenue data for chart - dynamic based on date range
  const getRevenueData = (range: string) => {
    switch(range) {
      case '7d':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [1800, 2100, 1950, 2300, 2150, 1900, 2050]
        };
      case '30d':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          values: [8500, 9200, 10100, 9800]
        };
      case '3m':
        return {
          labels: ['Oct 2024', 'Nov 2024', 'Dec 2024'],
          values: [28500, 31000, 33500]
        };
      case '6m':
        return {
          labels: ['Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025'],
          values: [8500, 9200, 10100, 9800, 11200, 12450]
        };
      case '1y':
        return {
          labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
          values: [7500, 8000, 8200, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500]
        };
      default:
        return {
          labels: ['Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025'],
          values: [8500, 9200, 10100, 9800, 11200, 12450]
        };
    }
  };

  const revenueData = getRevenueData(dateRange);

  // Calculate dynamic metrics based on date range
  const currentRevenue = revenueData.values.reduce((a, b) => a + b, 0);
  const previousRevenue = revenueData.values.reduce((a, b) => a + b, 0) * 0.9; // Simulate 10% growth
  const revenueGrowth = ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1);
  
  const metrics = {
    totalRevenue: currentRevenue.toLocaleString(),
    revenueGrowth: revenueGrowth,
    activeLeads: Math.round(currentRevenue / 50),
    leadsGrowth: ((Math.random() * 10) + 5).toFixed(1),
    conversionRate: (3 + Math.random() * 1).toFixed(1),
    conversionGrowth: ((Math.random() * 2) - 1).toFixed(1),
    activeCampaigns: Math.round(currentRevenue / 1000),
    campaignGrowth: Math.floor(Math.random() * 3) + 1
  };

  const handleExport = () => {
    alert('Exporting analytics report... This would generate a PDF/CSV report in production.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track your business performance and metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-3 py-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border-none bg-transparent text-sm focus:outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="3m">Last 3 months</option>
                <option value="6m">Last 6 months</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${metrics.totalRevenue}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {parseFloat(metrics.revenueGrowth) >= 0 ? (
                <ArrowUpRight className="text-green-600 mr-1" size={16} />
              ) : (
                <ArrowDownRight className="text-red-600 mr-1" size={16} />
              )}
              <span className={`text-sm font-medium ${parseFloat(metrics.revenueGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(metrics.revenueGrowth) >= 0 ? '+' : ''}{metrics.revenueGrowth}%
              </span>
              <span className="text-sm text-gray-500 ml-2">from previous period</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.activeLeads}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="text-green-600 mr-1" size={16} />
              <span className="text-sm font-medium text-green-600">+{metrics.leadsGrowth}%</span>
              <span className="text-sm text-gray-500 ml-2">from previous period</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.conversionRate}%</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {parseFloat(metrics.conversionGrowth) >= 0 ? (
                <ArrowUpRight className="text-green-600 mr-1" size={16} />
              ) : (
                <ArrowDownRight className="text-red-600 mr-1" size={16} />
              )}
              <span className={`text-sm font-medium ${parseFloat(metrics.conversionGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(metrics.conversionGrowth) >= 0 ? '+' : ''}{metrics.conversionGrowth}%
              </span>
              <span className="text-sm text-gray-500 ml-2">from previous period</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.activeCampaigns}</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-lg">
                <Activity className="text-white" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="text-green-600 mr-1" size={16} />
              <span className="text-sm font-medium text-green-600">+{metrics.campaignGrowth}</span>
              <span className="text-sm text-gray-500 ml-2">from previous period</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
            <div className="h-64">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Grid lines */}
                <line x1="50" y1="20" x2="50" y2="170" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="50" y1="170" x2="380" y2="170" stroke="#e5e7eb" strokeWidth="1" />
                
                {/* Y-axis labels */}
                <text x="40" y="25" fontSize="10" fill="#6b7280" textAnchor="end">$15K</text>
                <text x="40" y="65" fontSize="10" fill="#6b7280" textAnchor="end">$12K</text>
                <text x="40" y="105" fontSize="10" fill="#6b7280" textAnchor="end">$9K</text>
                <text x="40" y="145" fontSize="10" fill="#6b7280" textAnchor="end">$6K</text>
                
                {/* Dynamic Revenue line chart */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  points={revenueData.values.map((value, index) => {
                    const x = 60 + (index * (300 / Math.max(revenueData.values.length - 1, 1)));
                    const y = 170 - (Math.min(value, 15000) / 15000 * 150);
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Data points */}
                {revenueData.values.map((value, index) => {
                  const x = 60 + (index * (300 / Math.max(revenueData.values.length - 1, 1)));
                  const y = 170 - (Math.min(value, 15000) / 15000 * 150);
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
                
                {/* X-axis labels */}
                {revenueData.labels.map((label, index) => {
                  const x = 60 + (index * (300 / Math.max(revenueData.labels.length - 1, 1)));
                  return (
                    <text
                      key={index}
                      x={x}
                      y="185"
                      fontSize="9"
                      fill="#6b7280"
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">LinkedIn</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Website</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Referrals</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Cold Outreach</span>
                  <span className="font-medium">17%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Industry Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Technology</span>
                  <span className="font-medium">$5,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Financial Services</span>
                  <span className="font-medium">$3,500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Healthcare</span>
                  <span className="font-medium">$2,500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Other</span>
                  <span className="font-medium">$1,450</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Clients</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Acme Corporation</p>
                  <p className="text-xs text-gray-500">Technology</p>
                </div>
                <p className="font-semibold text-green-600">$8,000</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Innovate Labs</p>
                  <p className="text-xs text-gray-500">SaaS</p>
                </div>
                <p className="font-semibold text-green-600">$6,500</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Tech Startups Inc</p>
                  <p className="text-xs text-gray-500">Technology</p>
                </div>
                <p className="font-semibold text-green-600">$5,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}