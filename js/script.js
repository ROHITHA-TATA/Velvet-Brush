// Global state management
const state = {
    cart: [],
    wishlist: [],
    paintings: []
};

// Paintings Data (You can replace with your actual paintings data later)
const paintings = [
    {
        id: 1,
        title: "Ganesha Folk Art",
        price: 120.00,
        image: "images/painting1.jpg",
        category: "folk",
        description: "Colorful Ganesha artwork with intricate patterns and mandala-inspired details."
    },
    {
        id: 2,
        title: "Musical Mandala",
        price: 95.00,
        image: "images/painting2.jpg",
        category: "mandala",
        description: "Black and white mandala featuring guitar design with intricate zentangle patterns."
    },
    {
        id: 3,
        title: "Peacock Mandala",
        price: 110.00,
        image: "images/painting3.jpg",
        category: "mandala",
        description: "Detailed black and white peacock mandala with intricate geometric patterns."
    },
    {
        id: 4,
        title: "Sunset Bridge",
        price: 150.00,
        image: "images/painting4.jpg",
        category: "landscape",
        description: "Silhouette figure on a bridge against a vibrant sunset with palm trees."
    },
    {
        id: 5,
        title: "Colorful Floral",
        price: 85.00,
        image: "images/painting5.jpg",
        category: "floral",
        description: "Vibrant floral composition with multi-colored flowers and green foliage."
    },
    {
        id: 6,
        title: "Musical Portrait",
        price: 135.00,
        image: "images/painting6.jpg",
        category: "folk",
        description: "Portrait of woman with guitar against a mandala backdrop in vibrant colors."
    },
    {
        id: 101,
        title: "Purple Mandala Art",
        price: 120.00,
        image: "images/painting7.jpg",
        category: "mandala",
        description: "Intricate hand-drawn mandala in vibrant purple tones."
    },
    {
        id: 102,
        title: "Girl with Braid Sketch",
        price: 90.00,
        image: "images/painting8.jpg",
        category: "drawing",
        description: "Pencil sketch of a girl with a long braid, holding a drink and a bag."
    },
    {
        id: 103,
        title: "3D Mixed Media Art",
        price: 150.00,
        image: "images/painting9.jpg",
        category: "mixed",
        description: "A creative blend of painting, natural twigs, and playful figurines for a unique 3D effect."
    }
];

// DOM Elements
const paintingsGrid = document.querySelector('.paintings-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartIcon = document.querySelector('.cart-icon');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const checkoutBtn = document.querySelector('.checkout-btn');
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search artworks...';
searchInput.className = 'search-input';

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    initializeWishlist();
    loadPaintings();
    updateCartCount();
    displayPaintings(paintings);
    
    // Setup filter buttons
    setupFilters();
    
    // Setup cart functionality
    setupCart();
    
    // Initialize hero section animations
    initializeHeroAnimations();
    
    // Initialize scroll indicator
    initializeScrollIndicator();
});

// Display Paintings Function
function displayPaintings(paintingsArray) {
    // Clear paintings grid
    paintingsGrid.innerHTML = '';
    
    if (paintingsArray.length === 0) {
        paintingsGrid.innerHTML = '<p class="no-paintings">No paintings found in this category.</p>';
        return;
    }
    
    paintingsArray.forEach(painting => {
        const paintingElement = document.createElement('div');
        paintingElement.classList.add('painting-item');
        paintingElement.setAttribute('data-id', painting.id);
        
        paintingElement.innerHTML = `
            <div class="painting-img">
                <img src="${painting.image}" alt="${painting.title}" class="painting-image">
            </div>
            <div class="painting-details">
                <h3 class="painting-title">${painting.title}</h3>
                <p class="painting-description">${painting.description}</p>
                <div class="painting-price">$${painting.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${painting.id}">Add to Cart</button>
            </div>
        `;
        
        paintingsGrid.appendChild(paintingElement);
        
        // Add event listener to open lightbox when image is clicked
        const paintingImg = paintingElement.querySelector('.painting-image');
        paintingImg.addEventListener('click', () => {
            openLightbox(painting.id);
        });
        
        // Add event listener to open lightbox when title is clicked
        const paintingTitle = paintingElement.querySelector('.painting-title');
        paintingTitle.addEventListener('click', () => {
            openLightbox(painting.id);
        });
    });
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const id = parseInt(event.target.dataset.id);
            addToCart(id);
        });
    });
}

