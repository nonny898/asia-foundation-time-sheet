import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyenBobnVka2V6ZHF4cnBoeWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkyMTYzNjIsImV4cCI6MTk2NDc5MjM2Mn0.VE11LcHpEmbh5mc_0sCxuR8o-nMp1J-H1LzJbCWV7mM'
export default ({ _app }, inject) => {
  const supabaseUrl = 'https://krzphnudkezdqxrphybb.supabase.co'
  const supabaseKey = SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  inject('supabase', supabase)
}
