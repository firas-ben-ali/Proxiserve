document.addEventListener('DOMContentLoaded', () => {
    // Password visibility toggle functions
    const setupPasswordToggle = (passwordInput, toggleButton) => {
        toggleButton.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleButton.classList.toggle('fa-eye');
            toggleButton.classList.toggle('fa-eye-slash');
        });
    };

    // Setup password toggles
    setupPasswordToggle(
        document.getElementById('password'),
        document.getElementById('togglePassword')
    );
    setupPasswordToggle(
        document.getElementById('confirmPassword'),
        document.getElementById('toggleConfirmPassword')
    );

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });

    // Password validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    const validatePasswords = () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity("Passwords don't match");
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    };

    passwordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    // Form submission
    const signupForm = document.getElementById('signupForm');
    const signupBtn = document.querySelector('.signup-btn');
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable the button and show loading state
        signupBtn.disabled = true;
        signupBtn.textContent = 'Creating Account...';
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: passwordInput.value,
            role: document.querySelector('input[name="role"]:checked')?.value
        };

        try {
            // Validate all required fields
            if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.role) {
                throw new Error('Please fill in all required fields');
            }

            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

            // Validate phone number format (XXX-XXX-XXXX)
            if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
                throw new Error('Please enter a valid phone number');
            }

            // Validate password length
            if (formData.password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            // Here you would typically send the data to your backend
            // For now, we'll simulate a successful signup
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            // Show success message
            alert('Account created successfully! Please log in.');
            
            // Redirect to login page
            window.location.href = 'index.html';
            
        } catch (error) {
            // Show error message
            alert(error.message || 'An error occurred during signup. Please try again.');
            
            // Reset button state
            signupBtn.disabled = false;
            signupBtn.textContent = 'Create Account';
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

