// Product Database
//Images sourced from Unsplash (https://unsplash.com/) under the Unsplash License (https://unsplash.com/license)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        description: "Advanced fitness tracking and notifications"
    },
    {
        id: 3,
        name: "USB-C Cable",
        category: "Electronics",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
        description: "Durable fast charging USB-C cable"
    },
    {
        id: 4,
        name: "Designer T-Shirt",
        category: "Fashion",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        description: "Comfortable premium cotton t-shirt"
    },
    {
        id: 5,
        name: "Running Shoes",
        category: "Fashion",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        description: "Professional grade running shoes with cushioning"
    },
    {
        id: 6,
        name: "Winter Jacket",
        category: "Fashion",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
        description: "Warm and stylish winter jacket"
    },
    {
        id: 7,
        name: "Coffee Maker",
        category: "Home",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop",
        description: "Programmable coffee maker with thermal carafe"
    },
    {
        id: 8,
        name: "LED Desk Lamp",
        category: "Home",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1565636192335-14c112995f0d?w=500&h=500&fit=crop",
        description: "Energy efficient LED desk lamp with USB charging"
    },
    {
        id: 9,
        name: "Bed Sheets Set",
        category: "Home",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        description: "Premium Egyptian cotton bed sheets"
    },
    {
        id: 10,
        name: "Yoga Mat",
        category: "Sports",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        description: "Non-slip yoga mat with carrying strap"
    },
    {
        id: 11,
        name: "Dumbbells Set",
        category: "Sports",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop",
        description: "Adjustable dumbbells set (5-25 lbs)"
    },
    {
        id: 12,
        name: "Basketball",
        category: "Sports",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop",
        description: "Professional grade basketball"
    }
];

// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Hamburger Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Display Featured Products on Home Page
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    const featured = products.slice(0, 6);
    featuredContainer.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Display ALL Products on Products Page
function displayAllProducts(productsToDisplay = products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    if (productsToDisplay.length === 0) {
        container.innerHTML = '<p class="no-products">No products found. Try adjusting your filters.</p>';
        return;
    }

    container.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Search and Filter Functionality
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');

    function applyFilters() {
        let filtered = products;

        // Search filter
        if (searchInput && searchInput.value) {
            const searchTerm = searchInput.value.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        if (categoryFilter && categoryFilter.value) {
            filtered = filtered.filter(p => p.category === categoryFilter.value);
        }

        // Price filter
        if (priceFilter && priceFilter.value) {
            filtered = filtered.filter(p => {
                const price = p.price;
                switch(priceFilter.value) {
                    case '0-50': return price >= 0 && price <= 50;
                    case '50-100': return price > 50 && price <= 100;
                    case '100-500': return price > 100 && price <= 500;
                    case '500+': return price > 500;
                    default: return true;
                }
            });
        }

        displayAllProducts(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
}

// Modern Glass-Frame Alert System
function showGlassAlert(message, type = 'success', duration = 4000) {
    // Create alert container if it doesn't exist
    let alertContainer = document.getElementById('glassAlertContainer');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'glassAlertContainer';
        alertContainer.className = 'glass-alert-container';
        document.body.appendChild(alertContainer);
    }

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `glass-alert glass-alert-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    
    alert.innerHTML = `
        <div class="glass-alert-content">
            <span class="glass-alert-icon">${icon}</span>
            <span class="glass-alert-message">${message}</span>
        </div>
    `;
    
    alertContainer.appendChild(alert);
    
    // Trigger animation
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    // Remove alert after duration
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, duration);
}

// Add to Cart with Glass Alert
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    showGlassAlert(`${product.name} added to cart! 🛒`, 'success', 3000);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Display Cart Items
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <input type="number" value="${item.quantity}" readonly>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    updateCartSummary();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            displayCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Display Order Summary in Checkout
function displayOrderSummary() {
    const orderSummaryEl = document.getElementById('orderSummary');
    if (!orderSummaryEl) return;

    if (cart.length === 0) {
        orderSummaryEl.innerHTML = '<p>No items in cart. <a href="products.html">Shop now</a></p>';
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    let html = '<div class="items-summary">';
    cart.forEach(item => {
        html += `
            <div class="summary-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    html += '</div>';
    html += `
        <div class="summary-totals">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        </div>
    `;

    orderSummaryEl.innerHTML = html;
}

// Handle Checkout Form Submission
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate form
        if (!checkoutForm.checkValidity()) {
            showGlassAlert('Please fill in all required fields', 'error', 3000);
            return;
        }

        // Get form data
        const formData = new FormData(checkoutForm);
        const orderData = {
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip: formData.get('zip')
            },
            payment: {
                cardName: formData.get('cardName'),
                cardNumber: formData.get('cardNumber'),
                expiry: formData.get('expiry'),
                cvv: formData.get('cvv')
            },
            items: cart,
            orderDate: new Date().toISOString()
        };

        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        cart = [];
        saveCart();

        // Show success message and redirect
        showGlassAlert('Order placed successfully! Thank you for your purchase. 🎉', 'success', 4000);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    });
}

