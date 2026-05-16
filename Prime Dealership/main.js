document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  if(query) {
    alert('Searching for: ' + query);