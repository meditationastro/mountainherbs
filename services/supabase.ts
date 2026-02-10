import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fscenswhkwiehizxjzwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzY2Vuc3doa3dpZWhpenhqenduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MDEzOTIsImV4cCI6MjA4NTE3NzM5Mn0.d65jvmuH-6yKJkAMGHCVV0ZFG2CaVY0fObjkOByYwTE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);