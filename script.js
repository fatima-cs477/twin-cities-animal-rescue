// Data Objects & Arrays
const PETS_DATA = [
  { id: 'barnaby', name: 'Barnaby', type: 'Dog', status: 'Available' },
  { id: 'luna', name: 'Luna', type: 'Cat', status: 'Available' }
];

// Initialize application state from localStorage
let favoritePets = JSON.parse(localStorage.getItem('tcar_favorites')) || [];

document.addEventListener('DOMContentLoaded', () => {
  updateFavoriteUI();
  setupValidation();
  prefillForm();
});

// Feature: Toggle Favorite Pet
function toggleFavorite(petId) {
  const index = favoritePets.indexOf(petId);
  if (index === -1) {
    favoritePets.push(petId);
  } else {
    favoritePets.splice(index, 1);
  }
  
  // Persist to localStorage
  localStorage.setItem('tcar_favorites', JSON.stringify(favoritePets));
  updateFavoriteUI();
}

// Update UI elements dynamic feedback
function updateFavoriteUI() {
  const countBadge = document.getElementById('favorite-count');
  if (countBadge) {
    countBadge.textContent = favoritePets.length;
  }
  
  PETS_DATA.forEach(pet => {
    const btn = document.getElementById(`fav-btn-${pet.id}`);
    if (btn) {
      if (favoritePets.includes(pet.id)) {
        btn.textContent = '♥ Favorited';
        btn.classList.add('favorited');
      } else {
        btn.textContent = '♡ Favorite Me';
        btn.classList.remove('favorited');
      }
    }
  });
}

// Form Validation and LocalStorage pre-fill
function setupValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    // 1. Required Name Check
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Full name is required.';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    // 2. Email Format Validation
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email address is required.';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address (e.g., user@example.com).';
            isValid = false;
        }

    // Save state on valid submission
    if (isValid) {
      const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
      };
      localStorage.setItem('tcar_user_info', JSON.stringify(userData));
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
      prefillForm();
    }
  });
}

// Restore saved user info into contact form
function prefillForm() {
  const savedUser = JSON.parse(localStorage.getItem('tcar_user_info'));
  if (savedUser) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    if (nameInput && !nameInput.value) nameInput.value = savedUser.name;
    if (emailInput && !emailInput.value) emailInput.value = savedUser.email;
  }
}