// Setup Filters Function
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            const filter = event.target.dataset.filter;
            
            // Filter paintings
            if (filter === 'all') {
                displayPaintings(paintings);
            } else {
                const filteredPaintings = paintings.filter(painting => painting.category === filter);
                displayPaintings(filteredPaintings);
            }
        });
    });
}

// Setup Cart Function
function setupCart() {
    // Open cart
    cartIcon.addEventListener('click', () => {
        cartOverlay.classList.remove('hidden');
    });
    
    // Close cart
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.add('hidden');
    });
    
    // Clear cart
    clearCartBtn.addEventListener('click', clearCart);
    
    // Checkout
    checkoutBtn.addEventListener('click', checkout);
}

// Add to Cart Function
function addToCart(id) {
    const painting = paintings.find(painting => painting.id === id);
    const itemInCart = state.cart.find(item => item.id === id);
    
    if (itemInCart) {
        // Increase quantity if item already in cart
        itemInCart.quantity++;
    } else {
        // Add new item to cart
        const cartItem = {
            id: painting.id,
            title: painting.title,
            price: painting.price,
            image: painting.image,
            quantity: 1
        };
        state.cart.push(cartItem);
    }
    
    // Update cart display
    updateCart();
    
    // Show notification
    showNotification(`${painting.title} added to cart!`);
}

// Update Cart Function
function updateCart() {
    // Update cart items display
    displayCartItems();
    
    // Update cart count
    updateCartCount();
    
    // Update total amount
    updateTotalAmount();
    
    // Save cart to local storage
    saveCart();
}

// Display Cart Items Function
function displayCartItems() {
    // Clear cart items
    cartItems.innerHTML = '';
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
    }
    
    state.cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItemElement);
    });
    
    // Add event listeners to cart item buttons
    setupCartItemButtons();
}

// Setup Cart Item Buttons Function
function setupCartItemButtons() {
    // Increase quantity buttons
    const increaseBtns = document.querySelectorAll('.increase');
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const id = parseInt(event.target.dataset.id);
            increaseQuantity(id);
        });
    });
    
    // Decrease quantity buttons
    const decreaseBtns = document.querySelectorAll('.decrease');
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const id = parseInt(event.target.dataset.id);
            decreaseQuantity(id);
        });
    });
    
    // Remove item buttons
    const removeBtns = document.querySelectorAll('.remove-item');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const id = parseInt(event.target.dataset.id);
            removeItem(id);
        });
    });
}

// Increase Quantity Function
function increaseQuantity(id) {
    const item = state.cart.find(item => item.id === id);
    item.quantity++;
    updateCart();
}

// Decrease Quantity Function
function decreaseQuantity(id) {
    const item = state.cart.find(item => item.id === id);
    
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeItem(id);
    }
    
    updateCart();
}

