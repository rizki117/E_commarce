
// components/data/EditModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import FormField from "../formadd/FormField"; // pastikan path-nya sesuai

const EditModal = ({ show, itemToEdit, onConfirm, onCancel, formStructure = [] }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasFile = Object.values(formData).some((val) => val instanceof File);
    let payload;

    if (hasFile) {
      payload = new FormData();

      for (const key in formData) {
        const value = formData[key];

        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            payload.append(key, value);
          } else {
            payload.append(key, value.toString()); // ubah semua ke string agar aman
          }
        }
      }

      // Debug log (opsional)
      // for (let pair of payload.entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }
    } else {
      payload = formData;
    }

    onConfirm(payload);
  };

  if (!itemToEdit) return null;

  return (
    <Modal show={show} onHide={onCancel}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {formStructure.map((field, idx) => {
              if (field.name === "uuid") return null;

              const value =
                field.type === "checkbox" && field.options
                  ? formData[field.name] || []
                  : formData[field.name] ?? "";

              return (
                <React.Fragment key={idx}>
                  {/* Tampilkan preview gambar */}
                  {field.type === "file" && formData[field.name] && (
                    <div className="mb-3">
                      <img
                        src={
                          typeof formData[field.name] === "string"
                            ? `${import.meta.env.VITE_BASE_IMAGE_URL}${formData[field.name]}`
                            : URL.createObjectURL(formData[field.name])
                        }
                        alt="Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </div>
                  )}

                  <FormField
                    field={field}
                    value={value}
                    onChange={handleChange}
                    error={null}
                  />
                </React.Fragment>
              );
            })}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;