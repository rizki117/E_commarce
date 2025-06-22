









import React from "react";
import { Table, Container } from "react-bootstrap";
import ActionButton from "./ActionButton";
import { formatTableData } from "../../utils/formatTableData"; // Import utilitas

const TableGenerik = ({ data, headers, onDelete, onEdit }) => {
  return (
    <Container className="mt-3">
      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              {headers.map((head) => (
                <th className="text-center" key={head.key}>{head.label}</th>
              ))}
              {(onDelete || onEdit) && <th className="text-center">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((dat, i) => (
                <tr key={dat.id || i}>
                  <td>{i + 1}</td>
                  {headers.map((head) => (
                    <td key={head.key} className="text-center">
                      {head.key === "gambar" && dat[head.key] ? (
                        <img
                          src={`${import.meta.env.VITE_BASE_IMAGE_URL}${dat[head.key]}`}
                          alt="gambar"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                      ) : head.key === "gambar" ? (
                        <span>-</span> // Kalau tidak ada gambar
                      ) : (
                        formatTableData(dat[head.key])
                      )}
                    </td>
                  ))}
                  {(onDelete || onEdit) && (
                    <td className="text-center">
                      <ActionButton
                        onEdit={() => onEdit(dat)}
                        onDelete={() => onDelete(dat)}
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 2} className="text-center">
                  Data Masih Kosong
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default TableGenerik;