// Remove Item Function
function removeItem(id) {
    state.cart = state.cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart Count Function
function updateCartCount() {
    const count = state.cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Update Total Amount Function
function updateTotalAmount() {
    const total = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Save Cart to Local Storage Function
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(state.cart));
}

// Load Cart from Local Storage Function
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
        state.cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Clear Cart Function
function clearCart() {
    state.cart = [];
    updateCart();
}

// Checkout Function
function checkout() {
    if (state.cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Here you would typically integrate with a payment gateway
    showNotification('Thank you for your purchase!');
    clearCart();
    cartOverlay.classList.add('hidden');
}

// Show Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Load cart from local storage when page loads
loadCart();

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 3000;
        opacity: 1;
        transition: opacity 0.5s;
    }
    
    .notification.hide {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Lightbox Functionality
const lightbox = document.getElementById('paintingLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxPrice = document.getElementById('lightboxPrice');
const lightboxViewBtn = document.getElementById('lightboxViewBtn');
const lightboxCartBtn = document.getElementById('lightboxCartBtn');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentLightboxIndex = 0;
let lightboxPaintings = [];

// Function to open the lightbox
function openLightbox(paintingId) {
    const painting = paintings.find(p => p.id === paintingId);
    if (!painting) return;
    
    // Set current paintings array for navigation
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    if (activeFilter === 'all') {
        lightboxPaintings = [...paintings];
    } else {
        lightboxPaintings = paintings.filter(p => p.category === activeFilter);
    }
    
    // Find index of current painting in the filtered array
    currentLightboxIndex = lightboxPaintings.findIndex(p => p.id === paintingId);
    
    // Update lightbox content
    updateLightboxContent();
    
    // Show lightbox
    lightbox.classList.add('active');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Function to navigate to previous painting
function prevPainting() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxPaintings.length) % lightboxPaintings.length;
    updateLightboxContent();
}

// Function to navigate to next painting
function nextPainting() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxPaintings.length;
    updateLightboxContent();
}

// Function to update lightbox content
function updateLightboxContent() {
    const painting = lightboxPaintings[currentLightboxIndex];
    
    lightboxImage.src = painting.image;
    lightboxImage.alt = painting.title;
    lightboxTitle.textContent = painting.title;
    lightboxDescription.textContent = painting.description;
    lightboxPrice.textContent = `$${painting.price.toFixed(2)}`;
    lightboxViewBtn.href = `paintingdetail.html?id=${painting.id}`;
    lightboxCartBtn.dataset.id = painting.id;
    
    // Show/hide navigation buttons based on number of paintings
    if (lightboxPaintings.length <= 1) {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
    } else {
        lightboxPrev.style.display = 'flex';
        lightboxNext.style.display = 'flex';
    }
}

// Event listeners for lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevPainting);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', nextPainting);
}

if (lightboxCartBtn) {
    lightboxCartBtn.addEventListener('click', () => {
        const id = parseInt(lightboxCartBtn.dataset.id);
        addToCart(id);
    });
}

// Close lightbox when clicking outside of content
if (lightbox) {
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Handle keyboard navigation
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevPainting();
    } else if (e.key === 'ArrowRight') {
        nextPainting();
    }
});

// Search functionality
function initializeSearch() {
    const header = document.querySelector('header .container');
    header.insertBefore(searchInput, header.firstChild);
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPaintings = paintings.filter(painting => 
            painting.title.toLowerCase().includes(searchTerm) ||
            painting.description.toLowerCase().includes(searchTerm) ||
            painting.category.toLowerCase().includes(searchTerm)
        );
        displayPaintings(filteredPaintings);
    });
}

// Wishlist functionality
function initializeWishlist() {
    const wishlistBtn = document.createElement('button');
    wishlistBtn.className = 'wishlist-btn';
    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
    document.querySelector('.cart-icon').after(wishlistBtn);

    wishlistBtn.addEventListener('click', () => {
        const wishlistOverlay = document.createElement('div');
        wishlistOverlay.className = 'wishlist-overlay';
        wishlistOverlay.innerHTML = `
            <div class="wishlist-container">
                <div class="wishlist-header">
                    <h3>Your Wishlist</h3>
                    <button class="close-wishlist">&times;</button>
                </div>
                <div class="wishlist-items"></div>
            </div>
        `;
        document.body.appendChild(wishlistOverlay);
        displayWishlistItems();
    });
}

// Load paintings data
function loadPaintings() {
    // This would typically come from an API or database
    state.paintings = [
        {
            id: 1,
            title: "Ganesha Painting",
            description: "Beautiful Ganesha painting with intricate details",
            price: 299.99,
            category: "folk",
            image: "images/ganesha.jpg"
        },
        // Add more paintings here
    ];
    displayPaintings(state.paintings);
}

