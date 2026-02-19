'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { TrendingUp, DollarSign, Users, Radio, Newspaper, Video, Calendar, Filter, Download } from 'lucide-react';

interface PRAnalyticsData {
  period: string;
  totalCampaigns: number;
  totalInvestment: number;
  totalROI: number;
  averageROI: number;
  totalImpressions: number;
  totalLeads: number;
  conversionRate: number;
  campaignBreakdown: {
    nbc: { count: number; investment: number; roi: number; impressions: number };
    abc: { count: number; investment: number; roi: number; impressions: number };
    magazine: { count: number; investment: number; roi: number; impressions: number };
    podcast: { count: number; investment: number; roi: number; impressions: number };
  };
  monthlyTrend: {
    month: string;
    investment: number;
    roi: number;
    campaigns: number;
  }[];
}

export default function PRAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [analyticsData] = useState<PRAnalyticsData>({
    period: '30',
    totalCampaigns: 12,
    totalInvestment: 125000,
    totalROI: 375000,
    averageROI: 300,
    totalImpressions: 2500000,
    totalLeads: 485,
    conversionRate: 8.5,
    campaignBreakdown: {
      nbc: { count: 3, investment: 42000, roi: 168000, impressions: 1200000 },
      abc: { count: 2, investment: 15000, roi: 45000, impressions: 300000 },
      magazine: { count: 5, investment: 52000, roi: 125000, impressions: 800000 },
      podcast: { count: 2, investment: 16000, roi: 37000, impressions: 200000 }
    },
    monthlyTrend: [
      { month: 'Sep', investment: 25000, roi: 75000, campaigns: 2 },
      { month: 'Oct', investment: 35000, roi: 105000, campaigns: 3 },
      { month: 'Nov', investment: 40000, roi: 120000, campaigns: 4 },
      { month: 'Dec', investment: 25000, roi: 75000, campaigns: 3 }
    ]
  });

  const roiPercentage = ((analyticsData.totalROI - analyticsData.totalInvestment) / analyticsData.totalInvestment * 100).toFixed(0);

  const handleExport = () => {
    // Create CSV content
    const csvContent = [
      'PR Analytics Report',
      `Period: Last ${selectedPeriod} days`,
      '',
      'Key Metrics',
      'Total Campaigns,' + analyticsData.totalCampaigns,
      'Total Investment,$' + analyticsData.totalInvestment.toLocaleString(),
      'Total ROI,$' + analyticsData.totalROI.toLocaleString(),
      'Average ROI,' + analyticsData.averageROI + '%',
      'Total Impressions,' + analyticsData.totalImpressions.toLocaleString(),
      'Total Leads,' + analyticsData.totalLeads,
      'Conversion Rate,' + analyticsData.conversionRate + '%',
      '',
      'Campaign Breakdown',
      'Platform,Campaigns,Investment,ROI,Impressions',
      'NBC Streaming,' + analyticsData.campaignBreakdown.nbc.count + ',$' + analyticsData.campaignBreakdown.nbc.investment.toLocaleString() + ',$' + analyticsData.campaignBreakdown.nbc.roi.toLocaleString() + ',' + analyticsData.campaignBreakdown.nbc.impressions.toLocaleString(),
      'ABC News,' + analyticsData.campaignBreakdown.abc.count + ',$' + analyticsData.campaignBreakdown.abc.investment.toLocaleString() + ',$' + analyticsData.campaignBreakdown.abc.roi.toLocaleString() + ',' + analyticsData.campaignBreakdown.abc.impressions.toLocaleString(),
      'Magazine,' + analyticsData.campaignBreakdown.magazine.count + ',$' + analyticsData.campaignBreakdown.magazine.investment.toLocaleString() + ',$' + analyticsData.campaignBreakdown.magazine.roi.toLocaleString() + ',' + analyticsData.campaignBreakdown.magazine.impressions.toLocaleString(),
      'Podcast,' + analyticsData.campaignBreakdown.podcast.count + ',$' + analyticsData.campaignBreakdown.podcast.investment.toLocaleString() + ',$' + analyticsData.campaignBreakdown.podcast.roi.toLocaleString() + ',' + analyticsData.campaignBreakdown.podcast.impressions.toLocaleString(),
      '',
      'Monthly Trend',
      'Month,Investment,ROI,Campaigns',
      ...analyticsData.monthlyTrend.map(m => `${m.month},$${m.investment},$${m.roi},${m.campaigns}`)
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `pr-analytics-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PR Analytics</h1>
            <p className="text-gray-600 mt-1">Track performance and ROI of all PR campaigns</p>
          </div>
        <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Investment</p>
              <p className="text-3xl font-bold">${analyticsData.totalInvestment.toLocaleString()}</p>
              <p className="text-blue-200 text-sm mt-1">
                {analyticsData.totalCampaigns} campaigns
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total ROI</p>
              <p className="text-3xl font-bold">${analyticsData.totalROI.toLocaleString()}</p>
              <p className="text-green-200 text-sm mt-1">
                {roiPercentage}% return
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Impressions</p>
              <p className="text-3xl font-bold">{(analyticsData.totalImpressions / 1000000).toFixed(1)}M</p>
              <p className="text-purple-200 text-sm mt-1">
                Across all platforms
              </p>
            </div>
            <Users className="h-12 w-12 text-purple-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Leads Generated</p>
              <p className="text-3xl font-bold">{analyticsData.totalLeads}</p>
              <p className="text-orange-200 text-sm mt-1">
                {analyticsData.conversionRate}% conversion
              </p>
            </div>
            <Radio className="h-12 w-12 text-orange-300" />
          </div>
        </div>
      </div>

      {/* Campaign Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Platform</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">NBC Streaming</p>
                  <p className="text-sm text-gray-500">{analyticsData.campaignBreakdown.nbc.count} campaigns</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${analyticsData.campaignBreakdown.nbc.roi.toLocaleString()}</p>
                <p className="text-sm text-green-600">
                  {((analyticsData.campaignBreakdown.nbc.roi / analyticsData.campaignBreakdown.nbc.investment * 100) - 100).toFixed(0)}% ROI
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Radio className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">ABC News</p>
                  <p className="text-sm text-gray-500">{analyticsData.campaignBreakdown.abc.count} campaigns</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${analyticsData.campaignBreakdown.abc.roi.toLocaleString()}</p>
                <p className="text-sm text-green-600">
                  {((analyticsData.campaignBreakdown.abc.roi / analyticsData.campaignBreakdown.abc.investment * 100) - 100).toFixed(0)}% ROI
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Newspaper className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Magazines</p>
                  <p className="text-sm text-gray-500">{analyticsData.campaignBreakdown.magazine.count} campaigns</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${analyticsData.campaignBreakdown.magazine.roi.toLocaleString()}</p>
                <p className="text-sm text-green-600">
                  {((analyticsData.campaignBreakdown.magazine.roi / analyticsData.campaignBreakdown.magazine.investment * 100) - 100).toFixed(0)}% ROI
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Radio className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Podcasts</p>
                  <p className="text-sm text-gray-500">{analyticsData.campaignBreakdown.podcast.count} campaigns</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${analyticsData.campaignBreakdown.podcast.roi.toLocaleString()}</p>
                <p className="text-sm text-green-600">
                  {((analyticsData.campaignBreakdown.podcast.roi / analyticsData.campaignBreakdown.podcast.investment * 100) - 100).toFixed(0)}% ROI
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h2>
          <div className="space-y-4">
            {analyticsData.monthlyTrend.map((month, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{month.month}</p>
                  <p className="text-sm text-gray-500">{month.campaigns} campaigns</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Investment</p>
                    <p className="font-bold text-gray-900">${month.investment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ROI</p>
                    <p className="font-bold text-green-600">${month.roi.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-900">{analyticsData.averageROI}%</p>
            <p className="text-sm text-blue-700 mt-1">Average ROI</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-900">
              ${(analyticsData.totalROI / analyticsData.totalCampaigns).toFixed(0).toLocaleString()}
            </p>
            <p className="text-sm text-green-700 mt-1">Avg ROI per Campaign</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-900">
              ${(analyticsData.totalROI / analyticsData.totalLeads).toFixed(0)}
            </p>
            <p className="text-sm text-purple-700 mt-1">Revenue per Lead</p>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}