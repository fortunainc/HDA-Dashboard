// Supabase Database Integration
// Free tier for shared data across users

import { createClient } from '@supabase/supabase-js'

// TODO: Replace these with your actual Supabase credentials
// Get these from https://supabase.com after creating an account
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Database Tables Needed:
// users (id, name, email, company, created_at)
// leads (id, user_id, first_name, last_name, email, phone, company, title, industry, website, linkedin_url, status, source, notes, created_at)
// pipeline (id, user_id, opportunity_name, company, value, stage, probability, expected_close_date, notes, created_at)
// campaigns (id, user_id, name, type, description, status, start_date, end_date, budget, sent_count, open_rate, reply_rate, conversion_rate, created_at)
// competitors (id, user_id, name, website, industry, description, monthly_visitors, seo_score, social_score, domain_age, domain_authority, strengths, weaknesses, opportunities, threats, last_analyzed_at, monitoring_enabled, created_at)
// contacts (id, user_id, name, email, phone, company, role, location, notes, created_at)
// bookings (id, user_id, title, date, time, client, type, notes, created_at)
// partnerships (id, user_id, name, company, contact_person, email, phone, type, status, notes, created_at)
// industries (id, user_id, name, description, notes, created_at)
// targets (id, user_id, name, type, current, target, period, unit, notes, created_at)
// pr_campaigns (id, user_id, client_name, package_name, package_type, status, start_date, expected_delivery, investment, media_placements, roi, notes, created_at)
// media_contacts (id, user_id, name, role, media_outlet, type, email, phone, location, status, pricing, notes, created_at)

// User Functions
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  
  if (error) throw error
  return data
}

export async function createUser(user: any) {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Generic CRUD Functions
export async function getData(tableName: string, userId: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createData(tableName: string, record: any) {
  const { data, error } = await supabase
    .from(tableName)
    .insert([record])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateData(tableName: string, id: string, updates: any) {
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteData(tableName: string, id: string) {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}