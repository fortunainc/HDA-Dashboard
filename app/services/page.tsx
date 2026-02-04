'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import './page.css'

interface Service {
  id: string
  category: 'digital' | 'pr' | 'package' | 'addon'
  badge: string
  badgeClass: string
  title: string
  price: string
  priceUnit: string
  timeline?: string
  description: string
  includes: string[]
  deliverables: string[]
  successMetrics: string[]
  contractTerms: string[]
  perfectFor?: string
  potentialROI: string
}

const services: Service[] = [
  // Digital Services
  {
    id: 'lead-gen',
    category: 'digital',
    badge: 'AI-Powered',
    badgeClass: 'badge-digital',
    title: 'AI-Powered Lead Generation',
    price: '$3,000 - $8,000',
    priceUnit: 'month',
    timeline: 'Ongoing',
    description: 'Generate 200-500 qualified leads per month with AI-driven lead scoring and automated nurturing.',
    includes: [
      '200-500 qualified leads per month',
      'Custom lead scoring model',
      'Automated nurturing sequences',
      'Real-time lead dashboard',
      'Monthly performance reports with ROI analysis'
    ],
    deliverables: [
      'Lead generation strategy',
      'Lead scoring model',
      'Automated email sequences',
      'CRM integration',
      'Monthly analytics reports'
    ],
    successMetrics: [
      '300-500% increase in qualified leads within 90 days',
      'Improved lead-to-opportunity conversion rate',
      'Reduced cost per qualified lead',
      'Pipeline value growth'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      'Minimum commitment: 3 months',
      'Payment: Monthly, invoiced on the 1st',
      'Cancellation: 30-day notice required'
    ],
    potentialROI: '300-500% ROI - Generate $15,000-$40,000 in qualified opportunities monthly based on average deal size'
  },
  {
    id: 'sales-pipeline',
    category: 'digital',
    badge: 'Sales Automation',
    badgeClass: 'badge-digital',
    title: 'Sales Pipeline Automation',
    price: '$4,000 - $10,000',
    priceUnit: 'month',
    timeline: 'Ongoing',
    description: 'Complete CRM setup, automated follow-ups, and sales process optimization.',
    includes: [
      'Complete CRM setup and integration',
      'Automated follow-up sequences',
      'Deal tracking and forecasting',
      'Sales process optimization',
      'Team training and support'
    ],
    deliverables: [
      'CRM configuration',
      'Automated workflow setup',
      'Deal stage definitions',
      'Sales playbook creation',
      'Team training sessions'
    ],
    successMetrics: [
      '40-60% improvement in conversion rates',
      '2-3x faster deal velocity',
      'Reduced deal cycle time',
      'Increased pipeline value'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      'Minimum commitment: 3 months',
      'Payment: Monthly, invoiced on the 1st',
      'Cancellation: 30-day notice required'
    ],
    potentialROI: '400-600% ROI - Increase close rates by 30-50% and reduce sales cycle by 40%'
  },
  {
    id: 'competitive-intelligence',
    category: 'digital',
    badge: 'AI Analysis',
    badgeClass: 'badge-digital',
    title: 'AI Competitive Intelligence',
    price: '$2,000 - $5,000',
    priceUnit: 'month',
    timeline: 'Ongoing',
    description: 'Comprehensive competitor analysis with SWOT analysis and upsell opportunity identification.',
    includes: [
      'Competitor analysis (3-5 competitors)',
      'SWOT analysis with actionable recommendations',
      'Upsell opportunity identification',
      'Revenue impact calculator',
      'Quarterly strategy reviews'
    ],
    deliverables: [
      'Comprehensive competitor reports',
      'SWOT analysis for each competitor',
      'Strategic recommendations',
      'Upsell opportunity roadmap',
      'Revenue potential calculations'
    ],
    successMetrics: [
      'Clear competitive positioning',
      'Identified $9,500-$15,000/month upsell opportunities per competitor',
      'Improved market share',
      'Strategic decision-making insights'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      'Minimum commitment: 3 months',
      'Payment: Monthly, invoiced on the 1st',
      'Cancellation: 30-day notice required'
    ],
    potentialROI: '500-800% ROI - Gain competitive advantages that result in $10,000-$30,000 monthly revenue impact'
  },
  {
    id: 'customer-service-automation',
    category: 'digital',
    badge: 'AI Chatbot',
    badgeClass: 'badge-digital',
    title: 'AI Customer Service Automation',
    price: '$2,000 - $5,000',
    priceUnit: 'month',
    timeline: 'Ongoing',
    description: 'AI chatbot implementation with automated ticket routing and knowledge base setup.',
    includes: [
      'AI chatbot implementation',
      'Automated ticket routing',
      'Knowledge base setup',
      'Response time optimization',
      'Customer satisfaction tracking'
    ],
    deliverables: [
      'AI chatbot configuration',
      'Ticket routing automation',
      'Knowledge base creation',
      'Response optimization',
      'Satisfaction tracking dashboard'
    ],
    successMetrics: [
      '70-80% reduction in support tickets',
      '90%+ customer satisfaction scores',
      'Response time from hours to seconds',
      'Reduced support costs'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      'Minimum commitment: 3 months',
      'Payment: Monthly, invoiced on the 1st',
      'Cancellation: 30-day notice required'
    ],
    potentialROI: '600-900% ROI - Save $8,000-$15,000/month in support costs while improving customer satisfaction'
  },
  {
    id: 'content-marketing',
    category: 'digital',
    badge: 'Content Marketing',
    badgeClass: 'badge-digital',
    title: 'Content Marketing',
    price: '$2,500 - $6,000',
    priceUnit: 'month',
    timeline: 'Ongoing',
    description: 'SEO-optimized blog posts, social media content, and email newsletters with performance analytics.',
    includes: [
      'SEO-optimized blog posts (4-8/month)',
      'Social media content (20-40 posts)',
      'Email newsletter creation',
      'Content calendar management',
      'Performance analytics'
    ],
    deliverables: [
      'SEO-optimized blog posts',
      'Social media content calendar',
      'Email newsletters',
      'Content performance reports',
      'Keyword strategy',
      'Editorial calendar'
    ],
    successMetrics: [
      '200-300% increase in organic traffic',
      '50-100% increase in social engagement',
      'Improved search rankings',
      'Lead generation from content'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      'Minimum commitment: 3 months',
      'Payment: Monthly, invoiced on the 1st',
      'Cancellation: 30-day notice required'
    ],
    potentialROI: '400-700% ROI - Generate 200-500% more organic traffic and $5,000-$20,000 in monthly revenue from inbound leads'
  },
  {
    id: 'website-optimization',
    category: 'digital',
    badge: 'CRO & SEO',
    badgeClass: 'badge-digital',
    title: 'AI Website Optimization',
    price: '$2,000 - $4,000',
    priceUnit: 'month',
    timeline: 'Ongoing',
    description: 'Conversion rate optimization, A/B testing, and SEO improvements for better performance.',
    includes: [
      'Conversion rate optimization',
      'A/B testing implementation',
      'Performance monitoring',
      'SEO improvements',
      'User experience enhancements'
    ],
    deliverables: [
      'CRO strategy',
      'A/B test setup and management',
      'Performance optimization',
      'SEO improvements',
      'UX recommendations'
    ],
    successMetrics: [
      '30-50% improvement in conversion rates',
      '40-60% increase in lead generation',
      'Improved search rankings',
      'Better user experience scores'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      'Minimum commitment: 3 months',
      'Payment: Monthly, invoiced on the 1st',
      'Cancellation: 30-day notice required'
    ],
    potentialROI: '500-800% ROI - Increase conversion rates by 30-100% resulting in $10,000-$40,000 additional monthly revenue'
  },
  {
    id: 'predictive-analytics',
    category: 'digital',
    badge: 'AI Insights',
    badgeClass: 'badge-digital',
    title: 'AI Predictive Analytics',
    price: '$3,000 - $7,000',
    priceUnit: 'month',
    timeline: 'Ongoing',
    description: 'Revenue forecasting, customer behavior prediction, and churn risk analysis with strategic insights.',
    includes: [
      'Revenue forecasting models',
      'Customer behavior prediction',
      'Churn risk analysis',
      'Opportunity scoring',
      'Strategic insights and recommendations'
    ],
    deliverables: [
      'Predictive models',
      'Custom dashboards',
      'Risk analysis reports',
      'Opportunity scoring system',
      'Strategic recommendations'
    ],
    successMetrics: [
      '20-30% improvement in revenue forecasting',
      '15-25% reduction in customer churn',
      'Better opportunity prioritization',
      'Data-driven strategic decisions'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      'Minimum commitment: 3 months',
      'Payment: Monthly, invoiced on the 1st',
      'Cancellation: 30-day notice required'
    ],
    potentialROI: '700-1000% ROI - Make data-driven decisions that unlock $20,000-$50,000 in revenue optimization opportunities'
  },
  // PR Services
  {
    id: 'launch-pad',
    category: 'pr',
    badge: 'PR Package',
    badgeClass: 'badge-pr',
    title: 'Launch Pad Package',
    price: '$3,000 - $5,000',
    priceUnit: 'one-time',
    timeline: '2-4 weeks',
    perfectFor: 'New businesses, product launches, rebranding',
    description: 'Get your first media placements with magazine feature, TV/podcast interview, and press release distribution.',
    includes: [
      '1 Magazine feature (San Diego/regional publication)',
      '1 TV or podcast interview (local news or industry podcast)',
      'Press release distribution to 500+ outlets',
      'Professional media kit creation',
      '3 social media posts featuring media placements',
      'Website "As Featured In" badge'
    ],
    deliverables: [
      'Magazine feature article',
      'TV/podcast interview',
      'Distributed press release',
      'Professional media kit',
      'Social media content',
      'Website badge'
    ],
    successMetrics: [
      'Instant credibility boost',
      '20-50% increase in website traffic',
      '$5,000-$20,000 in new business from feature'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      '50% deposit to start',
      '50% upon completion',
      'No refunds (media placements are paid upfront)'
    ],
    potentialROI: '200-400% ROI - Immediate brand credibility boost resulting in 30-50% increase in inquiry volume and $5,000-$15,000 in new customer value'
  },
  {
    id: 'spotlight',
    category: 'pr',
    badge: 'PR Package',
    badgeClass: 'badge-pr',
    title: 'Spotlight Package',
    price: '$7,000 - $12,000',
    priceUnit: 'one-time',
    timeline: '4-6 weeks',
    perfectFor: 'Growing businesses seeking credibility',
    description: 'Multiple media placements with ABC News TV interview and industry recognition.',
    includes: [
      '2 Magazine features (1 local, 1 industry-specific)',
      '1 TV interview segment (ABC News)',
      '1 Podcast interview',
      'Press release distribution to 500+ outlets',
      'Comprehensive media kit',
      '5 social media posts featuring media placements',
      'Website "As Seen In" badge creation',
      '1-hour PR strategy consultation'
    ],
    deliverables: [
      '2 Magazine feature articles',
      'ABC News TV interview',
      'Podcast interview',
      'Distributed press release',
      'Comprehensive media kit',
      '5 social media posts'
    ],
    successMetrics: [
      'Industry recognition',
      '50-100% increase in website traffic',
      '$15,000-$50,000 in new business from features'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      '50% deposit to start',
      '50% upon completion',
      'No refunds (media placements are paid upfront)'
    ],
    potentialROI: '300-500% ROI - Establish industry authority with $15,000-$40,000 in brand equity and 50-100% increase in qualified leads'
  },
  {
    id: 'media-mogul',
    category: 'pr',
    badge: 'PR Package',
    badgeClass: 'badge-pr',
    title: 'Media Mogul Package',
    price: '$15,000 - $25,000',
    priceUnit: 'one-time',
    timeline: '6-8 weeks',
    perfectFor: 'Established businesses seeking mainstream visibility',
    description: 'Complete media package with NBC Streaming commercial and mainstream visibility.',
    includes: [
      '3 Magazine features (mix of local, regional, industry)',
      '1 TV interview segment (ABC News)',
      'NBC Streaming Channel commercial (1 month, 100+ airings)',
      '2 Podcast interviews',
      'Press release distribution to 500+ outlets',
      'Comprehensive media kit',
      '10 social media posts featuring media placements',
      'Full PR strategy consultation',
      'Media training session'
    ],
    deliverables: [
      '3 Magazine feature articles',
      'ABC News TV interview',
      'NBC Streaming commercial (30 seconds, 100+ airings)',
      '2 Podcast interviews',
      'Distributed press release',
      'Comprehensive media kit'
    ],
    successMetrics: [
      'Mainstream visibility',
      '100-300% increase in website traffic',
      '$50,000-$150,000 in new business from features',
      'Industry thought leader positioning'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      '50% deposit to start',
      '50% upon completion',
      'No refunds (media placements are paid upfront)'
    ],
    potentialROI: '400-600% ROI - Transform brand into industry leader with $50,000-$150,000 in long-term brand value and 100-200% increase in business inquiries'
  },
  {
    id: 'nbc-streaming',
    category: 'pr',
    badge: 'TV Package',
    badgeClass: 'badge-pr',
    title: 'NBC Streaming Channel Package',
    price: '$12,000 - $15,000',
    priceUnit: 'one-time',
    timeline: '4-6 weeks',
    perfectFor: 'Maximum brand visibility',
    description: '30-second commercial on NBC\'s 20+ streaming channels with 100+ airings reaching 1-3 million viewers.',
    includes: [
      '30-second commercial on NBC\'s 20+ streaming channels',
      'Commercial aired 100+ times over 1 month',
      'Estimated reach: 1-3 million viewers',
      'Commercial script writing',
      'Commercial production guidance',
      'Performance analytics report',
      'Social media clips from commercial'
    ],
    deliverables: [
      '30-second commercial',
      'NBC Streaming placement (100+ airings)',
      'Commercial script',
      'Production guidance',
      'Analytics report',
      'Social media clips'
    ],
    successMetrics: [
      'Millions of impressions',
      '200-500% increase in website traffic',
      'Significant boost in brand recognition',
      'Broad audience reach'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      '50% deposit to start',
      '50% upon completion',
      'No refunds (media placements are paid upfront)'
    ],
    potentialROI: '300-500% ROI - Reach 2-5 million viewers generating $25,000-$75,000 in brand awareness and 75-150 qualified leads'
  },
  {
    id: 'abc-news-feature',
    category: 'pr',
    badge: 'TV Package',
    badgeClass: 'badge-pr',
    title: 'ABC News Feature Package',
    price: '$5,000 - $10,000',
    priceUnit: 'one-time',
    timeline: '4-8 weeks',
    perfectFor: 'Third-party validation',
    description: 'Interview on ABC News (TV or digital) with pre-interview coaching and preparation.',
    includes: [
      'Interview on ABC News (TV or digital)',
      'Article/feature on ABC News website',
      'Pre-interview coaching',
      'Interview preparation materials',
      'Social media promotion of feature',
      '"As Seen On ABC News" badge'
    ],
    deliverables: [
      'ABC News interview (TV or digital)',
      'ABC News website feature',
      'Pre-interview coaching session',
      'Interview preparation materials',
      'Social media promotion',
      'Website badge'
    ],
    successMetrics: [
      'Instant trust and credibility',
      '50-150% increase in website traffic',
      '$10,000-$40,000 in new business from feature'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      '50% deposit to start',
      '50% upon completion',
      'No refunds (media placements are paid upfront)'
    ],
    potentialROI: '400-600% ROI - Instant credibility boost resulting in $10,000-$30,000 in brand equity and 40-80% increase in customer trust'
  },
  {
    id: 'magazine-feature',
    category: 'pr',
    badge: 'Print Package',
    badgeClass: 'badge-pr',
    title: 'Magazine Feature Package',
    price: '$1,500 - $4,000',
    priceUnit: 'one-time',
    timeline: '4-8 weeks',
    perfectFor: 'Industry credibility',
    description: 'Feature article in target publication with interview preparation and social media promotion.',
    includes: [
      'Feature article in target publication',
      'Professional headshot session (if needed)',
      'Interview preparation',
      'Article review and approval',
      'Reprints and usage rights',
      'Social media promotion',
      '"As Featured In" badge'
    ],
    deliverables: [
      'Magazine feature article',
      'Professional headshots (if needed)',
      'Interview preparation',
      'Article approval process',
      'Reprints and usage rights',
      'Social media promotion',
      'Website badge'
    ],
    successMetrics: [
      'Industry authority',
      '30-80% increase in website traffic',
      '$3,000-$15,000 in new business from feature'
    ],    contractTerms: [
      'For the first month, a 50% deposit is required',
      '50% deposit to start',
      '50% upon completion',
      'No refunds (media placements are paid upfront)'
    ],
    potentialROI: '250-400% ROI - Establish thought leadership generating $3,000-$10,000 in brand value and 20-40% increase in conversion rates'
  },
  // Package Solutions
  {
    id: 'starter-package',
    category: 'package',
    badge: 'Best Value',
    badgeClass: 'badge-package',
    title: 'Starter Package',
    price: '$7,000',
    priceUnit: 'month',
    timeline: '6 months minimum',
    perfectFor: 'New businesses starting their growth journey',
    description: 'Essential digital services to establish consistent lead flow and competitive intelligence.',
    includes: [
      'AI-Powered Lead Generation ($3,000/month)',
      'AI Competitive Intelligence ($2,000/month)',
      'Content Marketing ($2,000/month)'
    ],
    deliverables: [
      'Consistent lead flow',
      'Competitive intelligence',
      'Content marketing engine',
      'Monthly reporting and strategy'
    ],
    successMetrics: [
      '300% increase in qualified leads',
      'Industry competitive advantage',
      'Consistent content production'
    ],
    contractTerms: [
      'Minimum commitment: 6 months',
      'Monthly invoicing',
      '10% discount for 6-month prepayment',
      '30-day cancellation notice'
    ],
    potentialROI: '500-700% ROI - Complete revenue foundation generating $25,000-$50,000 in monthly revenue impact'
  },
  {
    id: 'growth-package',
    category: 'package',
    badge: 'Most Popular',
    badgeClass: 'badge-package',
    title: 'Growth Package',
    price: '$14,000',
    priceUnit: 'month',
    timeline: '6 months minimum',
    perfectFor: 'Businesses ready to scale aggressively',
    description: 'Comprehensive digital services for aggressive growth with automated sales processes.',
    includes: [
      'AI-Powered Lead Generation ($5,000/month)',
      'Sales Pipeline Automation ($4,000/month)',
      'AI Competitive Intelligence ($2,000/month)',
      'Content Marketing ($3,000/month)'
    ],
    deliverables: [
      'Aggressive lead generation',
      'Automated sales process',
      'Competitive intelligence',
      'Content marketing engine'
    ],
    successMetrics: [
      '500% increase in qualified leads',
      '60% improvement in conversion rates',
      '2-3x faster deal velocity',
      'Market dominance'
    ],
    contractTerms: [
      'Minimum commitment: 6 months',
      'Monthly invoicing',
      '10% discount for 6-month prepayment',
      '30-day cancellation notice'
    ],
    potentialROI: '600-800% ROI - Accelerated growth platform generating $70,000-$120,000 in monthly revenue impact'
  },
  {
    id: 'scale-package',
    category: 'package',
    badge: 'Premium',
    badgeClass: 'badge-package',
    title: 'Scale Package',
    price: '$27,500',
    priceUnit: 'month',
    timeline: '12 months minimum',
    perfectFor: 'Businesses seeking market leadership',
    description: 'Complete digital transformation with all AI-powered services for maximum growth.',
    includes: [
      'AI-Powered Lead Generation ($8,000/month)',
      'Sales Pipeline Automation ($6,000/month)',
      'AI Competitive Intelligence ($3,500/month)',
      'Content Marketing ($5,000/month)',
      'AI Website Optimization ($2,000/month)',
      'AI Predictive Analytics ($3,000/month)'
    ],
    deliverables: [
      'Maximum lead generation',
      'Automated sales operations',
      'Competitive intelligence',
      'Content marketing',
      'Website optimization',
      'Predictive analytics'
    ],
    successMetrics: [
      '700% increase in qualified leads',
      '80% improvement in conversion rates',
      'Optimized conversion rates',
      'Predictive insights',
      'Market leadership'
    ],
    contractTerms: [
      'Minimum commitment: 12 months',
      'Monthly invoicing',
      '15% discount for 12-month prepayment',
      '30-day cancellation notice'
    ],
    potentialROI: '700-900% ROI - Complete revenue optimization generating $150,000-$250,000 in monthly revenue impact'
  },
  {
    id: 'enterprise-package',
    category: 'package',
    badge: 'Enterprise',
    badgeClass: 'badge-package',
    title: 'Enterprise Package',
    price: '$50,000+',
    priceUnit: 'month',
    timeline: '12 months minimum',
    perfectFor: 'Large organizations requiring complete solutions',
    description: 'Complete digital transformation with dedicated support and custom integrations.',
    includes: [
      'All digital services (customized)',
      'PR Campaign Management (Media Mogul Package)',
      'Dedicated account manager',
      'Priority support (24-hour response)',
      'Custom integrations',
      'Strategic consulting'
    ],
    deliverables: [
      'Complete digital transformation',
      'PR campaign management',
      'Dedicated support team',
      'Custom solutions',
      'Strategic advisory'
    ],
    successMetrics: [
      'Complete market dominance',
      'Mainstream media visibility',
      'Automated revenue operations',
      'Strategic guidance'
    ],
    contractTerms: [
      'Minimum commitment: 12 months',
      'Monthly invoicing',
      '20% discount for 12-month prepayment',
      '30-day cancellation notice'
    ],
    potentialROI: '800-1200% ROI - Enterprise transformation generating $300,000-$600,000 in monthly revenue impact'
  }
]