// Display wishlist items
function displayWishlistItems() {
    const wishlistItems = document.querySelector('.wishlist-items');
    wishlistItems.innerHTML = state.wishlist.map(painting => `
        <div class="wishlist-item">
            <img src="${painting.image}" alt="${painting.title}">
            <div class="wishlist-item-info">
                <h4>${painting.title}</h4>
                <p>$${painting.price}</p>
                <button onclick="addToCart(${painting.id})">Add to Cart</button>
                <button onclick="removeFromWishlist(${painting.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

// Remove from wishlist
function removeFromWishlist(paintingId) {
    state.wishlist = state.wishlist.filter(p => p.id !== paintingId);
    displayWishlistItems();
}

// Hero Section Animations and Interactions
function initializeHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const brushStrokes = document.querySelector('.brush-strokes');
    
    // Add parallax effect to brush strokes
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        brushStrokes.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });
}

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Hide scroll indicator when user scrolls down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
        
        // Smooth scroll to gallery section when clicking the indicator
        scrollIndicator.addEventListener('click', () => {
            const gallerySection = document.querySelector('.gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (!carousel || !testimonials.length) return;
    
    let currentIndex = 0;
    const itemsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const totalSlides = testimonials.length;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateCarousel() {
        const slideWidth = 100 / itemsPerView;
        const offset = currentIndex * -slideWidth;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % (totalSlides - itemsPerView + 1);
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + (totalSlides - itemsPerView + 1)) % (totalSlides - itemsPerView + 1);
        updateCarousel();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newItemsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
            if (newItemsPerView !== itemsPerView) {
                currentIndex = 0;
                updateCarousel();
            }
        }, 250);
    });
    
    // Initial setup
    updateCarousel();
});

// Share Experience Button
document.addEventListener('DOMContentLoaded', function() {
    const addTestimonialBtn = document.querySelector('.add-testimonial-btn');
    
    if (addTestimonialBtn) {
        addTestimonialBtn.addEventListener('click', () => {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'testimonial-modal';
            modal.innerHTML = `
                <div class="testimonial-form">
                    <h3>Share Your Experience</h3>
                    <form id="testimonialForm">
                        <div class="form-group">
                            <label for="testimonialName">Your Name</label>
                            <input type="text" id="testimonialName" required>
                        </div>
                        <div class="form-group">
                            <label for="testimonialText">Your Review</label>
                            <textarea id="testimonialText" rows="4" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="testimonialRating">Rating</label>
                            <select id="testimonialRating" required>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="1">⭐</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="testimonialImage">Your Photo (optional)</label>
                            <input type="file" id="testimonialImage" accept="image/*">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Submit Review</button>
                            <button type="button" class="btn btn-secondary close-testimonial-modal">Cancel</button>
                        </div>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Show modal
            modal.style.display = 'block';
            
            // Close modal when clicking cancel
            const closeBtn = modal.querySelector('.close-testimonial-modal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            // Handle form submission
            const form = modal.querySelector('#testimonialForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Here you would typically send the data to your backend
                const formData = {
                    name: document.getElementById('testimonialName').value,
                    text: document.getElementById('testimonialText').value,
                    rating: document.getElementById('testimonialRating').value,
                    image: document.getElementById('testimonialImage').files[0]
                };
                
                console.log('Testimonial submitted:', formData);
                
                // Show success message
                showNotification('Thank you for sharing your experience!');
                
                // Close modal
                modal.remove();
            });
        });
    }
});

