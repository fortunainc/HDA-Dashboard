'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, TrendingUp, TrendingDown, Globe, Linkedin, Twitter, Facebook } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import { analyzeCompetitorEnhanced, convertToSWOT, generateRecommendations } from '@/lib/scrapers/enhanced-competitor-analyzer'
import { fetchRealCompetitorData, convertToDashboardFormat } from '@/lib/scrapers/real-data-fetcher'

interface Competitor {
  id: string
  name: string
  website: string
  industry: string
  description: string
  monthlyVisitors: number
  seoScore: number
  socialScore: number
  domainAge: number
  domainAuthority: number
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  recommendations?: string[]
  upsellOpportunities?: {
    service: string
    priority: 'high' | 'medium' | 'low'
    estimatedValue: string
    description: string
  }[]
  lastAnalyzedAt: Date
  monitoringEnabled: boolean
  techStack?: {
    cms: string
    analytics: string
    crm: string
    marketingAutomation: string
    hosting: string
  }
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [analyzingId, setAnalyzingId] = useState<string | null>(null)
  const [showRevenueCalculator, setShowRevenueCalculator] = useState(false)

  useEffect(() => {
    // Mock data - in production, this would fetch from API
    const mockCompetitors: Competitor[] = [
      {
        id: '1',
        name: 'Competitor A',
        website: 'https://example.com',
        industry: 'Technology',
        description: 'A leading competitor in the market',
        monthlyVisitors: 150000,
        seoScore: 75,
        socialScore: 68,
        domainAge: 5,
        domainAuthority: 45,
        strengths: ['Strong brand recognition', 'Large customer base'],
        weaknesses: ['Pricing is too high', 'Limited features'],
        opportunities: ['Expand to new markets', 'Improve customer service'],
        threats: ['New market entrants', 'Economic downturn'],
        lastAnalyzedAt: new Date(),
        monitoringEnabled: true,
      },
    ]
    
    setCompetitors(mockCompetitors)
    setLoading(false)
  }, [])

  const filteredCompetitors = competitors.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.website.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCompetitor = async (competitorData: { name: string; website: string; industry: string }) => {
    // Create new competitor object
    const newCompetitor: Competitor = {
      id: Date.now().toString(),
      name: competitorData.name,
      website: competitorData.website,
      industry: competitorData.industry,
      description: `Competitor in ${competitorData.industry}`,
      monthlyVisitors: 0,
      seoScore: 0,
      socialScore: 0,
      domainAge: 0,
      domainAuthority: 0,
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
      lastAnalyzedAt: new Date(),
      monitoringEnabled: true,
    }
    
    // Add to competitors list
    setCompetitors([...competitors, newCompetitor])
    
    // Close modal
    setShowAddModal(false)
    
    // Show success message (in production, you'd use a toast/notification)
    console.log('Competitor added successfully:', newCompetitor)
  }

