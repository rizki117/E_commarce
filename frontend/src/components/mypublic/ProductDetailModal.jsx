









// components/ProductDetailModal.js

import React from 'react';


import { FaShoppingCart, FaCreditCard, FaCashRegister, FaWhatsapp} from 'react-icons/fa';

import { Modal, Button } from 'react-bootstrap';

const ProductDetailModal = ({ show, onClose, product, onCheckout }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detail Produk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}${product.gambar}`}
          alt={product.name}
          className="img-fluid mb-3"
          style={{ borderRadius: '0.5rem' }}
        />
        <h5 className="fw-bold">{product.name}</h5>
        <p className="mb-1">
          <strong>Harga:</strong> {product.harga}
        </p>
         <p className="mb-1">
          <strong>Description:</strong> {product.description}
        </p>
        {product.oldPrice && (
          <p className="mb-1">
            <strong>Harga Lama:</strong> {product.oldPrice}
          </p>
        )}
        <p className="mb-1">
          <strong>Penjual:</strong> {product.user?.name || 'Tidak tersedia'}
        </p>
      </Modal.Body>
  <Modal.Footer>
      
  <Button
    variant="success"
    onClick={() => {
      if (onCheckout) onCheckout(product);
    }}
  >
    <FaShoppingCart className="me-2" />
    Checkout
  </Button>   
      
      
  <Button variant="danger" onClick={onClose}>
    Tutup
  </Button>
  
<Button
  variant="primary"
  onClick={() => {
    let rawNumber = String(product.user?.nohp || '');
    rawNumber = rawNumber.replace(/[^0-9]/g, '');

    if (rawNumber.startsWith('0')) {
      rawNumber = '62' + rawNumber.slice(1);
    }

    if (rawNumber.startsWith('62')) {
 
const now = new Date();

// Format tanggal: DD/MM/YY
const date = now.toLocaleDateString('id-ID', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
});

// Format waktu: HH:MM
const time = now.toLocaleTimeString('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

// Gabungkan ke dalam pesan WhatsApp
const message = `
[ Pesan Otomatis: Tanggal ${date} | Waktu ${time} ]

Saya tertarik dengan produk berikut:

🔖 *Nama:* ${product.name}
📝 *Detail:* ${product.description || '-'}
💰 *Harga:* Sesuai Diposting

Mohon info lebih lanjut mengenai ketersediaan dan pemesanan. Terima kasih!
`.trim();



      const encodedMessage = encodeURIComponent(message);
      const waLink = `https://wa.me/${rawNumber}?text=${encodedMessage}`;
      window.open(waLink, '_blank');
    } else {
      alert('Nomor HP tidak valid.');
    }
  }}
>
  <FaWhatsapp className="me-2" />
  Chat Penjual
</Button>
  
</Modal.Footer>    
    </Modal>
  );
};

export default ProductDetailModal;