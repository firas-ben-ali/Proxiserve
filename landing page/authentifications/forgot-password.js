document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    const resetBtn = document.querySelector('.reset-btn');
    
    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Disable button and show loading state
        resetBtn.disabled = true;
        resetBtn.textContent = 'Sending...';
        
        try {
            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert('Password reset link has been sent to your email. Please check your inbox.');
            
            // Redirect to login page
            window.location.href = 'index.html';
            
        } catch (error) {
            // Show error message
            alert(error.message || 'An error occurred. Please try again.');
            
            // Reset button state
            resetBtn.disabled = false;
            resetBtn.textContent = 'Send Reset Link';
        }
    });

    /*backgroun images*/
    const backgroundImages = [
        'images/cleaning.avif', // Plumber
        'images/floorer.avif', // Electrician
        'images/plumber.avif', // Carpenter
        'images/demenagement.avif'  // Painter
    ];

    const headerBackground = document.getElementById('headerBackground');
    let currentImageIndex = 0;

    // Create initial background images
    backgroundImages.forEach((imageUrl, index) => {
        const backgroundImage = document.createElement('div');
        backgroundImage.className = `background-image ${index === 0 ? 'active' : ''}`;
        backgroundImage.style.backgroundImage = `url(${imageUrl})`;
        headerBackground.appendChild(backgroundImage);
    });

    // Function to change background image
    function changeBackgroundImage() {
        const images = headerBackground.getElementsByClassName('background-image');
        images[currentImageIndex].classList.remove('active');
        
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        images[currentImageIndex].classList.add('active');
    }

    // Change background image every 4 seconds
    setInterval(changeBackgroundImage, 4000);
});