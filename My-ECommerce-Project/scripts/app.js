// Product Data
const products = [
  { id:1, name:"Smartphone", price:15000, category:"Electronics", image:"images/phone.jpg", desc:"Latest 5G smartphone" },
  { id:2, name:"Laptop", price:50000, category:"Electronics", image:"images/laptop.jpg", desc:"Powerful laptop for work" },
  { id:3, name:"T-Shirt", price:700, category:"Clothing", image:"images/tshirt.jpg", desc:"Comfortable cotton T-shirt" },
  { id:4, name:"Backpack", price:1200, category:"Accessories", image:"images/backpack.jpg", desc:"Stylish everyday backpack" },
  { id:5, name:"Crocs", price:2000, category:"Clothing", image:"images/crocs.jpg", desc:"Running shoes" }
];

// DOM Elements
const categoryButtonsContainer = document.getElementById('categoryButtons');
const productsContainer = document.getElementById('products');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const resetFiltersBtn = document.getElementById('resetFilters');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize price range
priceRange.max = Math.max(...products.map(p => p.price));
priceRange.value = priceRange.max;
priceValue.textContent = priceRange.value;

// Create category buttons dynamically
const categories = [...new Set(products.map(p => p.category))];
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.textContent = cat;
  btn.addEventListener('click', () => {
    categoryButtonsContainer.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    showProducts(products.filter(p => p.category === cat && p.price <= priceRange.value));
  });
  categoryButtonsContainer.appendChild(btn);
});

// Show products
function showProducts(list) {
  productsContainer.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `<img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>₹${p.price}</p>`;
    card.addEventListener('click', () => {
      window.location.href = `product.html?id=${p.id}`;
    });
    productsContainer.appendChild(card);
  });
}

// Initial load
showProducts(products);

// Price filter
priceRange.addEventListener('input', () => {
  priceValue.textContent = priceRange.value;
  const activeBtn = categoryButtonsContainer.querySelector('button.active');
  let filtered = products.filter(p => p.price <= priceRange.value);
  if(activeBtn) filtered = filtered.filter(p => p.category === activeBtn.textContent);
  showProducts(filtered);
});

// Reset filters
resetFiltersBtn.addEventListener('click', () => {
  priceRange.value = Math.max(...products.map(p => p.price));
  priceValue.textContent = priceRange.value;
  categoryButtonsContainer.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
  showProducts(products);
});

// Cart functions
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<span>${item.name} x ${item.qty}</span><span>₹${item.price * item.qty}</span><button class="removeBtn">Remove</button>`;
    div.querySelector('.removeBtn').addEventListener('click', () => {
      cart = cart.filter(c => c.id !== item.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
    cartItemsContainer.appendChild(div);
  });
  cartTotalEl.textContent = total;
  localStorage.setItem('cart', JSON.stringify(cart));
}

checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0) alert("Cart is empty!");
  else { alert("Thank you for your purchase!"); cart = []; updateCart(); }
});

// Initial cart display
updateCart();