// Handle Contact Form Submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const message = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };

        // Save message to localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));

        // Show success message
        showGlassAlert('Thank you! Your message has been sent successfully.', 'success', 4000);

        // Reset form
        contactForm.reset();
    });
}

// Handle Login Form Submission
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        // Simple validation (in real app, validate against server)
        if (!email || !password) {
            showGlassAlert('Please fill in all fields', 'error', 3000);
            return;
        }

        // Save login state
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            loginTime: new Date().toISOString()
        }));

        showGlassAlert('Login successful! Welcome back.', 'success', 3000);
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}

// Handle Register Form Submission
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        // Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showGlassAlert('Please fill in all required fields', 'error', 3000);
            return;
        }

        if (password !== confirmPassword) {
            showGlassAlert('Passwords do not match', 'error', 3000);
            return;
        }

        if (password.length < 6) {
            showGlassAlert('Password must be at least 6 characters', 'error', 3000);
            return;
        }

        // Save user data
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            showGlassAlert('Email already registered. Please login.', 'error', 3000);
            return;
        }

        users.push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: formData.get('phone'),
            registeredDate: new Date().toISOString()
        });

        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email
        }));

        showGlassAlert('Account created successfully! Redirecting...', 'success', 3000);
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}

// Initialize Page Based on Current URL
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {
        displayFeaturedProducts();
    } else if (currentPage === 'products.html') {
        displayAllProducts();
        setupFilters();
    } else if (currentPage === 'cart.html') {
        displayCart();
    } else if (currentPage === 'checkout.html') {
        displayOrderSummary();
        setupCheckoutForm();
    } else if (currentPage === 'contact.html') {
        setupContactForm();
    } else if (currentPage === 'login.html') {
        setupLoginForm();
    } else if (currentPage === 'register.html') {
        setupRegisterForm();
    } else if (currentPage === 'forgot.html') {
        setupForgotForm();
    } else if (currentPage === 'admin.html') {
        loadAdminData();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);

// Update cart display if localStorage changes
window.addEventListener('storage', () => {
    cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (document.getElementById('cartContainer')) {
        displayCart();
    }
});

// Handle Forgot Password Form Submission
function setupForgotForm() {
    const forgotForm = document.getElementById('forgotForm');
    if (!forgotForm) return;

    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('forgotEmail').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.email === email);

        if (user) {
            showGlassAlert(`Your password is: ${user.password}`, 'info', 8000);
        } else {
            showGlassAlert('Email not found. Please check your email or register first.', 'error', 4000);
        }
    });
}

// Admin Panel Functions
function openAdmin() {
    let password = prompt("Enter Admin Password:");

    if (password && password.trim() === "Soumya_admin_2026_@7325996774") {
        sessionStorage.setItem("adminAccess", "granted");

        console.log("Saved:", sessionStorage.getItem("adminAccess")); // 👈 debug

        window.location.href = "admin.html";
    } else if (password !== null) {
        alert("❌ Wrong Password!");
    }
}
function loadAdminData() {
    // Load users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    document.getElementById('totalUsers').textContent = users.length;

    // Load orders
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    document.getElementById('totalOrders').textContent = orders.length;

    // Load messages
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    document.getElementById('totalMessages').textContent = messages.length;

    // Calculate revenue
    let totalRevenue = 0;
    orders.forEach(order => {
        order.items.forEach(item => {
            totalRevenue += item.price * item.quantity;
        });
    });
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;

    // Load users table
    loadUsersTable(users);

    // Load orders table
    loadOrdersTable(orders);

    // Load messages table
    loadMessagesTable(messages);
}

function loadUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phone || 'N/A'}</td>
            <td>${new Date(user.registeredDate).toLocaleDateString()}</td>
            <td>
                <button class="btn-admin" onclick="viewUserDetails('${user.email}')">View</button>
                <button class="btn-admin btn-admin-danger" onclick="deleteUser('${user.email}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function loadOrdersTable(orders) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    tbody.innerHTML = orders.map((order, index) => {
        const customer = order.customer;
        const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return `
            <tr>
                <td>#${String(index + 1).padStart(4, '0')}</td>
                <td>${customer.firstName} ${customer.lastName}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${itemsCount} items</td>
                <td>$${total.toFixed(2)}</td>
                <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                    <button class="btn-admin" onclick="viewOrderDetails(${index})">View</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadMessagesTable(messages) {
    const tbody = document.getElementById('messagesTableBody');
    if (!tbody) return;

    tbody.innerHTML = messages.map((message, index) => `
        <tr>
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.subject}</td>
            <td>${message.message.substring(0, 50)}...</td>
            <td>${new Date(message.date).toLocaleDateString()}</td>
            <td>
                <button class="btn-admin" onclick="viewMessageDetails(${index})">View</button>
                <button class="btn-admin btn-admin-danger" onclick="deleteMessage(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function viewUserDetails(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (user) {
        alert(`User Details:\n\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nPhone: ${user.phone || 'N/A'}\nRegistered: ${new Date(user.registeredDate).toLocaleDateString()}`);
    }
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        loadAdminData();
        showGlassAlert('User deleted successfully', 'success', 3000);
    }
}

