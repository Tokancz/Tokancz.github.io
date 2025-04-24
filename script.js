import { createClient } from '/node_modules/@supabase/supabase-js/';

const supabaseUrl = 'https://mlyroqzufldgnolfejac.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);