document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');

  addBtn.addEventListener('click', () => {
    const str1 = document.getElementById('str1').value.trim();
    const str2 = document.getElementById('str2').value.trim();
    const str3 = document.getElementById('str3').value.trim();

    if (!str1 || !str2 || !str3) {
      alert('Please fill all strings.');
      return;
    }

    const container = document.getElementById('itemsContainer');

    const item = document.createElement('div');
    item.className = 'bg-white p-4 rounded-xl shadow relative';

    item.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800">${str1}</h3>
      <p class="text-gray-600">${str2}</p>
      <p class="text-gray-400">${str3}</p>
      <button class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold">&times;</button>
    `;

    // Add remove button functionality
    item.querySelector('button').addEventListener('click', () => {
      item.remove();
    });

    container.appendChild(item);

    // Clear inputs
    document.getElementById('str1').value = '';
    document.getElementById('str2').value = '';
    document.getElementById('str3').value = '';
  });
});
