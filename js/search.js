// public/js/search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    // Retrieve last search query from localStorage
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        searchInput.value = lastSearch;
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        if (query === '') return;

        // Save the search query
        localStorage.setItem('lastSearch', query);

        // Perform search logic (simple example)
        performSearch(query);
    });

    function performSearch(query) {
        // For demonstration, we'll alert the search query.
        // In a real-world scenario, you'd implement search logic to filter content.
        alert(`You searched for: "${query}". Feature under development!`);
    }
});
