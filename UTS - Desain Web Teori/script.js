// Fungsi untuk menambahkan item ke dalam localStorage
function addToCart(name, price, event) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mendapatkan URL gambar dari elemen yang di-click
    const imageUrl = event.target.parentElement.querySelector('img').src;

    // Memeriksa apakah item sudah ada di keranjang
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        // Jika item sudah ada, tambahkan quantity
        cart[itemIndex].quantity += 1;
    } else {
        // Jika item belum ada, tambahkan item baru
        cart.push({
            name: name,
            price: price,
            image: imageUrl,
            quantity: 1
        });
    }

    // Simpan keranjang yang diperbarui ke dalam localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} berhasil ditambahkan ke keranjang!`);
}


// Fungsi untuk menampilkan item dari localStorage ke dalam keranjang
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = '';

    let totalAmount = 0;

    // Tampilkan setiap item di keranjang
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
            <p>${item.name}</p>
            <p>Harga: Rp${item.price}</p>
            <p>Jumlah: 
                <button onclick="updateQuantity(${index}, -1)">-</button> 
                ${item.quantity} 
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </p>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalAmount += item.price * item.quantity;
    });

    // Tampilkan total harga
    document.getElementById('totalAmount').textContent = `Total: Rp${totalAmount}`;
}


// Fungsi untuk memperbarui jumlah item di keranjang
function updateQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += amount;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Hapus item jika jumlahnya 0
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Perbarui tampilan keranjang
}


// Fungsi checkout
// Fungsi checkout
function checkout() {
    if (confirm('Anda yakin ingin melanjutkan ke pembayaran?')) {
        localStorage.removeItem('cart'); // Hapus data keranjang
        alert('Terima kasih telah berbelanja!');
        displayCartItems(); // Perbarui tampilan keranjang
    }
}

// Event listener untuk tombol checkout

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayCartItems);

// Tambah event listener ke tombol checkout
document.querySelector('.checkout-btn').addEventListener('click', checkout);
