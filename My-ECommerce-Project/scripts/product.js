// Product Data (same as app.js)
const products = [
  { id:1, name:"Smartphone", price:15000, category:"Electronics", image:"images/phone.jpg", desc:"Latest 5G smartphone" },
  { id:2, name:"Laptop", price:50000, category:"Electronics", image:"images/laptop.jpg", desc:"Powerful laptop for work" },
  { id:3, name:"T-Shirt", price:700, category:"Clothing", image:"images/tshirt.jpg", desc:"Comfortable cotton T-shirt" },
  { id:4, name:"Backpack", price:1200, category:"Accessories", image:"images/backpack.jpg", desc:"Stylish everyday backpack" },
  { id:5, name:"Crocs", price:2000, category:"Clothing", image:"images/crocs.jpg", desc:"Running shoes" }
];

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));

// Find the product
const product = products.find(p => p.id === productId);

// Display product details
const container = document.getElementById('productContainer');

if(product){
  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p><strong>Category:</strong> ${product.category}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p>${product.desc}</p>
    <div class="quantity-control">
      <label>Qty:</label>
      <input type="number" id="quantity" value="1" min="1">
    </div>
    <button id="addToCartBtn">Add to Cart</button>
  `;

  const addToCartBtn = document.getElementById('addToCartBtn');
  addToCartBtn.addEventListener('click', () => {
    const qty = parseInt(document.getElementById('quantity').value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(c => c.id === product.id);
    if(existing) existing.qty += qty;
    else cart.push({...product, qty});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart!");
  });

}else{
  container.innerHTML = "<p>Product not found.</p>";
}
