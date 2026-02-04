'use client'

import { useState, useEffect } from 'react'
import { 
  Search, Plus, TrendingUp, TrendingDown, Globe, Linkedin, Twitter, 
  Facebook, Download, Target, Users, DollarSign, BarChart3, 
  Mail, FileText, ExternalLink, CheckCircle, XCircle, AlertCircle
} from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

interface Competitor {
  id: string
  name: string
  website: string
  industry: string
  revenue: string
  employees: string
  description: string
  monthlyVisitors: number
  seoScore: number
  socialScore: number
  domainAge: number
  domainAuthority: number
  organicKeywords: number
  backlinks: number
  topKeywords: Array<{
    keyword: string
    volume: number
    difficulty: number
  }>
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

interface GeneratedLead {
  name: string
  title: string
  company: string
  email: string
  phone: string
  linkedin: string
  priority: 'high' | 'medium' | 'low'
  source: string
}

export default function CompetitorsPageEnhanced() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [analyzingId, setAnalyzingId] = useState<string | null>(null)
  const [showRevenueCalculator, setShowRevenueCalculator] = useState(false)
  const [showLeadGenerator, setShowLeadGenerator] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [generatedLeads, setGeneratedLeads] = useState<GeneratedLead[]>([])
  const [exportPlatform, setExportPlatform] = useState<'facebook' | 'linkedin' | 'google' | 'csv'>('csv')
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    // Mock data - in production, this would fetch from API
    const mockCompetitors: Competitor[] = [
      {
        id: '1',
        name: 'Example Corporation',
        website: 'https://example.com',
        industry: 'Technology',
        revenue: '$10M-$50M',
        employees: '50-200',
        description: 'Example competitor - add your real competitors here',
        monthlyVisitors: 125000,
        seoScore: 72,
        socialScore: 65,
        domainAge: 8,
        domainAuthority: 48,
        organicKeywords: 28500,
        backlinks: 3200,
        topKeywords: [
          { keyword: 'example keyword 1', volume: 12000, difficulty: 65 },
          { keyword: 'example keyword 2', volume: 8900, difficulty: 52 },
          { keyword: 'example keyword 3', volume: 15000, difficulty: 70 },
          { keyword: 'example keyword 4', volume: 6700, difficulty: 48 },
          { keyword: 'example keyword 5', volume: 5400, difficulty: 41 }
        ],
        strengths: [
          'Strong market position in their industry',
          'Established customer base',
          'Recognized brand name'
        ],
        weaknesses: [
          'Limited digital presence compared to competitors',
          'Higher pricing than market average',
          'Slower adoption of new technologies'
        ],
        opportunities: [
          'Expanding into new markets',
          'Growing demand for their services',
          'Opportunities in underserved segments'
        ],
        threats: [
          'New entrants offering lower-cost alternatives',
          'Changing market conditions',
          'Competitive pressure from larger players'
        ],
        recommendations: [
          'Launch targeted LinkedIn outreach campaigns to decision-makers',
          'Create SEO-optimized content targeting their keyword gaps',
          'Implement automated lead nurturing to improve response times',
          'Develop thought leadership content around industry trends'
        ],
        upsellOpportunities: [
          {
            service: 'SEO Optimization Campaign',
            priority: 'high',
            estimatedValue: '$3,000-$5,000/month',
            description: 'Comprehensive SEO strategy to improve organic rankings and capture competitor keyword positions'
          },
          {
            service: 'Content Marketing Strategy',
            priority: 'medium',
            estimatedValue: '$2,500-$4,000/month',
            description: 'Create competitive content targeting gaps in their content strategy'
          },
          {
            service: 'Social Media Management',
            priority: 'medium',
            estimatedValue: '$2,000-$3,000/month',
            description: 'Build active presence where they are weak'
          },
          {
            service: 'Competitive Intelligence Subscription',
            priority: 'high',
            estimatedValue: '$2,000/month',
            description: 'Ongoing monitoring with monthly strategic reports'
          }
        ],
        lastAnalyzedAt: new Date('2025-01-15'),
        monitoringEnabled: true,
        techStack: {
          cms: 'WordPress',
          analytics: 'Google Analytics',
          crm: 'HubSpot',
          marketingAutomation: 'Marketo',
          hosting: 'AWS'
        }
      },
    ]
    
