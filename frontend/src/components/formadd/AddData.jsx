








import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";

import GenerikForm from "./GenerikForm";
import SuccessAlert from "./SuccessAlert";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const AddData = ({ title, fields, createFunction, initialData, onSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      let payload;

      // Cek apakah ada field bertipe File
      const hasFile = Object.values(data).some((val) => val instanceof File);
      if (hasFile) {
        payload = new FormData();
        for (const key in data) {
          payload.append(key, data[key]);
        }
      } else {
        payload = data;
      }

      // Kirim ke fungsi create
      await createFunction(payload);
      setSuccessMessage("Data berhasil disimpan! yaaa");
      setShowForm(false);

      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMsg =
        error?.response?.data?.msg ||
        error.message ||
        "Gagal menyimpan data. Silakan coba lagi.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <Container>
      <Button
        variant="primary"
        className="text-center mt-2"
        onClick={() => setShowForm(true)}
      >
        + {title}
      </Button>

      <SuccessAlert message={successMessage} onClose={() => setSuccessMessage("")} />
      <ErrorMessage message={error} onClose={() => setError(null)} />
      <Loading show={loading} />

      <GenerikForm
        title={title}
        fields={fields}
        onSubmit={handleSubmit}
        show={showForm}
        handleClose={() => setShowForm(false)}
        initialData={initialData}
      />
    </Container>
  );
};

export default AddData;