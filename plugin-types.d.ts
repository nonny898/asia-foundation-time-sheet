import { SupabaseClient } from '@supabase/supabase-js'
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $supabase: SupabaseClient
  }
}
