// login.js

import { supabase } from './supabase-config.js';  // Import the initialized supabase client

async function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please fill out both fields.');
    return;
  }

  const { user, session, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error signing in:', error);
    alert('Error signing in: ' + error.message);
  } else {
    console.log('User signed in:', user);
    // Redirect to items page after successful login
    window.location.href = 'items.html';
  }
}

async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please fill out both fields.');
    return;
  }

  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error signing up:', error);
    alert('Error signing up: ' + error.message);
  } else {
    alert('Sign-up successful! Please log in.');
  }
}
