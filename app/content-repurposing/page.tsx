'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Upload, Cpu, Sparkles, Share2, BarChart3, PlayCircle, FileText, Mail, Megaphone, Calendar, CheckCircle2, Zap, Layers, Target, Users } from 'lucide-react'

export default function ContentRepurposingPage() {
  const [selectedTier, setSelectedTier] = useState(null)

  const tiers = [
    {
      name: 'Creator',
      price: '$79',
      period: 'month',
      description: 'Perfect for individual content creators getting started',
      pieces: '10 pieces/month',
      platforms: 5,
      features: [
        'YouTube transcription',
        'Basic format generation (5 formats)',
        'Email distribution',
        'Performance tracking',
        'Basic analytics'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$249',
      period: 'month',
      description: 'Ideal for growing brands and marketing teams',
      pieces: '50 pieces/month',
      platforms: '10+',
      features: [
        'YouTube & podcast processing',
        'All format generation (12+ formats)',
        'Multi-platform distribution',
        'Brand voice learning',
        'Advanced analytics dashboard',
        'Custom templates'
      ],
      popular: true
    },
    {
      name: 'Business',
      price: '$699',
      period: 'month',
      description: 'For businesses with high content volume needs',
      pieces: '200 pieces/month',
      platforms: 'Unlimited',
      features: [
        'All source formats',
        'Custom format generation',
        'API access',
        'White-label options',
        'Priority support',
        'Dedicated account manager'
      ],
      popular: false
    },
    {
      name: 'Enterprise',
      price: '$1,999',
      period: 'month',
      description: 'Enterprise-grade solutions for large organizations',
      pieces: 'Unlimited',
      platforms: 'Unlimited',
      features: [
        'Everything in Business',
        'Custom integrations',
        'Enterprise SLA',
        'White-label platform',
        'Dedicated support team',
        'Custom AI training',
        'Unlimited users'
      ],
      popular: false
    }
  ]

  const processSteps = [
    {
      icon: Upload,
      title: 'Content Input',
      description: 'Upload or connect YouTube videos, podcasts, articles, or documents'
    },
    {
      icon: Cpu,
      title: 'AI Processing',
      description: 'AI transcribes, extracts, and analyzes your content'
    },
    {
      icon: Sparkles,
      title: 'Format Generation',
      description: 'Generate 12+ formats: blog posts, social content, emails, visuals'
    },
    {
      icon: Share2,
      title: 'Distribution',
      description: 'Auto-schedule and post to 10+ platforms automatically'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track performance and optimize automatically'
    }
  ]

  const formats = [
    { icon: FileText, name: 'Blog Posts', description: 'Long-form articles and SEO-optimized content' },
    { icon: Megaphone, name: 'Social Media', description: 'Twitter, LinkedIn, Instagram, Facebook posts' },
    { icon: Mail, name: 'Email Newsletters', description: 'Engaging email campaigns and newsletters' },
    { icon: PlayCircle, name: 'Video Scripts', description: 'Short-form video content for TikTok, Reels' },
    { icon: Calendar, name: 'Content Calendar', description: 'Automated scheduling and publishing' },
    { icon: FileText, name: 'Case Studies', description: 'Compelling stories and testimonials' }
  ]

  const additionalServices = [
    {
      name: 'Content Repurposing Audit',
      description: 'Free assessment to identify repurposing opportunities',
      price: 'Free',
      type: 'Audit'
    },
    {
      name: 'Content Amplification Strategy',
      description: 'Comprehensive consulting to develop your content strategy',
      price: '$3,000 - $10,000',
      type: 'Consulting'
    },
    {
      name: 'Automated Content System Setup',
      description: 'Full implementation of custom automation system',
      price: '$5,000 - $20,000',
      type: 'Implementation'
    }
  ]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Layers className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                AI-Powered Content Repurposing & Distribution
              </h1>
              <p className="text-2xl text-purple-100 mb-6">
                Turn 1 piece of content into 12+ formats automatically
              </p>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Extract content from YouTube videos, podcasts, articles, and documents, then generate 
                blog posts, social media content, emails, newsletters, and visuals - and distribute 
                everything across 10+ platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <span className="font-bold">10x</span> Content Output
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <span className="font-bold">60-80%</span> Time Saved
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <span className="font-bold">12+</span> Formats Generated
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-300">
            <div className="flex items-center mb-4">
              <Zap className="w-12 h-12 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose Our Platform?
              </h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Achieve <span className="font-bold text-green-600">10x content output without 10x effort</span>. 
              Save <span className="font-bold text-blue-600">60-80% of time</span> on content creation and 
              distribution while maintaining consistent quality and brand voice across all platforms.
            </p>
          </div>
        </div>

        {/* Target Customers */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect For
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-4 rounded-lg shadow-md flex items-center">
                <Users className="w-6 h-6 text-purple-600 mr-2" />
                <span className="font-semibold">Content Creators</span>
              </div>
              <div className="bg-white px-6 py-4 rounded-lg shadow-md flex items-center">
                <Target className="w-6 h-6 text-blue-600 mr-2" />
                <span className="font-semibold">Marketing Agencies</span>
              </div>
              <div className="bg-white px-6 py-4 rounded-lg shadow-md flex items-center">
                <BarChart3 className="w-6 h-6 text-green-600 mr-2" />
                <span className="font-semibold">B2B Businesses</span>
              </div>
              <div className="bg-white px-6 py-4 rounded-lg shadow-md flex items-center">
                <Layers className="w-6 h-6 text-purple-600 mr-2" />
                <span className="font-semibold">High-Volume Companies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Our AI-powered process transforms your content in 5 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg h-full">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="text-2xl text-gray-300">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Formats */}
        <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              12+ Content Formats Generated
            </h2>
            <p className="text-gray-600 text-lg">
              One piece of content becomes a complete content ecosystem
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {formats.map((format, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg mr-4">
                    <format.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {format.name}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Flexible Pricing Plans
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the plan that fits your content needs
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-6 shadow-lg transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white scale-105'
                    : 'bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-1 ${tier.popular ? 'text-white' : 'text-purple-600'}`}>
                    {tier.price}
                  </div>
                  <div className={`text-sm ${tier.popular ? 'text-purple-200' : 'text-gray-600'}`}>
                    per {tier.period}
                  </div>
                </div>
                <div className={`space-y-3 mb-6 ${tier.popular ? 'text-white' : 'text-gray-700'}`}>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{tier.pieces}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{tier.platforms} platforms</span>
                  </div>
                </div>
                <div className={`space-y-2 mb-6 ${tier.popular ? 'text-white' : 'text-gray-700'}`}>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedTier(tier)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-white text-purple-600 hover:bg-purple-50'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-gray-600 text-lg">
              Customize your content repurposing strategy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${
                    service.type === 'Audit' ? 'bg-green-100 text-green-700' :
                    service.type === 'Consulting' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {service.type}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {service.price}
                  </div>
                </div>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to dominate content marketing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Upload,
                title: 'Multi-Source Content Input',
                description: 'Upload videos, podcasts, articles, PDFs, or connect YouTube channels automatically'
              },
              {
                icon: Sparkles,
                title: 'AI-Powered Generation',
                description: 'Advanced AI creates high-quality content that matches your brand voice perfectly'
              },
              {
                icon: Share2,
                title: 'Multi-Platform Distribution',
                description: 'Automatically publish to 10+ platforms including social media, email, and websites'
              },
              {
                icon: BarChart3,
                title: 'Analytics & Insights',
                description: 'Track performance across all platforms with detailed analytics and recommendations'
              },
              {
                icon: Zap,
                title: 'Brand Voice Learning',
                description: 'AI learns your unique voice and maintains consistency across all generated content'
              },
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'AI optimizes posting times based on audience engagement patterns'
              },
              {
                icon: Layers,
                title: 'Custom Templates',
                description: 'Create and save custom templates for consistent branding and messaging'
              },
              {
                icon: CheckCircle2,
                title: 'Quality Control',
                description: 'Built-in editing tools and approval workflows ensure content quality'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md flex items-start">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to 10x Your Content Output?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Start your free content repurposing audit today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Start Free Audit
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}