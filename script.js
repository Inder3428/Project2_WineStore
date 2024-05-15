// Navbar animation
const navLinks = document.querySelectorAll('.navbar .nav-link');
navLinks.forEach(link => {
  link.style.transition = 'all 0.2s ease'; // Set transition once
  link.addEventListener('mouseover', () => {
    link.style.transform = 'scale(1.1)';
  });
  link.addEventListener('mouseout', () => {
    link.style.transform = 'scale(1.0)';
  });
});

// Carousel functionality
let currentSlide = 0;
const carouselImages = document.querySelectorAll('.carousel img');
carouselImages.forEach(img => img.style.transition = 'opacity 1s ease'); // Set transition once

function showNextSlide() {
  carouselImages.forEach((img, index) => {
    img.style.opacity = index === currentSlide ? '1' : '0';
  });
  currentSlide = (currentSlide + 1) % carouselImages.length;
}

setInterval(showNextSlide, 1500);

// Shopping cart functionality
let cart = [];
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

function addToCart(productName, price) {
  cart.push({ productName, price });
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `${item.productName} - $${item.price.toFixed(2)} <button class="remove-from-cart" onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });
  totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Page ready setup
document.addEventListener('DOMContentLoaded', () => {
  // Initial carousel setup
  showNextSlide();

  // Age verification modal
  const ageModal = document.getElementById('ageModal');
  document.getElementById('yesButton').addEventListener('click', () => {
    ageModal.style.display = 'none';
  });
  document.getElementById('noButton').addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
  ageModal.style.display = 'block';

  // Hero section scroll animation
  window.addEventListener('scroll', handleScroll);

  // Example initialization for wines
  const addButtons = document.querySelectorAll('.add-to-cart');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');
      const price = parseFloat(button.getAttribute('data-price'));
      addToCart(productName, price);
    });
  });

  // Other components can be initialized here as needed
});

// Hero section scroll animation handle function
function handleScroll() {
  const heroSection = document.querySelector('.hero-section');
  const rect = heroSection.getBoundingClientRect();
  if (rect.top <= window.innerHeight * 0.75) {
    heroSection.classList.add('visible');
    window.removeEventListener('scroll', handleScroll);
  }
}

// Other interactive elements
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container');

left.addEventListener('mouseenter', () => container.classList.add('hover-left'));
left.addEventListener('mouseleave', () => container.classList.remove('hover-left'));

right.addEventListener('mouseenter', () => container.classList.add('hover-right'));
right.addEventListener('mouseleave', () => container.classList.remove('hover-right'));


