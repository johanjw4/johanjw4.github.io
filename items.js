// items.js

import { supabaseUrl, supabaseKey } from './supabase-config.js';

// Initialize Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fetch items from the database
async function fetchItems() {
  const { data, error } = await supabase.from('items').select('*');
  if (error) {
    console.error('Error fetching items:', error);
  } else {
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

// Add item to the database
async function addItem() {
  const str1 = document.getElementById('str1').value;
  const str2 = document.getElementById('str2').value;
  const str3 = document.getElementById('str3').value;

  const { data, error } = await supabase.from('items').insert([{ str1, str2, str3 }]);

  if (error) {
    console.error('Error adding item:', error);
  } else {
    fetchItems(); // Refresh the item list
  }
}

// Sign out user and redirect to login page
async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'index.html'; // Redirect to login page
}

// Fetch items on page load
window.onload = () => {
  fetchItems();
};