function viewOrderDetails(orderIndex) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders[orderIndex];

    if (order) {
        let details = `Order Details:\n\nCustomer: ${order.customer.firstName} ${order.customer.lastName}\nEmail: ${order.customer.email}\nPhone: ${order.customer.phone}\n\nAddress:\n${order.customer.address}\n${order.customer.city}, ${order.customer.state} ${order.customer.zip}\n\nItems:\n`;

        order.items.forEach(item => {
            details += `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });

        const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        details += `\nTotal: $${total.toFixed(2)}\nDate: ${new Date(order.orderDate).toLocaleDateString()}`;

        alert(details);
    }
}

function viewMessageDetails(messageIndex) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const message = messages[messageIndex];

    if (message) {
        alert(`Message Details:\n\nFrom: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\n\nMessage:\n${message.message}\n\nDate: ${new Date(message.date).toLocaleDateString()}`);
    }
}

function deleteMessage(messageIndex) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.splice(messageIndex, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadAdminData();
        showGlassAlert('Message deleted successfully', 'success', 3000);
    }
}

// Print and Download Functions
function printBill() {
    // Create printable bill content
    const orderData = getCurrentOrderData();
    if (!orderData) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ShopHub Invoice</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .bill-header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
                .bill-header h1 { color: #007bff; margin-bottom: 10px; }
                .bill-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                .bill-section { margin-bottom: 20px; }
                .bill-section h3 { border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
                .bill-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .bill-table th, .bill-table td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
                .bill-table th { background-color: #f8f9fa; font-weight: bold; }
                .bill-total { background-color: #e9ecef; font-weight: bold; }
                .bill-footer { margin-top: 40px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px; }
                .tracking-info { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
        </head>
        <body>
            ${generateBillHTML(orderData)}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function downloadBill() {
    const orderData = getCurrentOrderData();
    if (!orderData) return;

    // Create PDF-like content (simplified version)
    const billHTML = generateBillHTML(orderData);

    // Create a blob with the HTML content
    const blob = new Blob([`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ShopHub Invoice</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .bill-header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
                .bill-header h1 { color: #007bff; margin-bottom: 10px; }
                .bill-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                .bill-section { margin-bottom: 20px; }
                .bill-section h3 { border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
                .bill-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .bill-table th, .bill-table td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
                .bill-table th { background-color: #f8f9fa; font-weight: bold; }
                .bill-total { background-color: #e9ecef; font-weight: bold; }
                .bill-footer { margin-top: 40px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px; }
                .tracking-info { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
        </head>
        <body>
            ${billHTML}
        </body>
        </html>
    `], { type: 'text/html' });

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ShopHub_Invoice_${orderData.orderNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showGlassAlert('Bill downloaded successfully!', 'success', 3000);
}

function getCurrentOrderData() {
    // Get current order data from checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return null;

    const formData = new FormData(checkoutForm);

    return {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
        },
        items: cart,
        orderNumber: 'SH' + Date.now(),
        trackingId: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        orderDate: new Date().toISOString()
    };
}

function generateBillHTML(orderData) {
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return `
        <div class="bill-header">
            <h1>ShopHub Invoice</h1>
            <p>Order #${orderData.orderNumber}</p>
        </div>

        <div class="bill-info">
            <div class="bill-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
                <p><strong>Email:</strong> ${orderData.customer.email}</p>
                <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
            </div>
            <div class="bill-section">
                <h3>Shipping Address</h3>
                <p>${orderData.customer.address}</p>
                <p>${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zip}</p>
            </div>
        </div>

        <div class="tracking-info">
            <h3>Tracking Information</h3>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Tracking ID:</strong> ${orderData.trackingId}</p>
            <p><strong>Order Date:</strong> ${new Date(orderData.orderDate).toLocaleDateString()}</p>
        </div>

        <div class="bill-section">
            <h3>Order Details</h3>
            <table class="bill-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                    <tr class="bill-total">
                        <td colspan="3"><strong>Subtotal</strong></td>
                        <td><strong>$${subtotal.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td colspan="3">Shipping</td>
                        <td>$${shipping.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Tax (8%)</td>
                        <td>$${tax.toFixed(2)}</td>
                    </tr>
                    <tr class="bill-total">
                        <td colspan="3"><strong>Total</strong></td>
                        <td><strong>$${total.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="bill-footer">
            <p>Thank you for shopping with ShopHub!</p>
            <p>For any questions, contact us at info@shophub.com</p>
        </div>
    `;
}
function openAdmin() {
    let password = prompt("Enter Admin Password:");

    // Tumhara fixed password (10 digit + letters + symbol)
    let correctPassword = "Admin@12345";

    if (password === correctPassword) {
        window.location.href = "admin.html";
    } else if (password === null) {
        // user ne cancel kiya
        return;
    } else {
        alert("❌ Wrong Password!");
    }
}

//End of recent edits