// Art Style Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quizSection = document.querySelector('.art-style-quiz-section');
    if (!quizSection) return;

    const progressBar = document.querySelector('.progress-bar');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const quizContainer = document.querySelector('.quiz-container');
    const quizContent = document.querySelector('.quiz-content');

    let currentQuestion = 0;
    let answers = [];

    // Quiz questions data
    const questions = [
        {
            question: "What mood are you looking to create in your space?",
            options: [
                { text: "Calm & Serene", style: "mandala" },
                { text: "Energetic & Vibrant", style: "folk" },
                { text: "Elegant & Sophisticated", style: "realistic" },
                { text: "Playful & Whimsical", style: "abstract" }
            ]
        },
        {
            question: "What colors speak to you the most?",
            options: [
                { text: "Soft Pastels", style: "mandala" },
                { text: "Bold & Bright", style: "folk" },
                { text: "Rich & Deep", style: "realistic" },
                { text: "Mixed & Unexpected", style: "abstract" }
            ]
        },
        {
            question: "How do you prefer your art to be displayed?",
            options: [
                { text: "As a focal point", style: "mandala" },
                { text: "Part of a collection", style: "folk" },
                { text: "In a traditional frame", style: "realistic" },
                { text: "In a unique way", style: "abstract" }
            ]
        },
        {
            question: "What's your ideal art viewing experience?",
            options: [
                { text: "Meditative & Contemplative", style: "mandala" },
                { text: "Cultural & Storytelling", style: "folk" },
                { text: "Detailed & Realistic", style: "realistic" },
                { text: "Creative & Interpretive", style: "abstract" }
            ]
        }
    ];

    // Initialize quiz
    function initQuiz() {
        showQuestion(0);
        updateProgress();
    }

    // Show question
    function showQuestion(index) {
        const question = questions[index];
        
        quizContent.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map(option => `
                        <button class="quiz-option" data-style="${option.style}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners to new options
        const newOptions = quizContent.querySelectorAll('.quiz-option');
        newOptions.forEach(option => {
            option.addEventListener('click', () => handleOptionClick(option));
        });
    }

    // Update progress
    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;

        progressSteps.forEach((step, i) => {
            if (i <= currentQuestion) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Handle option click
    function handleOptionClick(option) {
        // Remove selected class from all options
        const currentOptions = document.querySelectorAll('.quiz-option');
        currentOptions.forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        option.classList.add('selected');

        // Store answer
        answers[currentQuestion] = option.dataset.style;

        // Move to next question after a short delay
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateProgress();
            } else {
                showResults();
            }
        }, 500);
    }

    // Show results
    function showResults() {
        // Calculate most common style
        const styleCounts = answers.reduce((acc, style) => {
            acc[style] = (acc[style] || 0) + 1;
            return acc;
        }, {});

        const dominantStyle = Object.entries(styleCounts)
            .sort((a, b) => b[1] - a[1])[0][0];

        // Create results content
        const resultsHTML = `
            <div class="quiz-results">
                <h3>Your Perfect Art Style</h3>
                <div class="result-style">
                    <h4>${getStyleName(dominantStyle)}</h4>
                    <p>${getStyleDescription(dominantStyle)}</p>
                </div>
                <button class="restart-quiz">Take Quiz Again</button>
            </div>
        `;

        quizContent.innerHTML = resultsHTML;

        // Add restart functionality
        const restartBtn = quizContent.querySelector('.restart-quiz');
        restartBtn.addEventListener('click', () => {
            currentQuestion = 0;
            answers = [];
            initQuiz();
        });
    }

    // Helper function to get style name
    function getStyleName(style) {
        const styles = {
            'mandala': 'Mandala Art',
            'folk': 'Folk Art',
            'abstract': 'Abstract Art',
            'realistic': 'Realistic Art'
        };
        return styles[style] || style;
    }

    // Helper function to get style description
    function getStyleDescription(style) {
        const descriptions = {
            'mandala': 'You appreciate intricate patterns and spiritual symbolism. Mandala art, with its geometric precision and meditative qualities, is perfect for you.',
            'folk': 'You value cultural heritage and traditional artistic expressions. Folk art, with its vibrant colors and storytelling elements, resonates with your artistic sensibilities.',
            'abstract': 'You enjoy creative freedom and emotional expression. Abstract art, with its emphasis on colors, shapes, and emotions, matches your artistic vision.',
            'realistic': 'You appreciate attention to detail and technical skill. Realistic art, with its focus on accurate representation, aligns with your artistic preferences.'
        };
        return descriptions[style] || 'A unique artistic style that matches your preferences.';
    }

    // Initialize quiz
    initQuiz();
});

// Custom Art Request Button and Modal
document.addEventListener('DOMContentLoaded', function() {
    const requestArtBtn = document.querySelector('.request-art-btn');
    const customArtModal = document.getElementById('customArtModal');
    const closeModalBtns = customArtModal ? customArtModal.querySelectorAll('.close-modal') : [];
    const customArtForm = document.getElementById('customArtForm');

    if (requestArtBtn && customArtModal) {
        // Open modal
        requestArtBtn.addEventListener('click', () => {
            customArtModal.style.display = 'block';
        });

        // Close modal
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                customArtModal.style.display = 'none';
                // Optionally reset form
                if (customArtForm) customArtForm.reset();
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === customArtModal) {
                customArtModal.style.display = 'none';
                // Optionally reset form
                if (customArtForm) customArtForm.reset();
            }
        });

        // Handle form submission (placeholder)
        if (customArtForm) {
            customArtForm.addEventListener('submit', function(event) {
                event.preventDefault();
                // Process form data here
                console.log('Custom art form submitted!');
                // Show success message or handle submission
                showNotification('Custom art request submitted successfully!');
                customArtModal.style.display = 'none';
                customArtForm.reset();
            });
        }
    }
}); 