  const handleAnalyzeCompetitor = async (id: string) => {
    // Find the competitor
    const competitor = competitors.find(c => c.id === id)
    if (!competitor) return
    
    // Set loading state
    setAnalyzingId(id)
    
    // Fetch real competitor data
    const realData = await fetchRealCompetitorData(competitor.website)
    
    // Convert to dashboard format
    const dashboardData = convertToDashboardFormat(realData)
    
    // Use enhanced analyzer for SWOT and recommendations
    const enhancedData = await analyzeCompetitorEnhanced(competitor.website)
    
    // Convert to SWOT format
    const swotData = convertToSWOT(enhancedData)
    
    // Generate recommendations
    const recommendations = generateRecommendations(enhancedData)
    
    // Create analyzed competitor object
    const analyzedCompetitor = {
      ...competitor,
      monthlyVisitors: dashboardData.monthlyVisitors,
      seoScore: dashboardData.seoScore,
      socialScore: dashboardData.socialScore,
      domainAge: dashboardData.domainAge,
      domainAuthority: dashboardData.domainAuthority,
      strengths: swotData.strengths,
      weaknesses: swotData.weaknesses,
      opportunities: swotData.opportunities,
      threats: swotData.threats,
      recommendations: recommendations,
      techStack: {
        cms: dashboardData.techStack.cms,
        analytics: dashboardData.techStack.analytics[0] || 'Google Analytics',
        crm: 'HubSpot',
        marketingAutomation: 'Unknown',
        hosting: 'Cloud',
      },
      upsellOpportunities: [
        {
          service: 'SEO Optimization Campaign',
          priority: (dashboardData.seoScore < 70 ? 'high' : 'medium') as 'high' | 'medium' | 'low',
          estimatedValue: '$3,000-$5,000/month',
          description: `Their SEO score of ${dashboardData.seoScore} indicates room for improvement. We can help you outrank them in search results.`,
        },
        {
          service: 'Social Media Management',
          priority: (dashboardData.socialScore < 50 ? 'high' : 'medium') as 'high' | 'medium' | 'low',
          estimatedValue: '$2,000-$3,000/month',
          description: `Their social score of ${dashboardData.socialScore} shows gaps in social engagement. We can build your social presence to compete effectively.`,
        },
        {
          service: 'Website Performance Optimization',
          priority: (dashboardData.pageSpeedMobile < 70 ? 'high' : 'medium') as 'high' | 'medium' | 'low',
          estimatedValue: '$2,000-$4,000/month',
          description: `Their mobile page speed score is ${dashboardData.pageSpeedMobile}. We can optimize your website for better performance and rankings.`,
        },
        {
          service: 'Competitive Intelligence Subscription',
          priority: 'medium' as const,
          estimatedValue: '$2,000/month',
          description: 'Continuous monitoring of this and other competitors with monthly strategic reports.',
        },
        {
          service: 'Marketing Automation Setup',
          priority: (dashboardData.techStack.analytics.includes('Google Analytics') ? 'low' : 'high') as 'high' | 'medium' | 'low',
          estimatedValue: '$2,000-$4,000/month',
          description: dashboardData.techStack.analytics.includes('Google Analytics') 
            ? 'Optimize your existing marketing automation for better conversion rates.'
            : 'They lack comprehensive analytics. We can set up complete marketing automation for your lead nurturing.',
        },
      ],
      lastAnalyzedAt: new Date(),
    }
    
    // Update competitors list
    setCompetitors(competitors.map(c => 
      c.id === id ? analyzedCompetitor : c
    ))
    
    // Clear loading state
    setAnalyzingId(null)
    
    console.log('Competitor analyzed successfully:', analyzedCompetitor)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'bg-green-100'
    if (score >= 50) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Competitor Intelligence</h1>
          <p className="text-gray-600 mt-1">
            Monitor and analyze your competitors to gain strategic insights
          </p>
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Competitors</p>
              <p className="text-2xl font-bold text-gray-900">{competitors.length}</p>
            </div>
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. SEO Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {competitors.length > 0 
                  ? Math.round(competitors.reduce((sum, c) => sum + c.seoScore, 0) / competitors.length)
                  : 0}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Social Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {competitors.length > 0 
                  ? Math.round(competitors.reduce((sum, c) => sum + c.socialScore, 0) / competitors.length)
                  : 0}
              </p>
            </div>
            <Twitter className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monitoring</p>
              <p className="text-2xl font-bold text-gray-900">
                {competitors.filter(c => c.monitoringEnabled).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Competitor
          </button>
        </div>
      </div>

      {/* Competitors Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading competitors...</p>
        </div>
      ) : filteredCompetitors.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No competitors found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Add your first competitor to start tracking'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Competitor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitors.map((competitor) => (
            <div
              key={competitor.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedCompetitor(competitor)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{competitor.name}</h3>
                    <a
                      href={competitor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {competitor.website}
                    </a>
                  </div>
                  {competitor.monitoringEnabled && (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Monitoring
                    </div>
                  )}
                </div>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`${getScoreBgColor(competitor.seoScore)} rounded-lg p-3`}>
                    <p className="text-xs text-gray-600 mb-1">SEO Score</p>
                    <p className={`text-xl font-bold ${getScoreColor(competitor.seoScore)}`}>
                      {competitor.seoScore}
                    </p>
                  </div>
                  <div className={`${getScoreBgColor(competitor.socialScore)} rounded-lg p-3`}>
                    <p className="text-xs text-gray-600 mb-1">Social Score</p>
                    <p className={`text-xl font-bold ${getScoreColor(competitor.socialScore)}`}>
                      {competitor.socialScore}
                    </p>
                  </div>
                </div>

                {/* Enhanced Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Domain Age</p>
                    <p className="text-lg font-bold text-blue-700">
                      {competitor.domainAge ? `${competitor.domainAge} years` : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Domain Authority</p>
                    <p className="text-lg font-bold text-purple-700">
                      {competitor.domainAuthority || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Traffic */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-1">Monthly Visitors</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {competitor.monthlyVisitors.toLocaleString()}
                  </p>
                </div>

                {/* Tech Stack */}
                {competitor.techStack && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">Technology Stack</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">CMS:</span>
                        <span className="text-gray-900 font-medium">{competitor.techStack.cms}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Analytics:</span>
                        <span className="text-gray-900 font-medium">{competitor.techStack.analytics}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SWOT Summary */}
                <div className="space-y-2">
                  <div className="flex items-start">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      {competitor.strengths[0] || 'No data'}
                    </span>
                  </div>
                  {competitor.threats[0] && (
                    <div className="flex items-start">
                      <TrendingDown className="h-4 w-4 text-red-600 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-700">{competitor.threats[0]}</span>
                    </div>
                  )}
                </div>

                {/* Last Analyzed */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Last analyzed: {new Date(competitor.lastAnalyzedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Competitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Competitor</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAddCompetitor({
                  name: formData.get('name') as string,
                  website: formData.get('website') as string,
                  industry: formData.get('industry') as string,
                })
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Competitor Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Competitor Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="website"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      name="industry"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Technology"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add & Analyze
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Competitor Detail Modal */}
      {selectedCompetitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCompetitor.name}</h2>
                  <a
                    href={selectedCompetitor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedCompetitor.website}
                  </a>
                </div>
                <button
                  onClick={() => setSelectedCompetitor(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* SWOT Analysis */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Strengths</h3>
                  <ul className="space-y-1">
                    {selectedCompetitor.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-green-800">• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Weaknesses</h3>
                  <ul className="space-y-1">
                    {selectedCompetitor.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm text-red-800">• {weakness}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Opportunities</h3>
                  <ul className="space-y-1">
                    {selectedCompetitor.opportunities.map((opportunity, i) => (
                      <li key={i} className="text-sm text-blue-800">• {opportunity}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Threats</h3>
                  <ul className="space-y-1">
                    {selectedCompetitor.threats.map((threat, i) => (
                      <li key={i} className="text-sm text-yellow-800">• {threat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actionable Recommendations */}
              {selectedCompetitor.recommendations && selectedCompetitor.recommendations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">💡</span>
                    Actionable Recommendations
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedCompetitor.recommendations.map((recommendation, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-900">
                          <span className="text-blue-600 font-bold">{i + 1}.</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Upsell Opportunities */}
              {selectedCompetitor.upsellOpportunities && selectedCompetitor.upsellOpportunities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-600">💰</span>
                    Upsell Opportunities
                  </h3>
                  <div className="space-y-3">
                    {selectedCompetitor.upsellOpportunities.map((upsell, i) => (
                      <div
                        key={i}
                        className="border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{upsell.service}</h4>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              upsell.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : upsell.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {upsell.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{upsell.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-green-600">
                            💵 {upsell.estimatedValue}
                          </span>
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Learn More →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => handleAnalyzeCompetitor(selectedCompetitor.id)}
                  disabled={analyzingId === selectedCompetitor.id}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {analyzingId === selectedCompetitor.id ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    'Run Full Analysis'
                  )}
                </button>
                <button
                  onClick={() => setSelectedCompetitor(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>

              {/* Revenue Calculator */}
              {selectedCompetitor.upsellOpportunities && selectedCompetitor.upsellOpportunities.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">💰</span>
                      Revenue Calculator
                    </h3>
                    <button
                      onClick={() => setShowRevenueCalculator(!showRevenueCalculator)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {showRevenueCalculator ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Low Estimate</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedCompetitor.upsellOpportunities.reduce((sum, opp) => {
                          const minVal = parseInt(opp.estimatedValue.split('-')[0].replace(/\D/g, ''))
                          return sum + minVal
                        }, 0).toLocaleString()}/month
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">High Estimate</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${selectedCompetitor.upsellOpportunities.reduce((sum, opp) => {
                          const maxVal = parseInt(opp.estimatedValue.split('-')[1]?.replace(/\D/g, '') || opp.estimatedValue.replace(/\D/g, ''))
                          return sum + maxVal
                        }, 0).toLocaleString()}/month
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Annual Potential</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${((selectedCompetitor.upsellOpportunities.reduce((sum, opp) => {
                          const avgVal = (parseInt(opp.estimatedValue.split('-')[0].replace(/\D/g, '')) + 
                            parseInt(opp.estimatedValue.split('-')[1]?.replace(/\D/g, '') || opp.estimatedValue.replace(/\D/g, ''))) / 2
                          return sum + avgVal
                        }, 0) * 12)).toLocaleString()}/year
                      </p>
                    </div>
                  </div>

                  {showRevenueCalculator && (
                    <div className="bg-white rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-2">Revenue Breakdown:</h4>
                      {selectedCompetitor.upsellOpportunities.map((opp, i) => {
                        const avgVal = (parseInt(opp.estimatedValue.split('-')[0].replace(/\D/g, '')) + 
                          parseInt(opp.estimatedValue.split('-')[1]?.replace(/\D/g, '') || opp.estimatedValue.replace(/\D/g, ''))) / 2
                        return (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{opp.service}</span>
                            <span className="font-semibold text-green-600">${avgVal.toLocaleString()}/month</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  )
}