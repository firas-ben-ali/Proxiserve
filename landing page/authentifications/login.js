document.addEventListener('DOMContentLoaded', () => {
    // Gestion du carrousel
    const images = document.querySelectorAll('.background-image');
    let currentIndex = 0;

    if (images.length === 0) {
        console.error('Aucune image trouvée pour le carrousel.');
        return;
    }

    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    images[0].classList.add('active');
    setInterval(changeImage, 5000);

    // Gestion de l'icône "Remember me" et stockage des identifiants
    const checkbox = document.getElementById('remember');
    const checkboxIcon = document.getElementById('checkbox-icon');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    // Vérifier si des identifiants sont stockés
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail && storedPassword) {
        emailInput.value = storedEmail;
        passwordInput.value = storedPassword;
        checkbox.checked = true;
        checkboxIcon.textContent = 'check_box';
    }

    if (checkbox && checkboxIcon) {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxIcon.textContent = 'check_box';
                // Stocker les identifiants
                localStorage.setItem('rememberedEmail', emailInput.value);
                localStorage.setItem('rememberedPassword', passwordInput.value);
            } else {
                checkboxIcon.textContent = 'check_box_outline_blank';
                // Supprimer les identifiants stockés
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
            }
        });
    }

    // Gestion de la soumission du formulaire
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;

            // Si "Remember me" est coché, stocker les identifiants
            if (checkbox.checked) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberedPassword', password);
            }

            // Ici, vous pouvez ajouter votre logique d'authentification
            console.log('Login attempt:', { email, password });
        });
    }
});
