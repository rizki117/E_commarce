









import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const paymentMethods = [
  { id: 'ovo', label: 'OVO' },
  { id: 'gopay', label: 'Gopay' },
  { id: 'credit_card', label: 'Credit Card' },
];

const CheckoutModal = ({ show, onClose, product, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);

  if (!product) return null;

  const price = Number(product.harga) || 0;
  const totalPrice = price * quantity;

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleConfirm = () => {
    if (!name.trim() || !address.trim() || !phone.trim()) {
      alert('Mohon isi semua data dengan lengkap.');
      return;
    }
    onConfirm({
      product,
      quantity,
      name,
      address,
      phone,
      paymentMethod,
      totalPrice,
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Checkout Produk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="checkoutName">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="checkoutAddress">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Masukkan alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="checkoutPhone">
            <Form.Label>Nomor HP</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Masukkan nomor HP"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="checkoutQuantity">
            <Form.Label>Jumlah</Form.Label>
            <InputGroup>
              <Button variant="outline-secondary" onClick={decreaseQuantity}>
                -
              </Button>
              <Form.Control
                type="text"
                value={quantity}
                readOnly
                style={{ textAlign: 'center', maxWidth: '60px' }}
              />
              <Button variant="outline-secondary" onClick={increaseQuantity}>
                +
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="checkoutPaymentMethod">
            <Form.Label>Metode Pembayaran</Form.Label>
            <Form.Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="fw-bold fs-5">
            Total Bayar: Rp {totalPrice.toLocaleString('id-ID')}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Konfirmasi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
