import { createClient } from '@supabase/supabase-js'

const URL = 'https://rnryunohtrzdgbcrmosc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucnl1bm9odHJ6ZGdiY3Jtb3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Nzk4NjgsImV4cCI6MjA2MDA1NTg2OH0.vIOauB2H1a7f9tENI6ZN8JAW7zcuyj9XAbiAKvTb3xU'
export const supabase = createClient(URL, API_KEY);