    setCompetitors(mockCompetitors)
    setLoading(false)
  }, [])

  const filteredCompetitors = competitors.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.website.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCompetitor = async (competitorData: { 
    name: string; 
    website: string; 
    industry: string;
    revenue: string;
    employees: string;
  }) => {
    const newCompetitor: Competitor = {
      id: Date.now().toString(),
      name: competitorData.name,
      website: competitorData.website,
      industry: competitorData.industry,
      revenue: competitorData.revenue,
      employees: competitorData.employees,
      description: `Competitor in ${competitorData.industry} (${competitorData.revenue} revenue, ${competitorData.employees} employees)`,
      monthlyVisitors: 0,
      seoScore: 0,
      socialScore: 0,
      domainAge: 0,
      domainAuthority: 0,
      organicKeywords: 0,
      backlinks: 0,
      topKeywords: [],
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
      lastAnalyzedAt: new Date(),
      monitoringEnabled: true,
    }
    
    setCompetitors([...competitors, newCompetitor])
    setShowAddModal(false)
    console.log('Competitor added:', newCompetitor)
  }

  const handleAnalyzeCompetitor = async (id: string) => {
    const competitor = competitors.find(c => c.id === id)
    if (!competitor) return
    
    setAnalyzingId(id)
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const analyzedCompetitor = {
      ...competitor,
      monthlyVisitors: Math.floor(Math.random() * 100000) + 10000,
      seoScore: Math.floor(Math.random() * 40) + 60,
      socialScore: Math.floor(Math.random() * 40) + 60,
      domainAuthority: Math.floor(Math.random() * 30) + 40,
      organicKeywords: Math.floor(Math.random() * 50000) + 5000,
      backlinks: Math.floor(Math.random() * 10000) + 1000,
      topKeywords: [
        { keyword: 'healthcare technology', volume: 12000, difficulty: 65 },
        { keyword: 'patient engagement', volume: 8900, difficulty: 52 },
        { keyword: 'healthcare software', volume: 15000, difficulty: 70 },
        { keyword: 'digital health', volume: 6700, difficulty: 48 },
        { keyword: 'medical practice management', volume: 5400, difficulty: 41 }
      ],
      strengths: [
        'Strong brand recognition',
        'Large customer base',
        'Good market position'
      ],
      weaknesses: [
        'Pricing concerns',
        'Limited features',
        'Slow innovation'
      ],
      opportunities: [
        'Market expansion',
        'Product improvement',
        'Strategic partnerships'
      ],
      threats: [
        'New competitors',
        'Economic factors',
        'Regulatory changes'
      ],
      lastAnalyzedAt: new Date(),
    }
    
    setCompetitors(competitors.map(c => 
      c.id === id ? analyzedCompetitor : c
    ))
    
    setAnalyzingId(null)
  }

  const generateLeadsFromCompetitor = (competitor: Competitor) => {
    // Simulate lead generation based on competitor analysis
    const mockLeads: GeneratedLead[] = []
    const jobTitles = ['CEO', 'CTO', 'VP of Marketing', 'Director of IT', 'Chief Medical Officer']
    
    for (let i = 0; i < 25; i++) {
      mockLeads.push({
        name: `Lead ${i + 1}`,
        title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        company: `Company ${i + 1}`,
        email: `lead${i + 1}@company${i + 1}.com`,
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        linkedin: `linkedin.com/in/lead${i + 1}`,
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        source: competitor.name
      })
    }
    
    setGeneratedLeads(mockLeads)
    setShowLeadGenerator(true)
  }

  const exportToPlatform = async (platform: string, competitor: Competitor) => {
    setExporting(true)
    
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate CSV for download
    if (platform === 'csv') {
      const csvContent = generateCSVContent()
      downloadCSV(csvContent, `${competitor.name.replace(/\s+/g, '_')}_leads.csv`)
    }
    
    setExporting(false)
    setShowExportModal(false)
    console.log(`Exported ${competitor.name} leads to ${platform}`)
  }

  const generateCSVContent = (): string => {
    const headers = ['Name', 'Title', 'Company', 'Email', 'Phone', 'LinkedIn', 'Priority', 'Source']
    const rows = generatedLeads.map(lead => [
      lead.name,
      lead.title,
      lead.company,
      lead.email,
      lead.phone,
      lead.linkedin,
      lead.priority,
      lead.source
    ])
    
    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading competitors...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Competitor Intelligence</h1>
            <p className="text-gray-600 mt-1">Analyze competitors and generate leads</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Competitor
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search competitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Competitor Cards */}
        <div className="grid gap-6">
          {filteredCompetitors.map(competitor => (
            <div key={competitor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Competitor Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {competitor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{competitor.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Globe className="w-4 h-4" />
                      <a 
                        href={competitor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-green-600"
                      >
                        {competitor.website}
                      </a>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {competitor.industry}
                      </span>
                      {competitor.revenue && (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          💰 {competitor.revenue}
                        </span>
                      )}
                      {competitor.employees && (
                        <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          👥 {competitor.employees}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAnalyzeCompetitor(competitor.id)}
                    disabled={analyzingId === competitor.id}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Target className="w-4 h-4" />
                    {analyzingId === competitor.id ? 'Analyzing...' : 'Analyze'}
                  </button>
                  <button
                    onClick={() => generateLeadsFromCompetitor(competitor)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    Generate Leads
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCompetitor(competitor)
                      setShowExportModal(true)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              {competitor.monthlyVisitors > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Monthly Visitors</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {competitor.monthlyVisitors.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-medium">SEO Score</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{competitor.seoScore}</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm font-medium">Social Score</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{competitor.socialScore}</p>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium">Domain Auth</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{competitor.domainAuthority}</p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-teal-600 mb-1">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Keywords</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {competitor.organicKeywords?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Backlinks</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {competitor.backlinks?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              )}

              {/* Top Keywords */}
              {competitor.topKeywords && competitor.topKeywords.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Top Keywords
                  </h4>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Keyword</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Volume</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Difficulty</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitor.topKeywords.map((keyword, idx) => (
                          <tr key={idx} className="border-t border-gray-200">
                            <td className="px-4 py-2 text-sm">{keyword.keyword}</td>
                            <td className="px-4 py-2 text-sm">{keyword.volume.toLocaleString()}</td>
                            <td className="px-4 py-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                keyword.difficulty > 60 ? 'bg-red-100 text-red-700' :
                                keyword.difficulty > 40 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {keyword.difficulty}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm">
                                Target
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SWOT Analysis */}
              {competitor.strengths.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Strengths */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Strengths
                    </h5>
                    <ul className="space-y-1">
                      {competitor.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <h5 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Weaknesses
                    </h5>
                    <ul className="space-y-1">
                      {competitor.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Opportunities
                    </h5>
                    <ul className="space-y-1">
                      {competitor.opportunities.map((opportunity, idx) => (
                        <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Threats
                    </h5>
                    <ul className="space-y-1">
                      {competitor.threats.map((threat, idx) => (
                        <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {competitor.recommendations && competitor.recommendations.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Actionable Recommendations
                  </h5>
                  <ul className="space-y-2">
                    {competitor.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Upsell Opportunities */}
              {competitor.upsellOpportunities && competitor.upsellOpportunities.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Upsell Opportunities
                  </h5>
                  <div className="space-y-3">
                    {competitor.upsellOpportunities.map((upsell, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex items-start justify-between mb-2">
                          <h6 className="font-medium text-gray-900">{upsell.service}</h6>
                          <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getPriorityBadgeColor(upsell.priority)}`}>
                            {upsell.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{upsell.description}</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                          <DollarSign className="w-4 h-4" />
                          {upsell.estimatedValue}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Competitor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Competitor</h3>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAddCompetitor({
                  name: formData.get('name') as string,
                  website: formData.get('website') as string,
                  industry: formData.get('industry') as string,
                  revenue: formData.get('revenue') as string,
                  employees: formData.get('employees') as string,
                })
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Company name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      name="website"
                      type="url"
                      required
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                      name="industry"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select industry...</option>
                      <optgroup label="Target Industries">
                        <option value="Construction & Development">Construction & Development</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Manufacturing">Manufacturing</option>
                      </optgroup>
                      <optgroup label="Other Industries">
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Retail & E-commerce">Retail & E-commerce</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Range</label>
                    <select
                      name="revenue"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select revenue...</option>
                      <option value="$1M-$5M">$1M-$5M</option>
                      <option value="$5M-$10M">$5M-$10M</option>
                      <option value="$10M-$25M">$10M-$25M</option>
                      <option value="$25M-$50M">$25M-$50M</option>
                      <option value="$50M-$100M">$50M-$100M</option>
                      <option value="$100M+">$100M+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    <select
                      name="employees"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select size...</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Competitor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lead Generator Modal */}
        {showLeadGenerator && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-6 my-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Generated Leads
                </h3>
                <button
                  onClick={() => setShowLeadGenerator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                <span>Total leads: {generatedLeads.length}</span>
                <span className="text-gray-400">|</span>
                <span className="text-green-600">High: {generatedLeads.filter(l => l.priority === 'high').length}</span>
                <span className="text-yellow-600">Medium: {generatedLeads.filter(l => l.priority === 'medium').length}</span>
                <span className="text-gray-600">Low: {generatedLeads.filter(l => l.priority === 'low').length}</span>
              </div>

              <div className="overflow-x-auto max-h-96">
                <table className="w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Company</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">LinkedIn</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Priority</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedLeads.map((lead, idx) => (
                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{lead.name}</td>
                        <td className="px-4 py-2 text-sm">{lead.title}</td>
                        <td className="px-4 py-2 text-sm">{lead.company}</td>
                        <td className="px-4 py-2 text-sm">{lead.email}</td>
                        <td className="px-4 py-2 text-sm">{lead.phone}</td>
                        <td className="px-4 py-2 text-sm text-blue-600">{lead.linkedin}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                            {lead.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">{lead.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    const csvContent = generateCSVContent()
                      threats: [],
                      lastAnalyzedAt: new Date(),
                      monitoringEnabled: true
                    })
                    downloadCSV(csvContent, 'generated_leads.csv')
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
                <button
                  onClick={() => setShowLeadGenerator(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && selectedCompetitor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Export Leads</h3>
              <p className="text-gray-600 mb-4">
                Export {generatedLeads.length} leads from {selectedCompetitor.name} to:
              </p>
              
              <div className="space-y-3">
                {[
                  { id: 'csv', icon: FileText, label: 'CSV File', desc: 'Download as spreadsheet' },
                  { id: 'facebook', icon: ExternalLink, label: 'Facebook Ads', desc: 'Create custom audience' },
                  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn Ads', desc: 'Create matched audience' },
                  { id: 'google', icon: Mail, label: 'Google Ads', desc: 'Upload customer list' }
                ].map(platform => (
                  <button
                    key={platform.id}
                    onClick={() => setExportPlatform(platform.id as any)}
                    disabled={exporting}
                    className={`w-full p-4 border rounded-lg text-left hover:border-green-500 transition-colors ${
                      exportPlatform === platform.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <platform.icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{platform.label}</p>
                        <p className="text-sm text-gray-600">{platform.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowExportModal(false)}
                  disabled={exporting}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => exportToPlatform(exportPlatform, selectedCompetitor)}
                  disabled={exporting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {exporting ? 'Exporting...' : 'Export'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}