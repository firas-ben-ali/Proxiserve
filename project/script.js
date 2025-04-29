document.addEventListener('DOMContentLoaded', function() {
    // Get all search buttons
    const searchButtons = document.querySelectorAll('.search-btn');
    const searchPage = document.getElementById('searchPage');
    const searchInputs = document.querySelectorAll('input[type="text"]');

    // Add click event to all search buttons
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            searchPage.classList.add('active');
        });
    });

    // Sync search inputs
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Update all search inputs with the same value
            searchInputs.forEach(otherInput => {
                if (otherInput !== e.target) {
                    otherInput.value = e.target.value;
                }
            });
            
            // Search functionality
            searchWorkers(searchTerm);
        });
    });

    function searchWorkers(searchTerm) {
        const workerCards = document.querySelectorAll('.worker-card');
        
        workerCards.forEach(card => {
            const workerName = card.querySelector('h3').textContent.toLowerCase();
            const profession = card.querySelector('.profession').textContent.toLowerCase();
            const location = card.querySelector('.location').textContent.toLowerCase();
            
            if (workerName.includes(searchTerm) || 
                profession.includes(searchTerm) || 
                location.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Close search page when clicking outside
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchPage.classList.contains('active')) {
            searchPage.classList.remove('active');
        }
    });

    // Animation for search input
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.addEventListener('focus', () => {
            searchContainer.style.transform = 'scale(1.02)';
        }, true);

        searchContainer.addEventListener('blur', () => {
            searchContainer.style.transform = 'scale(1)';
        }, true);
    }
});