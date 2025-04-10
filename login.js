// login.js

import { supabaseUrl, supabaseKey } from './supabase-config.js';

// Initialize the Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { user, session, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert(error.message);
  } else {
    // Redirect to the items page after successful login
    window.location.href = 'items.html';
  }
}

async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Sign-up successful! Please log in.');
  }
}