export default function ServicesPage() {
  const [filter, setFilter] = useState<'all' | 'digital' | 'pr' | 'package'>('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const filteredServices = filter === 'all' 
    ? services 
    : services.filter(s => s.category === filter)

  return (
    <DashboardLayout>
      <div>
        {/* Hero Section */}
        <div className="services-hero">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hustle Digital Agency
          </h1>
          <p className="text-xl md:text-2xl mb-2">
            Menu of Services & Pricing
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Transform your business with AI-powered digital services and premium PR campaigns
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Services
          </button>
          <button
            className={`filter-button ${filter === 'digital' ? 'active' : ''}`}
            onClick={() => setFilter('digital')}
          >
            Digital Services
          </button>
          <button
            className={`filter-button ${filter === 'pr' ? 'active' : ''}`}
            onClick={() => setFilter('pr')}
          >
            PR Services
          </button>
          <button
            className={`filter-button ${filter === 'package' ? 'active' : ''}`}
            onClick={() => setFilter('package')}
          >
            Packaged Solutions
          </button>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="service-card cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <span className={`service-badge ${service.badgeClass}`}>
                {service.badge}
              </span>
              <h2 className="service-title">{service.title}</h2>
              <div className="service-price">
                {service.price}/{service.priceUnit}
              </div>
              {service.timeline && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Timeline:</strong> {service.timeline}
                </p>
              )}
              {service.perfectFor && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Perfect For:</strong> {service.perfectFor}
                </p>
              )}
              <p className="service-description">{service.description}</p>
              
              {/* Potential ROI Section */}
              <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-1">
                  <span className="text-2xl mr-2">📈</span>
                  <span className="font-bold text-green-700 text-sm uppercase tracking-wide">Potential ROI</span>
                </div>
                <p className="text-green-800 font-semibold text-sm leading-tight">
                  {service.potentialROI}
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                <ul className="service-features">
                  {service.includes.slice(0, 5).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                  {service.includes.length > 5 && (
                    <li className="text-blue-600">
                      +{service.includes.length - 5} more items
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-4">
            Schedule a free 30-minute consultation to discuss your needs
          </p>
          <a href="#contact" className="cta-button">
            Get Started Today
          </a>
        </div>

        {/* Contact Section */}
        <div id="contact" className="max-w-4xl mx-auto p-8 mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Get Started Today
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:info@hustledigital.com" className="text-blue-600 hover:underline">
                      info@hustledigital.com
                    </a>
                  </p>
                  <p>
                    <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM PST
                  </p>
                  <p>
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Schedule a 30-minute discovery call</li>
                  <li>2. Receive a customized proposal</li>
                  <li>3. Sign agreement and provide deposit</li>
                  <li>4. Begin onboarding and execution</li>
                  <li>5. We deliver measurable results</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`service-badge ${selectedService.badgeClass}`}>
                    {selectedService.badge}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {selectedService.title}
                  </h2>
                  <div className="text-2xl font-semibold text-green-600 mt-2">
                    {selectedService.price}/{selectedService.priceUnit}
                  </div>
                  {selectedService.timeline && (
                    <p className="text-gray-600 mt-1">
                      <strong>Timeline:</strong> {selectedService.timeline}
                    </p>
                  )}
                  {selectedService.perfectFor && (
                    <p className="text-gray-600 mt-1">
                      <strong>Perfect For:</strong> {selectedService.perfectFor}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-700 mb-6">{selectedService.description}</p>

              {/* Potential ROI Section in Modal */}
              <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-300 shadow-lg">
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">📈</span>
                  <h3 className="text-2xl font-bold text-green-700 uppercase tracking-wide">
                    Potential ROI
                  </h3>
                </div>
                <p className="text-green-800 text-lg font-semibold leading-relaxed">
                  {selectedService.potentialROI}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {selectedService.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {selectedService.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">●</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Success Metrics
                </h3>
                <ul className="space-y-2">
                  {selectedService.successMetrics.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-2">📊</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Contract Terms
                </h3>
                <ul className="space-y-2">
                  {selectedService.contractTerms.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-500 mr-2">📋</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}