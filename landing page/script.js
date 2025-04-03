document.addEventListener('DOMContentLoaded', function () {
    // 🔍 Search elements
    const searchButtons = document.querySelectorAll('.search-btn, .search-button');
    const searchPage = document.getElementById('searchPage');
    const mainSearchInput = document.getElementById('searchInput');
    const searchPageInput = document.querySelector('#searchPage input[type="text"]');
    const suggestionsContainer = document.getElementById('suggestions');
    const workerCards = document.querySelectorAll('.worker-card');

    // Sample suggestions
    const suggestions = ['plumber', 'electrician', 'carpenter', 'painter', 'gardener', 'handyman', 'roofing', 'repair', 'bathroom'];

    // Open search page and focus input
    searchButtons.forEach(button => {
        button.addEventListener('click', function () {
            searchPage.classList.add('active');
            if (button.classList.contains('search-button')) {
                // Sync input values when opening search page
                searchPageInput.value = mainSearchInput.value;
                performSearch(mainSearchInput.value);
            }
            searchPageInput.focus();
        });
    });

    // 🔍 Main search function
    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();

        workerCards.forEach(card => {
            const workerName = card.querySelector('h3')?.textContent.toLowerCase();
            const profession = card.querySelector('.profession')?.textContent.toLowerCase();
            const location = card.querySelector('.location')?.textContent.toLowerCase();

            const matches = [workerName, profession, location].some(field => field?.includes(searchTerm));
            card.style.display = matches ? 'block' : 'none';
        });
    }

    // Update suggestions dropdown
    function updateSuggestions(searchTerm) {
        if (searchTerm.length > 0) {
            const filteredSuggestions = suggestions.filter(s => s.includes(searchTerm.toLowerCase()));

            suggestionsContainer.innerHTML = filteredSuggestions.length
                ? filteredSuggestions.map(s => `<div class="suggestion-item">${s}</div>`).join('')
                : '';

            suggestionsContainer.style.display = filteredSuggestions.length ? 'block' : 'none';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Event listeners for input fields
    [mainSearchInput, searchPageInput].forEach(inputField => {
        inputField.addEventListener('input', function (e) {
            const searchTerm = e.target.value;
            mainSearchInput.value = searchTerm;
            searchPageInput.value = searchTerm;
            updateSuggestions(searchTerm);
            performSearch(searchTerm);
        });
    });

    // Handle suggestion clicks
    suggestionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-item')) {
            const selectedSuggestion = e.target.textContent;
            mainSearchInput.value = selectedSuggestion;
            searchPageInput.value = selectedSuggestion;
            suggestionsContainer.style.display = 'none';
            performSearch(selectedSuggestion);
        }
    });

    // Close search page on outside click or Escape key
    document.addEventListener('click', (e) => {
        if (!searchPage.contains(e.target) &&
            !Array.from(searchButtons).some(btn => btn.contains(e.target)) &&
            e.target !== mainSearchInput) {
            searchPage.classList.remove('active');
            suggestionsContainer.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            searchPage.classList.remove('active');
            suggestionsContainer.style.display = 'none';
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Select elements
        const scrollContainer = document.querySelector('.icon-scroll');
        const scrollLeftBtn = document.querySelector('.scroll-left');
        const scrollRightBtn = document.querySelector('.scroll-right');
    
        if (scrollContainer) {
            const scrollAmount = 200; // Pixels per scroll
    
            // Scroll left function
            scrollLeftBtn?.addEventListener('click', () => {
                scrollContainer.scrollLeft -= scrollAmount;
            });
    
            // Scroll right function
            scrollRightBtn?.addEventListener('click', () => {
                scrollContainer.scrollLeft += scrollAmount;
            });
        }
    });
    

    // 🏷️ Handle icon clicks
    document.querySelectorAll('.icon-item').forEach(icon => {
        icon.addEventListener('click', () => {
            const service = icon.querySelector('span').textContent.toLowerCase();
            mainSearchInput.value = service;
            searchPageInput.value = service;
            suggestionsContainer.style.display = 'none';
            performSearch(service);
            searchPage.classList.add('active');
        });
    });

    // Start with an empty search to show all workers
    performSearch('');
});
