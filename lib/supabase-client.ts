import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Lead {
  id: string;
  user_id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
  industry?: string;
  source?: string;
  created_at: string;
  updated_at: string;
}

export interface Pipeline {
  id: string;
  user_id: string;
  title: string;
  company: string;
  value: number;
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  probability: number;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  type: string;
  description?: string;
  start_date: string;
  end_date?: string;
  budget: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  leads_sent: number;
  opens: number;
  clicks: number;
  replies: number;
  conversions: number;
  created_at: string;
  updated_at: string;
}

export interface Competitor {
  id: string;
  user_id: string;
  name: string;
  website: string;
  industry?: string;
  status: 'analyzing' | 'analyzed';
  domain_age?: number;
  monthly_visitors?: number;
  seo_score?: number;
  domain_authority?: number;
  swot_strengths: string[];
  swot_weaknesses: string[];
  swot_opportunities: string[];
  swot_threats: string[];
  recommendations: string[];
  upsell_opportunities: {
    service: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    value: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  location?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  title: string;
  date: string;
  time: string;
  client: string;
  type: 'video_call' | 'phone_call' | 'in_person';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Partnership {
  id: string;
  user_id: string;
  name: string;
  company: string;
  type: string;
  status: 'potential' | 'active' | 'inactive';
  contact_person?: string;
  email?: string;
  phone?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Industry {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  target_company_count?: number;
  average_deal_size?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Target {
  id: string;
  user_id: string;
  name: string;
  type: string;
  values: number[];
  period: string;
  unit: string;
  current?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PRCampaign {
  id: string;
  user_id: string;
  name: string;
  type: string;
  description?: string;
  start_date: string;
  end_date?: string;
  budget: number;
  status: 'planned' | 'active' | 'completed';
  investment: number;
  impressions?: number;
  leads_generated?: number;
  created_at: string;
  updated_at: string;
}

export interface MediaContact {
  id: string;
  user_id: string;
  name: string;
  role: string;
  media_outlet: string;
  type: string;
  email?: string;
  phone?: string;
  location?: string;
  status: string;
  pricing?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}