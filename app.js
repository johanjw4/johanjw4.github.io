// app.js

// Import the Supabase configuration
import { supabaseUrl, supabaseKey } from './supabase-config.js';

// Create the Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Authentication functions
async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { user, session, error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert('Sign Up Successful!');
}

async function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { user, session, error } = await supabase.auth.signIn({ email, password });
  if (error) alert(error.message);
  else alert('Signed In Successfully!');
}

async function signOut() {
  await supabase.auth.signOut();
  alert('Signed Out!');
}

// CRUD functions for interacting with Supabase database
async function fetchItems() {
  const { data, error } = await supabase.from('items').select('*');
  if (error) console.error('Error fetching items:', error);
  else {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ''; // Clear the list before adding new items
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('p-2', 'bg-gray-100', 'rounded-md', 'border', 'border-gray-200');
      listItem.textContent = `${item.str1} - ${item.str2} - ${item.str3}`;
      itemsList.appendChild(listItem);
    });
  }
}

async function addItem() {
  const str1 = document.getElementById('str1').value;
  const str2 = document.getElementById('str2').value;
  const str3 = document.getElementById('str3').value;
  
  const { data, error } = await supabase.from('items').insert([{ str1, str2, str3 }]);
  if (error) console.error('Error adding item:', error);
  else fetchItems(); // Refresh the list after adding a new item
}

// On page load, fetch items from the Supabase database
window.onload = () => {
  fetchItems();
};
