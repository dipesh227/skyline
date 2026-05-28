import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const mockSupabase = {
  from: () => ({
    insert: async () => {
      console.error('❌ Supabase not configured')
      alert('⚠️ Contact form is not configured. Please call us at +91 63954 27119')
      return { error: new Error('Supabase not configured') }
    },
  }),
}

let realSupabase: any = null
if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder-url.supabase.co') {
  try {
    realSupabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase client initialized')
  } catch (e) {
    console.error('Failed to create Supabase client', e)
  }
} else {
  console.warn('⚠️ Supabase credentials missing or placeholder – using mock client')
}

export const supabase = realSupabase || mockSupabase
