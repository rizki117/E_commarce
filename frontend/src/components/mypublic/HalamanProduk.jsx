









import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import CheckoutModal from './CheckoutModal';
import { getPublicProduk } from '../../services/publicService';

const HalamanProduk = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const result = await getPublicProduk();
        setProduk(result);
      } catch (err) {
        setError("Gagal memuat produk publik.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleCheckout = (product) => {
    setShowModal(false); // Tutup modal detail
    setCheckoutProduct(product); // Simpan produk untuk modal checkout
    setShowCheckoutModal(true); // Tampilkan checkout modal
  };

  const handleConfirmCheckout = (checkoutData) => {
    console.log("✅ Checkout berhasil:", checkoutData);
    setShowCheckoutModal(false);
  };

  if (loading)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Memuat produk terbaik untukmu...</p>
      </Container>
    );

  if (error)
    return (
      <Alert variant="danger" className="text-center mt-5">
        {error}
      </Alert>
    );

  return (
    <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container className="mt-3">
        <h2 className="text-center mb-2 fw-bold">Produk Pilihan</h2>
        <Row className="gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {produk.map((item, index) => (
            <Col key={item.id || index} className="mb-4">
              <ProductCard
                title={item.name}
                price={`Harga ${item.harga}`}
                oldPrice={item.oldPrice ? `Harga ${item.oldPrice}` : null}
                image={item.gambar}
                isSale={item.isSale || false}
                onDetailClick={() => handleShowModal(item)}
              />
            </Col>
          ))}
        </Row>

        {/* Modal Detail Produk */}
        <ProductDetailModal
          show={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
          onCheckout={handleCheckout} // 🔁 penting!
        />

        {/* Modal Checkout */}
        <CheckoutModal
          show={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          product={checkoutProduct}
          onConfirm={handleConfirmCheckout}
        />
      </Container>
    </section>
  );
};

export default HalamanProduk;